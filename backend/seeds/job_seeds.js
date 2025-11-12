if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Job = require("../models/Job");
const data = require("./job_data");

// MongoDB Connection
// const mongo_url = process.env.MONGO_ATLAS || "mongodb://127.0.0.1:27017/2_MERN_UBRA";
const mongo_local = "mongodb://127.0.0.1:27017/2_MERN_UBRA";

main().catch((err) => console.log("Error Connection", err));
async function main() {
  await mongoose.connect(mongo_local);
  console.log("DB CONNECTED!");
}

const seedJobs = async () => {
  try {
    await Job.deleteMany({});
    await Job.insertMany(data);

    console.log(`Successfully Seeded Data: ${data.length}x`);
  } catch (err) {
    console.error(`Seed Error: `, err);
  } finally {
    await mongoose.disconnect();
    console.log("DISCONNECTED!");
  }
};

seedJobs();
