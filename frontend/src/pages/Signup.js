import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api/api';

const Signup = ({ setNotification }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupUser({ email, password });
            setNotification('Signup successful! You can now log in.');
            navigate('/login');
        } catch (err) {
            console.error('Signup error', err);
            setError(err.response?.data?.message || 'Signup failed, please try again.');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;