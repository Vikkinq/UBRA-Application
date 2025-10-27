if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Required Packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
require("./config/passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const authentication_route = require("./routes/auth_route");

// Constant Variables
const app = express();

// Static Logic
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(passport.initialize());

// Middleware
const ExpressError = require("./middleware/ExpressError");

// MongoDB Connection
// const mongo_url = process.env.MONGO_ATLAS || "mongodb://127.0.0.1:27017/2_MERN_UBRA";
const mongo_local = "mongodb://127.0.0.1:27017/2_MERN_UBRA";
main().catch((err) => console.log("Error Connection", err));
async function main() {
  await mongoose.connect(mongo_local);
  console.log("DB CONNECTED!");
}

// HTTP FORMATS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App Servers
app.use("/api/auth", authentication_route);

// No Path Error Handler
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Data Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Oh no! Something Went Wrong!!" } = err;
  const response = { success: false, message };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack; // show stacktrace for debugging
  }

  res.status(statusCode).json(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started: localhost:${PORT}`);
});
