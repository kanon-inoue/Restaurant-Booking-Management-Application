console.log('Starting app.js')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const connectDB = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const tableRoutes = require('./routes/tableRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tables', tableRoutes)

app.get('/', (req, res) => {
  res.send('Restaurant Booking Management API is running')
})

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...')

    await connectDB()

    const PORT = process.env.PORT || 5001

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to start server:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  startServer()
}

module.exports = app
