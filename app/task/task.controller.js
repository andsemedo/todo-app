const taskServices = require("./task.services");
const TaskService = require("./task.services");

class TaskController {
  async create(req, res) {
    try {
      const task = await TaskService.create({
        ...req.body,
        owner: req.user._id,
      });
      res.status(201).json({ message: "created", data: task });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.query.id;
      console.log(id);
      const task = await TaskService.getById(id);
      if (task === null)
        res.status(404).json({ message: "task not found", data: {} });
      if (task !== null)
        res.status(200).json({ message: "task found", data: task });
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }

  async getAll(req, res) {
    console.log("GET ALL " + req.user);
    try {
      const filter = { owner: req.user._id };
      const tasks = await TaskService.getAll(filter);
      res.status(200).json({ message: "get all", data: tasks });
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }

  async update(req, res) {
    try {
      // search for task
      const task = await TaskService.getById(req.query.id);
      if (task === null) {
        res
          .status(404)
          .json({ message: "Task with the provided id not found", data: {} });
      }
      const filter = { _id: req.query.id };

      // update the fields
      const update = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        updatedAt: Date.now,
      };
      const taskUpdated = await taskServices.update(filter, update);
      res.status(200).json({ message: "updated", data: taskUpdated });
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }

  async updateStatus(req, res) {
    try {
      // search for task
      const task = await TaskService.getById(req.query.id);
      if (task === null) {
        res
          .status(404)
          .json({ message: "Task with the provided id not found", data: {} });
      }
      const filter = { _id: req.query.id };
      // update the fields
      const update = {
        status: req.body.status,
      };
      const taskUpdated = await taskServices.updateStatus(filter, update);
      res.status(200).json({ message: "status updated", data: taskUpdated });
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }

  async delete(req, res) {
    console.log("DELETE");
    try {
      const filter = { _id: req.query.id };
      await taskServices.delete(filter);
      res.status(200).json({ message: "deleted", data: {} });
    } catch (error) {
      res.status(500).json({ message: error.message, data: null });
    }
  }
}

module.exports = new TaskController();
