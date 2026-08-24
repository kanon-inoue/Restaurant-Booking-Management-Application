const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerCustomer = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required',
        });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ 
            message: 'User already exists' 
        });

        const user = await User.create({ 
            email, 
            password,
            role: 'customer' 
        });

        return res.status(201).json({ 
            id: user.id, 
            email: user.email, 
            role: user.role,
            token: generateToken(user.id) 
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { registerCustomer };