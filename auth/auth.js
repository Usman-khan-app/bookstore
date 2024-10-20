const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: "Token unauthorized" });
        }

        const token = authHeader.split(' ')[1]; // Split by space and get the token
        if (!token) {
            return res.status(401).json({ message: "Token unauthorized" });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized", error: err.message });
            }

            // Attach user information to the request object
            req.userId = decoded.id; // Add user ID
            req.role = decoded.role; // Add user role
            req.email = decoded.email; // Add user email

            next(); // Call the next middleware
        });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { checkAuth };




