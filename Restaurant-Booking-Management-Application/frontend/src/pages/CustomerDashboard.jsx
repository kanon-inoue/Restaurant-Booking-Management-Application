import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CustomerDashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login', {
        replace: true,
      })
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')

    navigate('/login', {
      replace: true,
      state: {
        message: 'You have been logged out.',
      },
    })
  }

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <button type="button" onClick={() => navigate('/find-table')}>
        Find a Table
      </button>
      <button type="button" onClick={() => navigate('/manage-bookings')}>
        Manage Bookings
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default CustomerDashboard
