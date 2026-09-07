const express = require('express')

const {
  createReservation,
  getMyReservations,
  updateReservation,
  getPendingReservations
} = require('../controllers/reservationController')

const { protect, authorize, } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createReservation)
router.get('/', protect, getMyReservations)
router.put('/:id', protect, updateReservation)
router.get(
  '/pending',
  protect,
  authorize('staff'),
  getPendingReservations
)

module.exports = router
