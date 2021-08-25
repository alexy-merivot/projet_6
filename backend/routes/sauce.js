const express = require('express');
const router = express.Router();
const sauceController = require ('../controllers/sauce')
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/', auth, multer, sauceController.newSauce);

router.get('/', auth, sauceController.getAllSauce);

router.get('/:id', auth, sauceController.getASauce);

router.put('/:id', auth, multer, sauceController.updateSauce);

router.delete('/:id', auth, sauceController.deleteSauce);

router.post('/:id/:like', auth, sauceController.likeDislikeSauce);


module.exports = router;