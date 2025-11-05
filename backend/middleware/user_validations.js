const jwt = require("jsonwebtoken");
const User = require("../models/User");
const rateLimit = require("express-rate-limit");

module.exports.verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports.loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  statusCode: 429,
  message: {
    success: false,
    error: "Too many login attempts. Please try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => req.body.email || rateLimit.ipKeyGenerator(req),
});

// module.exports.isLoggedIn = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: "No Token" });
//   next();
// };
