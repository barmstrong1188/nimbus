import React, { useEffect } from 'react';

const Notification = ({ message, clearMessage }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            clearMessage();
        }, 3000) //Hide message after 3 seconds
        return () => clearTimeout(timer);
    }, [message, clearMessage]);

    if (!message) return null;

    return (
        <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'green',
          color: 'white',
          padding: '0.75rem 1rem',
          borderRadius: '5px',
          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)',
          zIndex: 9999, // Make sure it appears above other elements
        }}>
            {message}
        </div>
    );
};

export default Notification;