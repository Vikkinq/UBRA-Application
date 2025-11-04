import Joi from "joi";

// ✅ User Validation Schema
export const userValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  googleId: Joi.string().optional().allow(null, ""),
  password: Joi.string().min(6).optional().allow(null, ""),
  picture: Joi.string().uri().optional(),
});

// ✅ Job Validation Schema
export const jobValidationSchema = Joi.object({
  userId: Joi.string().required(),
  company: Joi.string().trim().required(),
  role: Joi.string().required(),
  platform: Joi.string().valid("Email", "JobStreet", "LinkedIn", "Referral", "Other").required(),
  status: Joi.string()
    .valid("Applied", "Interview Scheduled", "Offer Received", "Offer Accepted", "Rejected", "Withdrawn")
    .default("Applied"),
  priority: Joi.string().valid("Top Choice", "Consider", "Neutral").default("Neutral"),
  types: Joi.string().valid("Tech Company", "Non Tech Company", "Government", "Other").default("Other"),
  notes: Joi.string().allow("", null),
});
