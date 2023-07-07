const Game = require("../models/GameSchema");
const User = require('../models/User')
const AppError = require('../utils/AppError');


exports.getFavoriteList = async (req, res, next) => {
    try {
        const {_id }= await req.query
        let user = await User.findById(_id)
        console.log(user);
        if(!user)return(console.log('user not found')); 
        const favoriteList = user.favoriteList
        res.status(200).json({favoriteList})
    } catch (error) {
        console.log(error);
        next(new AppError(`${error.message}`));
    }
}

exports.addGame = async (req, res, next) => {
    // const {gameId, gameTitle, gameUrl, thumbnail, gameGenre} = req.body
    try {
        const {_id}  = req.body
        const {gameInfo} = req.body
        const {gameId, gameTitle, gameUrl, thumbnail, gameGenre} = gameInfo
        let user = await User.findById(_id)
        if(!user)return(console.log('user not found')); 
        const game = user.favoriteList.find(e => e._id == gameInfo.gameId)
        if(game)return next(new AppError(`${game.gameTitle} exist in the list `))
        console.log(game);
        user.favoriteList.push({_id: gameInfo.gameId, gameTitle, gameUrl, thumbnail, gameGenre})
        user.save()
        res.status(201).send('success')
    } catch (err) {
        console.log(err);
        
    }
}


exports.removeFromFavoriteList = async (req, res, next) => {
    try {
        const {_id, gameId }= await req.body
        console.log(gameId);
        const user = await User.findById(_id)
        if(!user)return(console.log('user not found')); 
        const index = user.favoriteList.findIndex(game => game._id === gameId)
        console.log(index);
        user.favoriteList.splice(index, 1)
        user.save()
        res.status(200).json('game removed')
    } catch (error) {
        console.log(error);
        next(new AppError(`${error.message}`));
    }
}
   