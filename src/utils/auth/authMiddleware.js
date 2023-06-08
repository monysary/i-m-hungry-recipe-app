// middleware to check if user is logged in
import jwt from "jsonwebtoken";

module.exports = {
  isAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Missing authorization token" });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  },
};
