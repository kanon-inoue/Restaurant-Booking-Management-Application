import { useState } from 'react';
import {
    useLocation,
    useNavigate,
} from 'react-router-dom';

function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState(
        location.state?.message || ''
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setMessage('Email and password are required');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || 'Login failed');
                return;
            }

            localStorage.setItem('token', data.token);
            navigate('/customerdashboard');
        } catch (error) {
            setMessage('Unable to connect to the server');
        }
    };

    return (
        <div>
            <h2>Login</h2>

            {location.state?.message && (
                <p>{location.state.message}</p>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginPage;