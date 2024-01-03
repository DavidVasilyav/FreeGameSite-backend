const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const LoginController = require('../controllers/loginController');
const EditController = require('../controllers/editInfoController')
router.post("/register", registerController.register);
router.post("/login", LoginController.login);
router.post("/edit", EditController.editUser);
router.get('/', LoginController.allUsers);

module.exports = router;
