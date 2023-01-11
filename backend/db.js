const mongoose = require("mongoose");
dbConnect()
async function dbConnect(){
    mongoose.set('strictQuery', false);
     try {
         await mongoose.connect('mongodb://localhost:27017/JOB_DB' , {useNewUrlParser : true});
         console.log('Mongo DB Connection success')
     } catch (error) {
         console.log('Mongo DB Connection failed')
     }

}

module.exports = mongoose