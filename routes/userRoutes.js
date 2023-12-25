const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').post(userController.addUser);
router.route('/login').post(userController.login);

module.exports = router;