const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerCustomer = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ 
            name, 
            email, 
            password,
            role: 'customer' 
        });

        return res.status(201).json({ 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role,
            token: generateToken(user.id) 
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { registerCustomer };