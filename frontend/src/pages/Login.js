import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';


const Login = ({ setNotification }) => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('jwtToken', response.data.token);
            // Use the login function from content to store token and user info
            login(response.data.token, { email });
            setNotification('Login successful!')
            console.log('Login successful!', response.data.token);
            //Navigate to products page
            navigate('/products');
        } catch (err) {
            setError('Invalid credentials, please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required></input>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up!</Link>
            </p>
        </div>
    )
}

export default Login;