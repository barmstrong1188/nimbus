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
        <div>
            {message}
        </div>
    );
};

export default Notification;