const Job = require("../models/Job");

const RenderJob = async (req, res, next) => {
  try {
    // console.log("Decoded User: ", req.user.id);
    const jobList = await Job.find({ userId: req.user._id });
    res.json(jobList);
  } catch (err) {
    next(err);
  }
};

const CreateJob = async (req, res, next) => {
  try {
    const { company, role, platform, status, priority, notes, types } = req.body;
    const jobData = new Job({
      userId: req.user.id,
      company,
      role,
      platform,
      status,
      priority,
      types,
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
};

const UpdateJob = async (req, res, next) => {
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
};

const DeleteJob = async (req, res, next) => {
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
};

module.exports = {
  RenderJob,
  CreateJob,
  UpdateJob,
  DeleteJob,
};
