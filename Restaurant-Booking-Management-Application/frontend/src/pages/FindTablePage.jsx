import { useNavigate } from 'react-router-dom'
import TableAvailabilitySearch from '../components/TableAvailabilitySearch'

function FindTablePage() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>Find a Table</h2>

      <TableAvailabilitySearch />

      <button type="button" onClick={() => navigate('/customer-dashboard')}>
        Return to Customer Dashboard
      </button>
    </div>
  )
}

export default FindTablePage
