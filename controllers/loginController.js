const User = require('../models/User');
const AppError = require('../utils/AppError');
const generateToken = require('../utils/generateToken')

  exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort( { username: 1 } );
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        next(new AppError("cant get users"))
    }
};


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if(!username && !password) 
         next(new AppError("please provide username and password!", 400));
        const user = await User.findOne({ username });
        if(!user) return next(new AppError("User does not exist", 403))

        if(!(await user.checkPass(password)))
            return next(new AppError("Wrong password try again!", 403))
            
        const token = generateToken(user);
        res.status(200).json({
            token, 
            username: user.firstName,
            userId: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gamesList: user.favorite
            })

    } catch (error) {
        console.log(error);
        next(new AppError(`${error.message}`));
    };
}

