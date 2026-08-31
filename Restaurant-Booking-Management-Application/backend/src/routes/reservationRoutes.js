const express = require('express')

const { createReservation } = require('../controllers/reservationController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createReservation)

module.exports = router
