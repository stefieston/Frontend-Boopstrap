const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController')
const catalogController = require('../controllers/catalogController');

// Static files
router.use(express.static('../public'));

// Middleware para parsear JSON
router.use(express.json());

// Home route
router.get('/', loginController.getLoginPage);
router.post('/login', loginController.login);

router.get('/register', registerController.getRegisterPage);
router.post('/register', registerController.register);

router.get('/catalog', catalogController.getCatalogPage);

module.exports = router;