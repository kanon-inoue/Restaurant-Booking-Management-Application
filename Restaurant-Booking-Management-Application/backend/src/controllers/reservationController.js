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

const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      customer: req.user._id,
    })
      .populate('customer', 'email role')
      .populate('table', 'tableNumber capacity')
      .sort({
        startTime: 1,
      })

    return res.status(200).json(reservations)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

const updateReservation = async (req, res) => {
  const { tableId, partySize, startTime, status } = req.body

  try {
    const reservation = await Reservation.findById(req.params.id)

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservation not found',
      })
    }

    const isOwner = reservation.customer.toString() === req.user._id.toString()

    const isStaff = req.user.role === 'staff'

    if (!isOwner && !isStaff) {
      return res.status(403).json({
        message: 'You are not authorised to update this reservation',
      })
    }

    const detailsChanged =
      tableId !== undefined ||
      partySize !== undefined ||
      startTime !== undefined

    if (!isStaff && detailsChanged && reservation.status !== 'pending') {
      return res.status(400).json({
        message: 'Only pending reservations can be modified',
      })
    }

    if (status !== undefined) {
      const allowedStatuses = ['pending', 'approved', 'rejected', 'cancelled']

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: 'Invalid reservation status',
        })
      }

      if (!isStaff && status !== 'cancelled') {
        return res.status(403).json({
          message: 'Customers can only cancel reservations',
        })
      }
    }

    const newTableId = tableId !== undefined ? tableId : reservation.table

    const newPartySize =
      partySize !== undefined ? Number(partySize) : reservation.partySize

    const newStartTime =
      startTime !== undefined ? new Date(startTime) : reservation.startTime

    if (!Number.isInteger(newPartySize) || newPartySize < 1) {
      return res.status(400).json({
        message: 'Party size must be at least 1',
      })
    }

    if (Number.isNaN(newStartTime.getTime()) || newStartTime <= new Date()) {
      return res.status(400).json({
        message: 'A valid future start time is required',
      })
    }

    const newEndTime = new Date(newStartTime.getTime() + 90 * 60 * 1000)

    if (detailsChanged) {
      const table = await Table.findOne({
        _id: newTableId,
        isActive: true,
      })

      if (!table) {
        return res.status(404).json({
          message: 'Active table not found',
        })
      }

      if (table.capacity < newPartySize) {
        return res.status(400).json({
          message: 'The selected table is too small',
        })
      }

      const resultingStatus = status || reservation.status

      if (resultingStatus === 'pending' || resultingStatus === 'approved') {
        const overlap = await Reservation.findOne({
          _id: {
            $ne: reservation._id,
          },
          table: newTableId,
          status: {
            $in: ['pending', 'approved'],
          },
          startTime: {
            $lt: newEndTime,
          },
          endTime: {
            $gt: newStartTime,
          },
        })

        if (overlap) {
          return res.status(409).json({
            message: 'The selected table is unavailable at that time',
          })
        }
      }

      reservation.table = newTableId
      reservation.partySize = newPartySize
      reservation.startTime = newStartTime
      reservation.endTime = newEndTime
    }

    if (status !== undefined) {
      reservation.status = status
    }

    await reservation.save()

    await reservation.populate('table', 'tableNumber capacity')

    return res.status(200).json(reservation)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createReservation,
  getMyReservations,
  updateReservation,
}
