import { useLocation, useNavigate } from 'react-router-dom'

function ReservationDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const reservation = location.state?.reservation

  if (!reservation) {
    return (
      <div>
        <h2>Reservation Details</h2>

        <p>Reservation details could not be found.</p>

        <button type="button" onClick={() => navigate('/manage-bookings')}>
          Return to Manage Bookings
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>Reservation Details</h2>

      <p>Table: {reservation.table?.tableNumber}</p>

      <p>Table capacity: {reservation.table?.capacity}</p>

      <p>Party size: {reservation.partySize}</p>

      <p>Start time: {new Date(reservation.startTime).toLocaleString()}</p>

      <p>End time: {new Date(reservation.endTime).toLocaleString()}</p>

      <p>Status: {reservation.status}</p>

      <button type="button" onClick={() => navigate('/manage-bookings')}>
        Return to Manage Bookings
      </button>
    </div>
  )
}

export default ReservationDetailPage
