const Reservation = require('../models/Reservation')

const reservation = await Reservation.create({
  customer,
  table,
  partySize,
  startTime,
  endTime,
})

const reservations = await Reservation.find({
  customer,
})
