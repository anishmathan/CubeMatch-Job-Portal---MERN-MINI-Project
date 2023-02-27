const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: { type: String,  required:true, unique: true},
    password: { type: String,  required:true },
    token: { type: String },
    firstName: { type: String , default:''},
    lastName: { type: String , default:''},
    email: {
      type: String,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    mobileNumber: { type: String , default:''},
    portfolio: { type: String , default:''},
    resume:  {type: String, name:"resume", default:''},
    about: { type: String , default:''},
    address: { type: String , default:''},
    education: { type: [] , default: [''] },
    skills: { type: [] ,default: ['']  },
    projects: { type: [] , default: [''] },
    experience: { type: [] , default: [''] },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    appliedJobs: [],
  },
  { timestamps: true },
  { typeKey: '$type' }

  
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const userModal = new mongoose.model("users", userSchema);

module.exports = userModal;
