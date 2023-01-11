require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();
const multer = require ('multer');


router.use(express.json({ limit: "50mb" }));
router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password )) {
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
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});


const DIR = 'public';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,  fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf .png, .jpg and .jpeg format allowed!'));
    }
  }
});
var type = upload.single('resume')
router.put("/update/:id",type,async (req, res) => { 
  console.log(req.file);             
  const url = req.protocol + '://' + req.get('host')
  User.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      firstName : req.body.firstName,
      lastName : req.body.lastName,

      email : req.body.email,
      mobileNumber : req.body.mobileNumber,
      portfolio : req.body.portfolio,
      resume : url +"/public/" + req.file.Filename,
      about : req.body.about,
      address : req.body.address,
      education : req.body.education,
      skills : req.body.skill,
      projects : req.body.projects,
      experience : req.body.experience
    
    }
  }, function (err, data) {
    if (err){
      res.status(500).send(err)
  } else {
    res.status(200).send({message: 'UPDATED', data: data})
  }
  })
})

router.get('/download/:id', async (req, res) => {
  const down = req.params.id;
  res.status(200).json('Download Completed');
});
// var type = upload.single('resume')
// router.post('/update/:id',type, async (req, res) => {
//   const url = req.protocol + '://' + req.get('host')
//   console.log( "data: ", req.body);
//   const data = new userModal({
//       username:req.body.username,
//       password:req.body.password,
//       firstName : req.body.firstName,
//       lastName : req.body.lastName,
//       email : req.body.email,
//       mobileNumber : req.body.mobileNumber,
//       portfolio : req.body.portfolio,
//       resume : url + '/public/' + req.file.filename,
//       about : req.body.about,
//       address : req.body.address,
//       education : req.body.education,
//       skills : req.body.skill,
//       projects : req.body.projects,
//       experience : req.body.experience
    
//   })
  //  await data.save()

  //  try {
  //   const userModal = new User (req.body);
  //   const user = await data.save();
  //   res.send("User Created Successfully");
  // } catch (error) {
  //   return res.status(400).json(error);
  // }
  // try {
  //        const user =  await userModal.findByIdAndUpdate({ _id: req.params.id},{$set:data});
    
  //       // const user = await userModal.updateOne({ id: req.params._id });
    
  //       res.send(user);
  //     } catch (error) { console.log("error" , error)
  //       return res.status(400).json({   err: error.message });
  //     }
  



module.exports = router;


// router.post("/update", async (req, res) => {
//   try {
//     await User.findOneAndUpdate({ _id: req.body._id }, req.body);

//     const user = await User.findOne({ _id: req.body._id });

//     res.send(user);
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// });














































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


// router.get("/getallusers", async (req, res) => {

//   try {
//     const users = await User.find()
//     res.send(users)
//   } catch (error) {
//     return res.status(400).json({ error });
//   }

// });



// // Single file
// router.post("/upload", uploadStorage.single("file"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// })


module.exports = router;
