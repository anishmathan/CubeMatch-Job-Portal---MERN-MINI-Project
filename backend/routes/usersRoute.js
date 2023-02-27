const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require('multer');
const fs = require('fs')
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const confirmationMail = require("../utils/ConfirmationMail")

// router.post("/register", async (req, res) => {
//   try {
//     const newuser = new User(req.body);
//     const user = await newuser.save();
//     res.send("User Created Successfully");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       username: req.body.username,
//       password: req.body.password,
//     });
//     if (user) {
//       res.send(user);
//     } else {
//       return res.status(400).json({ message: "invalid credentials" });
//     }
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// });




router.use(express.json({ limit: "50mb" }));
router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }


    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

//

router.post("/login", async (req, res) => {
  try {
    console.log('LOgin');
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    // res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});
// /******************************************************* */



const DIR = 'public';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "application/msword") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf .png, .jpg and .jpeg format allowed!'));
    }
  }
});
var type = upload.single('resume')
router.post("/update/:id", type, async (req, res) => {
  const remove = (req, res) => {
    const fileName = req.params.name;
    if (file !== undefined && file !== null && file.filename);
    const directoryPath = __basedir + "/public";
    router.delete("/files/:name", remove);
    fs.unlink(directoryPath + fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not delete the file. " + err,
        });
      }

      res.status(200).send({
        message: "File is deleted.",
      });
    });
  };

  // const delResume =async()=>{
  const filePath = await User.findOne({ _id: req.params.id });
  const path = filePath.resume.split('/')
  console.log("path:", path)
  // }
  // /home/ctl/Downloads/anish-project-1-main/backend/public/1674193300167RESUME.pdf
  fs.unlink(`/home/ctl/Downloads/anish-project-1-main/backend/public/${path[4]}`, function (err) {
    if (err) console.log('Err: ', err.message);
    else console.log('File deleted!');
  });

  console.log(req.file);
  const url = req.protocol + '://' + req.get('host')
  User.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,

      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      portfolio: req.body.portfolio,
      resume: url + "/public/" + req.file.filename,
      about: req.body.about,
      address: req.body.address,
      education: req.body.education,
      skills: req.body.skill,
      projects: req.body.projects,
      experience: req.body.experience

    }
  }, function (err, data) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send({ message: 'UPDATED', data: data })
    }
  })


})

// @desc    Forgot Password Initialization
router.post("/forgotPassword", async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));

    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
});

// @desc    Reset User Password
router.post("/resetPassword/:resetToken", async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/getallusers", async (req, res) => {

  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    return res.status(400).json({ error });
  }

});






router.post("/confirmationmail", async (req, res, next) => {

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));

    }
   
    const message = 
  `<h2>Dear{users.firstName}</h2>
  <p>You HAve Successfully Applied Job in Cubematch- Claritaz job portal The HR of the company will Reach You Soon. BEST WISHES</p>`

    try {
      await confirmationMail({
        to: user.email,
        subject: "Confirmation Mail : You Have Successfully Applied Job in Cubematch Claritaz Job",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;








































// router.post("/candireg", async (req, res) => {
//   try {
//     const newuser = new User(req.body);
//     const user = await newuser.save();
//     res.send("User Created Successfully");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// });

// router.post("/candilog", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       username: req.body.username,
//       password: req.body.password,
//     });
//     if (user) {
//       res.send(user);
//     } else {
//       return res.status(400).json({ message: "invalid credentials" });
//     }
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// });


// const storage = multer.diskStorage({ uploadStorage.single("resume") ,
//   destination: (req, file, cb) => {
//     cb(null, "uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })
// const uploadStorage = multer({ storage: storage })

// storage engine for multer
// const storageEngine = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function (req, file, callback) {
//     console.log('Upload Success 1111')
//     callback(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({
//   storage: storageEngine,

// });

// // router.use(multer({storageEngine }).single("resume")); 
// router.post("/update", upload.single('resume'), async (req, res) => {

//   try {
//     console.log("success ",req.file.filename)
//     const url = req.protocol + "://" + req.get("host");

//     const imgpath = url + "/public/uploads" + req.file.filename;
//     console.log("imgpath", imgpath)

//     const firstName = req.body.firstName,
//       lastName = req.body.lastName,
//       email = req.body.email,
//       mobileNumber = req.body.mobileNumber,
//       portfolio = req.body.portfolio,
//       resume = imgpath,
//       about = req.body.about,
//       address = req.body.address,
//       education = req.body.education,
//       skills = req.body.skill,
//       projects = req.body.projects,
//       experience = req.body.experience

//     const data = {
//       firstName,
//       lastName,
//       email,
//       mobileNumber,
//       portfolio,
//       resume,
//       about,
//       address,
//       education,
//       skills,
//       projects,
//       experience
//     };

//     console.log("success:2222 ",req.file.filename)
//     await User.findAndUpdate({ _id: req.params.id }, {data});
//     console.log("success : 3333")
//     const user = await User.findOne({ _id: req.body._id });

//     res.send(user);

//   } catch (error) {
//     console.log("Err: ", error.message);
//     return res.status(400).json({ err : error.message });
//   }

// });




// // Single file
// router.post("/upload", uploadStorage.single("file"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// })
