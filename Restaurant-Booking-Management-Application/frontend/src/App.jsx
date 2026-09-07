import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CustomerDashboard from './pages/CustomerDashboard'
import FindTablePage from './pages/FindTablePage'
import ManageBookingsPage from './pages/ManageBookingsPage'
import ReservationPendingPage from './pages/ReservationPendingPage'
import ProtectedRoute from './components/ProtectedRoute'
import StaffDashboard from './pages/StaffDashboard'
import StaffPendingReservations from './pages/StaffPendingReservations'
import ReservationDetailPage from './pages/ReservationDetailPage'

function App() {
  return (
    <BrowserRouter>
      <h1>Restaurant Booking Management</h1>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/find-table" element={<FindTablePage />} />
        <Route path="/manage-bookings" element={<ManageBookingsPage />} />
        <Route
          path="/reservation-pending"
          element={<ReservationPendingPage />}
        />
        <Route
          path="/reservation-detail"
          element={<ReservationDetailPage />}
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={['staff']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/reservations"
          element={
            <ProtectedRoute allowedRoles={['staff']}>
              <StaffPendingReservations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
