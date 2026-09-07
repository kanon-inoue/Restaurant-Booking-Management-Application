import { useNavigate } from 'react-router-dom'

function StaffDashboard() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }
  return (
    <div>
      <h2>Staff Dashboard</h2>
      <p>Welcome to the staff dashboard.</p>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default StaffDashboard