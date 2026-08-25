const express = require('express');

const {
    createTable,
    getTables,
    updateTable,
    deleteTable
} = require('../controllers/tableController');

const {
    protect,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createTable);
router.get('/', protect, getTables);
router.put('/:id', protect, updateTable);
router.delete('/:id', protect, deleteTable);

module.exports = router;