const userRouter = require("express").Router();

//controller functions
const {
  createUser,
  loginUser,
  getAlluser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

//validation middlewares
const {
  validateUserData,
  validateNewUserData,
} = require("../middlewares/validationMiddleware");

//jwt middleware
const protect = require("../middlewares/authMiddleware");

//routing
userRouter
  .route("/:id")
  .get(protect, getUser)
  .put(protect, validateNewUserData, updateUser)
  .delete(protect, deleteUser);
userRouter
  .route("/")
  .post(validateUserData, createUser)
  .get(protect, getAlluser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
