const { json } = require("body-parser");
const User = require("../models/User");
const AppError = require("../utils/AppError");


exports.editUser = async (req, res, next) => {
    const { _id ,username} = req.body;
    console.log(req.body);
    // let _id = '656d490e1b0f5ca6d688ef86'
    // try {
    //     const findUser = await User.findByIdAndUpdate(_id, username)
    //     return res.status(200).json(findUser)
    // } catch (error) {
    //     console.log(error);
    // }

}