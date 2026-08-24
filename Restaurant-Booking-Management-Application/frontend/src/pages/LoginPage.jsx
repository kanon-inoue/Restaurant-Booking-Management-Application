import { useLocation } from 'react-router-dom';

function LoginPage() {
    const location = useLocation();

    return (
        <div>
            <h2>Login</h2>

            {location.state?.message && (
                <p>{location.state.message}</p>
            )}

            <form>
                <div>
                    <label>Email</label>
                    <input type="email" />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" />
                </div>

                <button type="button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;