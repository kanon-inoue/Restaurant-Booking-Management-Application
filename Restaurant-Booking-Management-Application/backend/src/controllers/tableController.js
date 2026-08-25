const Table = require('../models/Table');

const createTable = async (req, res) => {
    const { tableNumber, capacity } = req.body;

    if (!tableNumber || !capacity) {
        return res.status(400).json({
            message: 'Table number and capacity are required',
        });
    }

    try {
        const tableExists = await Table.findOne({
            tableNumber,
        });

        if (tableExists) {
            return res.status(400).json({
                message: 'Table already exists',
            });
        }

        const table = await Table.create({
            tableNumber,
            capacity,
        });

        return res.status(201).json(table);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getTables = async (req, res) => {
    try {
        const tables = await Table.find().sort({
            tableNumber: 1,
        });

        return res.status(200).json(tables);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateTable = async (req, res) => {
    const { tableNumber, capacity, isActive } = req.body;

    try {
        const table = await Table.findById(req.params.id);

        if (!table) {
            return res.status(404).json({
                message: 'Table not found',
            });
        }

        if (tableNumber !== undefined) {
            table.tableNumber = tableNumber;
        }

        if (capacity !== undefined) {
            table.capacity = capacity;
        }

        if (isActive !== undefined) {
            table.isActive = isActive;
        }

        const updatedTable = await table.save();

        return res.status(200).json(updatedTable);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(
            req.params.id
        );

        if (!table) {
            return res.status(404).json({
                message: 'Table not found',
            });
        }

        return res.status(200).json({
            message: 'Table deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { 
    createTable, 
    getTables, 
    updateTable,
    deleteTable,
};