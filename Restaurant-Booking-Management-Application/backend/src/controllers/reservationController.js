const mongoose = require('mongoose')
const Reservation = require('../models/Reservation')
const Table = require('../models/Table')

const createReservation = async (req, res) => {
  const { tableId, partySize, startTime } = req.body

  if (!tableId || !partySize || !startTime) {
    return res.status(400).json({
      message: 'Table, party size and start time are required',
    })
  }

  if (!mongoose.Types.ObjectId.isValid(tableId)) {
    return res.status(400).json({
      message: 'Invalid table ID',
    })
  }

  const guests = Number(partySize)
  const requestedStart = new Date(startTime)

  if (!Number.isInteger(guests) || guests < 1) {
    return res.status(400).json({
      message: 'Party size must be at least 1',
    })
  }

  if (Number.isNaN(requestedStart.getTime()) || requestedStart <= new Date()) {
    return res.status(400).json({
      message: 'A valid future start time is required',
    })
  }

  // Each reservation lasts 120 minutes
  const requestedEnd = new Date(requestedStart.getTime() + 120 * 60 * 1000)

  try {
    const table = await Table.findOne({
      _id: tableId,
      isActive: true,
    })

    if (!table) {
      return res.status(404).json({
        message: 'Active table not found',
      })
    }

    if (table.capacity < guests) {
      return res.status(400).json({
        message: 'The selected table is too small for this party',
      })
    }

    // Recheck availability before saving
    const overlappingReservation = await Reservation.findOne({
      table: table._id,
      status: {
        $in: ['pending', 'approved'],
      },
      startTime: {
        $lt: requestedEnd,
      },
      endTime: {
        $gt: requestedStart,
      },
    })

    if (overlappingReservation) {
      return res.status(409).json({
        message: 'This table is no longer available at that time',
      })
    }

    const reservation = await Reservation.create({
      customer: req.user._id,
      table: table._id,
      partySize: guests,
      startTime: requestedStart,
      endTime: requestedEnd,
      status: 'pending',
    })

    await reservation.populate('table', 'tableNumber capacity')

    return res.status(201).json(reservation)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createReservation,
}
