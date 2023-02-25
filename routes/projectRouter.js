const projectRouter = require("express").Router();

//controller functions
const {
  createProject,
  getAllProject,
  getProject,
  updateProject,
  deleteProject,
  getAllProjectOfUser,
} = require("../controllers/projectController");

//jwt middleware
const protect = require("../middlewares/authMiddleware");

//validation middlewares
const {
  validateProjectData,
  validateNewProjectData,
} = require("../middlewares/validationMiddleware");

//routing
projectRouter.get("/my-projects", protect, getAllProjectOfUser);
projectRouter
  .route("/:id")
  .get(protect, getProject)
  .put(protect, validateNewProjectData, updateProject)
  .delete(protect, deleteProject);
projectRouter
  .route("/")
  .post(protect, validateProjectData, createProject)
  .get(protect, getAllProject);

module.exports = projectRouter;
