const express = require('express');
const GameController = require('../controllers/gameController')

const router = express.Router()

router.post('/addGame', GameController.addGame)
router.get('/favoriteList', GameController.getFavoriteList)
router.post('/removeFromList', GameController.removeFromFavoriteList)

module.exports = router