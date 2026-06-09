import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Token received:", token);

        if (!token) {
            console.log("No token found");
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("User not found for userId:", decoded.userId);
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User found:", user);

        // Attach user and userId to the request object
        req.user = user;
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in middleware:", error.message);
        if (error.name === "TokenExpiredError") {
            console.log("Token expired");
            return res.status(401).json({ error: "Session expired. Please log in again." });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { protectRoute };
export default protectRoute;
