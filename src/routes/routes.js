const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController')
const catalogController = require('../controllers/catalogController');


// Static files
router.use(express.static( '../public'));

// Home route
router.get('/', loginController.getLoginPage);

router.get('/catalog', catalogController.getCatalogPage);
router.get('/register', registerController.getRegisterPage);

module.exports = router;