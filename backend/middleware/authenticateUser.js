

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const authenticateUser = async (req, res, next) => {
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
    if (error.name === "JsonWebTokenError") {
      console.log("Invalid token signature");
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    res.status(500).json({ error: "Internal Server Error", details: error.message, stack: error.stack });
  }
};

export default authenticateUser;


// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// const authenticateUser = async (req, res, next) => {
//     try {
//         // Step 1: Get the token from the cookies
//         const token = req.cookies.jwt;
//         console.log("Token from cookies:", token); // Log token to verify it's being received

//         // Step 2: If token is not present, send Unauthorized response
//         if (!token) {
//             console.log("No token found in cookies");
//             return res.status(401).json({ error: "Unauthorized - No token provided" });
//         }

//         // Step 3: Verify the token using JWT_SECRET
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded JWT:", decoded); // Log decoded token to check the payload

//         // Step 4: If the token is invalid, send Unauthorized response
//         if (!decoded) {
//             return res.status(401).json({ error: "Unauthorized - Invalid token" });
//         }

//         // Step 5: Find the user by userId from the decoded token, excluding password field
//         const user = await User.findById(decoded.userId).select("-password");

//         // Step 6: If no user is found, send an error response
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Step 7: Attach the user object to the request for later use
//         req.user = user;
//         req.userId = decoded.userId; // Pass userId for future use if needed

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         console.log("Error in middleware:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export default authenticateUser;
