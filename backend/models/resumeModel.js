const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    name: { type: String,  required:true},
    resume: { data:Buffer,  contentType: String, },

});

module.exports=resumeModel =mongoose.model('resumeModel', resumeSchema)