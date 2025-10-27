const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const User = require("../models/User");

router.post("/data", async (req, res, next) => {
  try {
    const jobList = await Job.find();
    res.json(jobList);
  } catch (err) {
    next(err);
  }
});

router.post("/data/create", async (req, res, next) => {
  try {
    const { owner, company, role, platform, status, priority, notes } = req.body;
    const jobData = new Job({
      owner,
      company,
      role,
      platform,
      status,
      priority,
      notes,
    });

    const savedJob = await jobData.save();

    res.status(201).json({
      success: true,
      message: "Job entry created successfully",
      data: savedJob,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
