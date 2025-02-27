const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get token from the header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: 'Bearer <token>'

    if (!token) return res.status(401).json({ message: 'Access token is missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // user payload from token
        next();
    });
};

module.exports = authenticateToken;