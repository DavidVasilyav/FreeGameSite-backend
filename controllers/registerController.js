const User = require('../models/User');
const generateToken = require('../utils/generateToken')
const AppError = require('../utils/AppError');


exports.register = async (req, res, next) => {
    
    try {
        const {username, password, email, firstName, lastName, age} = req.body
        // if (!username) {
        //     next(new AppError('invalid Username'))
        // }
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
            newUser.password = undefined;
            const token = generateToken(newUser);
            res.status(201).json({ token });
            console.log(newUser);
    } catch (error) {
        next(new AppError(`${error.message}`));
    }
};