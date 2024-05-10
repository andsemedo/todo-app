var express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());

// allow to send body in post requests
app.use(express.json());

app.use("/api", require("./task/task.router"));
app.use("/api", require("./user/users.router"));

module.exports = app;
