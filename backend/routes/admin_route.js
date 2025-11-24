const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/users", async (req, res, next) => {
  const findUsers = await User.find({});

  res.json(findUsers);
});

module.exports = router;
