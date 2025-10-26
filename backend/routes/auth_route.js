const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const router = express.Router();

const User = require("../models/User");

// Error Handler
const ExpressError = require("../middleware/ExpressError");

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ExpressError("User already Exists", 400));
    }
  } catch (err) {
    next(err);
  }
});
