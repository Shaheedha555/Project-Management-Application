const taskRouter = require("express").Router();

//controller functions
const {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
  getAllTasksOfUser,
  getAllTasksOfProject,
} = require("../controllers/taskController");

//validation middlewares
const {
  validateTaskData,
  validateNewTaskData,
} = require("../middlewares/validationMiddleware");

//jwt middleware
const protect = require("../middlewares/authMiddleware");

//routing
taskRouter.get("/project", protect, getAllTasksOfProject);
taskRouter.get("/my-tasks", protect, getAllTasksOfUser);
taskRouter
  .route("/:id")
  .get(protect, getTask)
  .put(protect, validateNewTaskData, updateTask)
  .delete(protect, deleteTask);
taskRouter
  .route("/")
  .post(protect, validateTaskData, createTask)
  .get(protect, getAllTask);

module.exports = taskRouter;
