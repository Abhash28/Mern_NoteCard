const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("database connect successfully");
  } catch (error) {
    console.log("while db connection  error", error.message);
  }
};

module.exports = dbConnection;
