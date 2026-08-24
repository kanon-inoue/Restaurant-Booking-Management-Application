const express = require('express');
const { registerCustomer } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerCustomer);

module.exports = router;