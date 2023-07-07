const express = require('express');
const registerController = require('../controllers/registerController');
const LoginController = require('../controllers/loginController');
const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", LoginController.login);
router.get('/', LoginController.allUsers);

module.exports = router;
