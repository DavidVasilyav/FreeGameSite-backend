const {Schema, model } = require('mongoose')

const newGameSchema = new Schema({
    _id : {
        type: String,
        required: [true, 'game id required']
    },
    gameTitle: {
        type: String,
        required: [true, 'game title required'],
    },
    gameUrl : {
        type: String,
        required: [true, 'game url required'],
    },
    thumbnail : {
        type: String, 
    },
    gameGenre: {
        type: String,
        required: [true, 'game genre required'],
    }
}, {
    autoIndex: false
})

module.exports = (newGameSchema)