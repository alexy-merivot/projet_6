const express = require('express');
const router = express.Router();
const sauceController = require ('../controllers/sauce')
router.post("/", sauceController.newSauce);

module.exports = router;