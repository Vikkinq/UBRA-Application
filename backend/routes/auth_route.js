const express = require("express");
const passport = require("passport");

const router = express.Router();
const AuthController = require("../controllers/AuthController");

// Error Handler
const getToken = require("../utilities/getToken");
const { verifyUser, loginLimiter } = require("../middleware/user_validations");
const { userValidationSchema } = require("../middleware/ValidationSchema");
const { validateBody } = require("../middleware/GlobalMiddleware");

router.post("/signup", validateBody(userValidationSchema), AuthController.SignUp);
router.post("/login", loginLimiter, AuthController.LogIn);
router.post("/logout", AuthController.LogOut);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google", { session: false }), AuthController.GoogleCallback);
router.get("/current", verifyUser, AuthController.CurrentUser);

module.exports = router;
