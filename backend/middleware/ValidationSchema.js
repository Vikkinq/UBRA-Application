const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

// ✅ Extension to sanitize any string input
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error("string.escapeHTML", { value });
        return clean; // must return the clean value
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

// ✅ User Validation Schema
const userValidationSchema = Joi.object({
  name: Joi.string().trim().required().escapeHTML(),
  email: Joi.string().trim().email().required().escapeHTML(),
  googleId: Joi.string().optional().allow(null, "").escapeHTML(),
  password: Joi.string().min(6).optional().allow(null, "").escapeHTML(),
  picture: Joi.string()
    .uri()
    .optional()
    .default(
      "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
    ),
});

// ✅ Job Validation Schema
const jobValidationSchema = Joi.object({
  userId: Joi.string().required().escapeHTML(),
  company: Joi.string().trim().required().escapeHTML(),
  role: Joi.string().required().escapeHTML(),
  platform: Joi.string().valid("Email", "JobStreet", "LinkedIn", "Referral", "Other").required().escapeHTML(),
  status: Joi.string()
    .valid("Applied", "Interview Scheduled", "Offer Received", "Offer Accepted", "Rejected", "Withdrawn")
    .default("Applied")
    .escapeHTML(),
  priority: Joi.string().valid("Top Choice", "Consider", "Neutral").default("Neutral").escapeHTML(),
  types: Joi.string().valid("Tech Company", "Non Tech Company", "Government", "Other").default("Other").escapeHTML(),
  notes: Joi.string().allow("", null).escapeHTML(),
});

module.exports = {
  userValidationSchema,
  jobValidationSchema,
};
