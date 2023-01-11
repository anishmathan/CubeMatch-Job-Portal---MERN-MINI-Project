const express = require("express");
const app = express();
const db = require("./db");
const jobsRoute = require('./routes/jobsRoute')
const userRoute = require('./routes/usersRoute')
const router = require("./routes/usersRoute");
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require ('path');
// const multer = require ('multer');

app.use("/public" , express.static("public"))
// app.set("public", "./public");
// app.use("/", express.static(path.join(__dirname, "public")))


app.use(cors());
app.use(express.json());


app.use('/api/jobs/' , jobsRoute)

app.use('/api/users/' , userRoute)
const port = process.env.PORT || 4000;

// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (cors ());

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

/***************************************************************** */








// initialize multer


// // routing
// app.post ('/update', upload.single ('resume'), (req, res) => {
//   res.json (req.file).status (200);
// });


//storage


// const Storage=multer.diskStorage({
  //   destination :"upload",
  //   filename:(req,file,cb)=>{
  //     cb(null, file.originalname);
  //   },
  // });
  
  // const upload = multer({
  //   storage:Storage
  // }) .single('resume')
  
  // app.post("/update" , (req, res) =>{
  //   upload(req,res, (err)=>{
  //     if(err){
  //       console.log(err)
  //     }
  //     else{
  //       const newResume= new resumeModel({
  //         name:req.body.name,
  //         resume:{
  //           data:req.file.filename,
  //           contentType:"file/pdf"
  //         }
  //       })
  //       newResume.save()
  //       .then(()=>res.send("Succesfully Upaded"))
  //       .catch((err)=>console.log(err));
  //     }
  //   })
  // })
  
  // app.get('/update', async(req,res)=>{
  //   const allData = await resumeModel.find()
  //   res.json(allData)
  // })
  