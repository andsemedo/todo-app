const router = require("express").Router();
const auth = require("../middleware/auth");
const taskController = require("./task.controller");

router.post("/task", auth, taskController.create);
router.get("/task", auth, taskController.getById);
router.get("/task/all", auth, taskController.getAll);
router.put("/task", auth, taskController.update);
router.put("/task/status", auth, taskController.updateStatus);
router.delete("/task/delete", auth, taskController.delete);

module.exports = router;
