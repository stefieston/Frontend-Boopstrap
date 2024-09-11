const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController')
const catalogController = require('../controllers/catalogController');

// Home route
router.get('/', loginController.getLoginPage);

router.get('/catalog', catalogController.getCatalogPage);
router.get('/register', registerController.getRegisterPage);

module.exports = router;