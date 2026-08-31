const express = require('express')

const {
  createReservation,
  getMyReservations,
} = require('../controllers/reservationController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createReservation)
router.get('/', protect, getMyReservations)

module.exports = router
