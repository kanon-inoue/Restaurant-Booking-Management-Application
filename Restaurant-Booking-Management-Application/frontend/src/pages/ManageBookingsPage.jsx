import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ManageBookingsPage() {
  const navigate = useNavigate()

  const [reservations, setReservations] = useState([])

  const [message, setMessage] = useState('Loading reservations...')

  useEffect(() => {
    const getReservations = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await fetch('/api/reservations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          setMessage(data.message || 'Unable to retrieve reservations')
          return
        }

        setReservations(data)

        setMessage(data.length === 0 ? 'You have no reservations' : '')
      } catch (error) {
        setMessage('Unable to connect to the server')
      }
    }

    getReservations()
  }, [])

  return (
    <div>
      <h2>Manage Bookings</h2>

      {message && <p>{message}</p>}

      {reservations.map((reservation) => (
        <div key={reservation._id}>
          <h3>Table {reservation.table?.tableNumber}</h3>

          <p>Party size: {reservation.partySize}</p>

          <p>
            Date and time: {new Date(reservation.startTime).toLocaleString()}
          </p>

          <p>Status: {reservation.status}</p>
          <button
            type="button"
            onClick={() =>
              navigate('/reservation-details', {
                state: { reservation },
              })
            }
          >
            View Details
          </button>
        </div>
      ))}

      <button type="button" onClick={() => navigate('/customer-dashboard')}>
        Return to Customer Dashboard
      </button>
    </div>
  )
}

export default ManageBookingsPage
