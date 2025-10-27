const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const User = require("../models/User");

router.get("/data", async (req, res, next) => {
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
      userId: owner,
      company,
      role,
      platform,
      status,
      priority,
      notes,
    });

    const savedJob = await jobData.save();
    console.log("Data Saved");

    res.status(201).json({
      success: true,
      message: "Job entry created successfully",
      data: savedJob,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id/data", async (req, res, next) => {
  try {
    const id = req.params.id;
    const findJob = await Job.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!findJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(201).json({
      success: true,
      message: "Job entry updated successfully",
      data: findJob,
    });
    console.log("Successfully Updated");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/data/delete", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteJob = await Job.findByIdAndDelete(id);

    if (!deleteJob) {
      return res.status(404).json({ message: "Job not Found" });
    }

    console.log("Successfulled Deleted");
    res.status(201).json({
      success: true,
      message: "Job entry deleted successfully",
      data: deleteJob,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
