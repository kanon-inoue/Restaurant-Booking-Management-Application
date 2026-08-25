const express = require('express');

const {
    createTable,
    getTables,
} = require('../controllers/tableController');

const {
    protect,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createTable);
router.get('/', protect, getTables);

module.exports = router;