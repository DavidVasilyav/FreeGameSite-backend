const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require('../models/User');

exports.correctPassword = async (userPassword) => {
    this.password = await bcrypt.hash(userPassword ,this.password, 12)

}
