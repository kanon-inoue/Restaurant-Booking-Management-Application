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

module.exports = { createTable, getTables };