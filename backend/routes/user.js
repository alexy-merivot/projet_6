const express = require('express');
const router = express.Router();
const userController = require ('../controllers/user')
const auth = require('../middleware/auth')

router.post('/signup', auth, userController.signUp);

router.post('/login', auth, userController.login);

module.exports = router;