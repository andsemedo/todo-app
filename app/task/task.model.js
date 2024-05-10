const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const User = require("../user/user.model");

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Task title"],
    },

    description: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ["PENDING", "IN PROGRESS", "COMPLETED"],
      default: "PENDING",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
