const express = require("express");
const router = express.Router();

const JobController = require("../controllers/JobController");
const { verifyUser } = require("../middleware/user_validations");

router.get("/data", verifyUser, JobController.RenderJob);
router.post("/data", verifyUser, JobController.CreateJob);
router.put("/:id/data", verifyUser, JobController.UpdateJob);
router.delete("/:id/data/delete", verifyUser, JobController.DeleteJob);

router.get("/data/stats", verifyUser, JobController.GetJobStats);

module.exports = router;
