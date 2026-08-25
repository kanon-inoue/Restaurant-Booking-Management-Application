import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
    return (
        <BrowserRouter>
            <h1>Restaurant Booking Management</h1>
            <Routes>
                <Route path="/" element={<SignupPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customerdashboard" element={<CustomerDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;