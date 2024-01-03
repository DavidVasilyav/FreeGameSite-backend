const User = require("../models/User");
const AppError = require("../utils/AppError");

exports.register = async (req, res, next) => {
  const { username, password, email, firstName, lastName, age } = req.body;

  const userFromDbExistChecker = await User.findOne({ $or: [{username: username}, {email: email}]}).exec();
  if (userFromDbExistChecker) {
    if (userFromDbExistChecker.username === username) {
      console.log('user');
      return next(new AppError(`username exist`));
    }
    if (userFromDbExistChecker.email === email)
    console.log('email');
      return next(new AppError(`email exist`));
  }
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.status(201).json({
      success: true,
      data: {
        username,
        password,
      },
    });
  } catch (error) {
    if(error.errors.email) {
      return next(new AppError('email is invalid'));
    }
    return next(new AppError(error));
  }
};
