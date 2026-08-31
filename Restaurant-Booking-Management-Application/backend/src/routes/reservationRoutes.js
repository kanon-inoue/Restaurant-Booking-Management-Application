const express = require('express')

const {
  createReservation,
  getMyReservations,
  updateReservation,
} = require('../controllers/reservationController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createReservation)
router.get('/', protect, getMyReservations)
router.put('/:id', protect, updateReservation)

module.exports = router
