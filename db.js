const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/todo")
    .then(() => console.log("Connected!"))
    .catch(() => console.log("Connection failed!"));
};

module.exports = connectDB;
