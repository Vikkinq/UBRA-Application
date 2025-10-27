const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No Token" });
};
