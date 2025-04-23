import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let token;

    // First check the Authorization header
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // If not in header, check cookies
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Must match the field used in your jwt.sign
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;
