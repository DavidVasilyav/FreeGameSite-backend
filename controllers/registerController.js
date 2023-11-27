const User = require("../models/User");
const AppError = require("../utils/AppError");

exports.register = async (req, res, next) => {
  const { username, password, email, firstName, lastName, age } = req.body;

  const userFromDbExistChecker = await User.findOne({
    username: username,
  }).exec();

  console.log(userFromDbExistChecker);
  try {
    // if (!password) {
    //     next(new AppError('invalid Password'))
    // }
    // if (!email) {
    //     next(new AppError('invalid Email'))
    // }
    // if (!firstName) {
    //     next(new AppError('required FirstName'))
    // }
    // if (!lastName) {
    //     next(new AppError('invalid LastName'))
    const newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        username,
        password,
      },
    });
  } catch (error) {
    if (userFromDbExistChecker.username == username) {
        next(new AppError('username exist'));
        
    }
    
  }
};
