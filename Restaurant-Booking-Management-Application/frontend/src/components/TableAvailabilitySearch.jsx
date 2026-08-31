import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TableAvailabilitySearch() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('')
  const [message, setMessage] = useState('')
  const [tables, setTables] = useState([])
  const navigate = useNavigate()

  const handleSearch = async (event) => {
    event.preventDefault()

    if (!date) {
      setMessage('Please select a reservation date')
      return
    }

    const selectedDateTime = new Date(`${date}T${time}`)

    if (Number.isNaN(selectedDateTime.getTime())) {
      setMessage('Please enter a valid date and time')
      return
    }

    if (selectedDateTime <= new Date()) {
      setMessage('Please select a future date and time')
      return
    }

    if (!time) {
      setMessage('Please select a reservation time')
      return
    }

    const minutes = Number(time.split(':')[1])

    if (minutes !== 0 && minutes !== 30) {
      setMessage('Please select a time in 30-minute intervals')
      return
    }

    if (!guests) {
      setMessage('Please enter the number of guests')
      return
    }

    const partySize = Number(guests)

    if (!Number.isInteger(partySize) || partySize < 1) {
      setMessage('The number of guests must be at least 1')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const query = new URLSearchParams({
        date,
        time,
        partySize: String(partySize),
      })

      const response = await fetch(`/api/tables/availability?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.message || 'Unable to search tables')
        return
      }

      setTables(data)

      if (data.length === 0) {
        setMessage('No suitable tables found')
      } else {
        setMessage(`${data.length} suitable table(s) found`)
      }
    } catch (error) {
      setMessage('Unable to connect to the server')
    }
  }

  const handleReserve = async (table) => {
    const selectedDateTime = new Date(`${date}T${time}`)

    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        tableId: table._id,
        partySize: Number(guests),
        startTime: selectedDateTime.toISOString(),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.message || 'Unable to create reservation')
      return
    }

    navigate('/reservation-pending', {
      state: { reservation: data },
    })
  }

  return (
    <div>
      <h3>Search Available Tables</h3>

      <form onSubmit={handleSearch} noValidate>
        <div>
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label>Time</label>

          <input
            type="time"
            step="1800"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>

        <div>
          <label>Number of Guests</label>

          <input
            type="number"
            min="1"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
          />
        </div>

        <button type="submit">Search Tables</button>
      </form>

      {message && <p>{message}</p>}

      {tables.length > 0 && (
        <div>
          <h4>Available Tables</h4>

          {tables.map((table) => (
            <div key={table._id}>
              <p>
                Table {table.tableNumber} — Capacity: {table.capacity}
              </p>
              <button type="button" onClick={() => handleReserve(table)}>
                Reserve Table
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TableAvailabilitySearch
