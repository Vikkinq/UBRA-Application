const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { jobValidationSchema } = require("./ValidationSchema");
const { userValidationSchema } = require("./ValidationSchema");

module.exports.validateJob = (req, res, next) => {
  const { error } = jobValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
  }
  next();
};

// middleware/validateSchema.js
module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((d) => d.message);
      return res.status(400).json({ errors: errorMessages });
    }
    req.body = value; // sanitized data
    next();
  };
};
