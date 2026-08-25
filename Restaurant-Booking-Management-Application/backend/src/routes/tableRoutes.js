const express = require('express');

const {
    createTable,
    getTables,
    updateTable,
    deleteTable,
    getAvailableTables
} = require('../controllers/tableController');

const {
    protect,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createTable);
router.get('/', protect, getTables);
router.put('/:id', protect, updateTable);
router.delete('/:id', protect, deleteTable);
router.get('/availability', protect, getAvailableTables);

module.exports = router;