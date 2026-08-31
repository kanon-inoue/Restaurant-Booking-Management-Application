import { Navigate, useNavigate } from 'react-router-dom'
import TableAvailabilitySearch from '../components/TableAvailabilitySearch'

function CustomerDashboard() {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
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
