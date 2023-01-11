const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String,  required:true, unique: true},
    password: { type: String,  required:true },
    token: { type: String },
    firstName: { type: String , default:''},
    lastName: { type: String , default:''},
    email: { type: String , default:''},
    mobileNumber: { type: String , default:''},
    portfolio: { type: String , default:''},
    resume:  {type: String, name:"resume", default:''},
    about: { type: String , default:''},
    address: { type: String , default:''},
    education: { type: [] , default: [''] },
    skills: { type: [] ,default: ['']  },
    projects: { type: [] , default: [''] },
    experience: { type: [] , default: [''] },

    appliedJobs: [],
  },
  { timestamps: true },
  { typeKey: '$type' }

  
);

const userModal = new mongoose.model("users", userSchema);

module.exports = userModal;
