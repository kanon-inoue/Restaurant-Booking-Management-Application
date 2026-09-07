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

        <Route 
          path="/customer-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/find-table" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <FindTablePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manage-bookings" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ManageBookingsPage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/reservation-pending"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ReservationPendingPage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/reservation-detail"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ReservationDetailPage />
            </ProtectedRoute>
          } 
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
