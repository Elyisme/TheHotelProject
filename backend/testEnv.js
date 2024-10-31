require("dotenv").config({ path: "./backend/.env" }); // Explicitly point to the file

console.log(
  "Test MONGO_URI:",
  process.env.MONGO_URI || "Environment variable not found"
);
