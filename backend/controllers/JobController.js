const Job = require("../models/Job");

const RenderJob = async (req, res, next) => {
  try {
    // console.log("Decoded User: ", req.user.id);
    // Get pagination values (defaults: page 1, limit 30)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const skip = (page - 1) * limit;

    const jobList = await Job.find({ userId: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await Job.countDocuments({ userId: req.user._id });
    res.json({
      jobList,
      total,
      skip,
      page,
      hasMore: page * limit < total,
    });
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

const GetJobStats = async (req, res, next) => {
  try {
    const stats = await Job.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const jobCount = await Job.countDocuments({ userId: req.user._id });

    // Convert to object for quick lookup
    const formatted = stats.reduce((acc, cur) => {
      acc[cur._id] = cur.count;
      return acc;
    }, {});

    // Define all possible statuses
    const allStatuses = ["Applied", "Interview Scheduled", "Offer Received", "Offer Accepted", "Rejected", "Withdrawn"];

    // Ensure every status exists, even if count = 0
    const completedStats = allStatuses.map((status) => ({
      title: status,
      count:
        status === "Applied"
          ? jobCount // 👈 put total job count here
          : formatted[status] || 0,
    }));

    res.json(completedStats);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  RenderJob,
  CreateJob,
  UpdateJob,
  DeleteJob,
  GetJobStats,
};
