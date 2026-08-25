import { Navigate, useNavigate } from 'react-router-dom';

function CustomerDashboard() {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/login', {
            replace: true,
            state: {
                message: 'You have been logged out.',
            },
        });
    };

    return (
        <div>
            <h2>Customer Dashboard</h2>
            <p>Welcome to the Restaurant Booking Management Application.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default CustomerDashboard;