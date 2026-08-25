const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));



app.get('/', (req, res) => {
    res.send('Restaurant Booking Management API is running');
});

if (require.main === module) {
    connectDB();

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;