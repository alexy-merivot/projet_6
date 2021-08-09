const express = require('express');
const router = express.Router();
const sauceController = require ('../controllers/sauce')

router.post('/', sauceController.newSauce);

router.get('/', sauceController.getAllSauce);

router.get('/:id', sauceController.getASauce);

router.put('/:id', sauceController.updateSauce);

router.delete('/:id', sauceController.deleteSauce);

router.post('/:id/:like', sauceController.likeDislikeSauce)


module.exports = router;