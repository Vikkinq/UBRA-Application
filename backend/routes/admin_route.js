const express = require("express");
const router = express.Router();

router.get("/admin", async (req, res, next) => {
  res.json("Tae");
});

module.exports = router;
