const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["Email", "JobStreet", "LinkedIn", "Referral", "Other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview Scheduled", "Offer Received", "Offer Accepted", "Rejected", "Withdrawn"],
      default: "Applied",
    },
    priority: {
      type: String,
      enum: ["Top Choice", "Consider", "Neutral"],
      default: "Neutral",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
