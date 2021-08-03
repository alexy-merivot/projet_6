const express = require('express');
const router = express.Router();
const sauceController = require ('../controllers/sauce')
router.post('/signup', sauceController.newSauce);

module.export = router;