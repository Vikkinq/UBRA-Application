const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Job = require("../models/Job");

router.get("/users", async (req, res, next) => {
  try {
    const findUsers = await User.find({}).sort({ createdAt: -1 });

    const userDocuments = await Job.countDocuments();

    res.json(findUsers);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
