import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function StaffPendingReservations() {
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingId, setUpdatingId] = useState(null)
    const [actionMessage, setActionMessage] = useState('')
    const [actionError, setActionError] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        const getPendingReservations = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/api/reservations/pending', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            const data = await response.json()

            if (!response.ok) {
            setError(data.message || 'Unable to retrieve pending reservations')
            return
            }

            setReservations(data)
        } catch (error) {
            setError('Unable to connect to the server')
        } finally {
            setLoading(false)
        }
        }

        getPendingReservations()
    }, [])

    const updateReservationStatus = async (reservationId, status) => {
        try {
            setUpdatingId(reservationId)
            setActionMessage('')
            setActionError('')
            const token = localStorage.getItem('token')
            const response = await fetch(
                `/api/reservations/${reservationId}/status`,
                {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
                )
                const data = await response.json()

                if (!response.ok) {
                throw new Error(data.message || 'Unable to update reservation')
                }

                setReservations((currentReservations) =>
                currentReservations.filter(
                    (reservation) => reservation._id !== reservationId
                )
            )
            setActionMessage(
                data.message || `Reservation ${status} successfully`
            )
        } catch (error) {
            setActionError(error.message)
        } finally {
            setUpdatingId(null)
        }
    }

    if (loading) {
        return <p>Loading pending reservations...</p>
    }

    if (error) {
        return <p>{error}</p>
    }
    
  return (
    <div>
      <h2>Pending Reservations</h2>
      {actionMessage && (
        <p role="status">
            {actionMessage}
        </p>
      )}

      {actionError && (
        <p role="alert">
            {actionError}
        </p>
      )}
      
      {reservations.length === 0 ? (
        <p>There are no pending reservations.</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation._id}>
            <h3>
              Table {reservation.table?.tableNumber || 'Not available'}
            </h3>
            <p>
              Customer: {reservation.customer?.email || 'Not available'}
            </p>
            <p>Party size: {reservation.partySize}</p>
            <p>
              Start time:{' '}
              {new Date(reservation.startTime).toLocaleString()}
            </p>
            <p>
              End time:{' '}
              {new Date(reservation.endTime).toLocaleString()}
            </p>
            <p>Status: {reservation.status}</p>
            <button
                type="button"
                disabled={updatingId === reservation._id}
                onClick={() =>
                    updateReservationStatus(reservation._id, 'approved')
                }
                >
                Approve
                </button>

                <button
                type="button"
                disabled={updatingId === reservation._id}
                onClick={() =>
                    updateReservationStatus(reservation._id, 'rejected')
                }
                >
                Reject
            </button>
          </div>
        ))
      )}
      <button
        type="button"
        onClick={() => navigate('/staff')}
        >
        Back to Staff Dashboard
      </button>
    </div>
  )
}

export default StaffPendingReservations