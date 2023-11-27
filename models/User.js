const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validateEmail = require("../utils/EmailVladiate");
const { correctPassword } = require("../utils/passwordVladiate");
const GameSchema = require('../models/GameSchema')
const MIN_AGE = 8;
const MAX_AGE = 120;

const newUserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide Username"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: [true, "Email is already exists"],
    validate: {
      validator: validateEmail,
      message: "Email is invalid",
    },
  },
  firstName: { type: String, required: [true, "Please provide First Name"] },
  lastName: { type: String, required: [true, "Please provide Last Name"] },
  age: {
    type: Number,
    min: [MIN_AGE, `The age must be bigger then ${MIN_AGE}`],
    max: [MAX_AGE, `The age cant be above ${MAX_AGE}`],
  },
  favoriteList: [GameSchema],
  CreateAT: {
    type: Date,
     default: Date.now,
  },
}, {
  virtuals: {
    fullName: {
      get() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  }
});

 newUserSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password.toString(), 10);
  });
  


newUserSchema.methods.checkPass = async function (userPassword)  {
  return await bcrypt.compare(userPassword, this.password);
};



module.exports = model("users_db", newUserSchema);