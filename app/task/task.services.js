const Task = require("./task.model"); // Database Model

class TaskService {
  async create(taskToCreate) {
    try {
      const newTask = new Task(taskToCreate);
      return await newTask.save();
    } catch (err) {
      return err;
    }
  }

  async getById(id) {
    try {
      return await Task.findById(id).exec();
    } catch (error) {
      return error;
    }
  }

  async getAll(owner) {
    try {
      return await Task.find(owner).sort({ updatedAt: "desc" });
    } catch (error) {
      return error;
    }
  }

  async update(filter, update) {
    try {
      console.log(filter);
      console.log(update);
      await Task.findOneAndUpdate(filter, update, { new: true });
      return Task.findOne(filter);
    } catch (error) {
      return error;
    }
  }

  async updateStatus(filter, update) {
    try {
      await Task.findOneAndUpdate(filter, update, { new: true });
      return Task.findOne(filter);
    } catch (error) {
      return error;
    }
  }

  async delete(filter) {
    try {
      return await Task.findOneAndDelete(filter);
    } catch (error) {
      return error;
    }
  }
}

module.exports = new TaskService();
