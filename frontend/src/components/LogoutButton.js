import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = ({ setNotification }) => {
    const { logout } =useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setNotification('Logout successful!')
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;