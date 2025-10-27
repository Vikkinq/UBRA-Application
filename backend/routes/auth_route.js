const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const router = express.Router();

const User = require("../models/User");
const ExpressError = require("../middleware/ExpressError");

// Error Handler
const getToken = require("../utilities/getToken");

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ExpressError("User already Exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCredentials = await User.create({ name, email, password: hashedPassword });
    const token = getToken(userCredentials);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
    });

    res.status(201).json({ success: true, userCredentials, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ExpressError("user not found, please try again", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ExpressError("Invalid email or password", 400));

    const token = getToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
    });

    const { password: _, ...safeUser } = user.toObject();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
      token,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
