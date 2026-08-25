const express = require('express');

const {
    createTable,
} = require('../controllers/tableController');

const {
    protect,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createTable);

module.exports = router;