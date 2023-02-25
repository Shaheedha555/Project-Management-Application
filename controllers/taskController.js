const Task = require("../models/Task");
const Project = require("../models/Project");

//create new task for a project with a user
const createTask = async (req, res, next) => {
  try {
    const { name, description, due_date, project_id, user_id } = req.body;
    const project = await Project.findById(project_id).lean();

    //checks project owner and current user are same
    if (project.user_id.toString() == req.user._id.toString()) {
      const task = await Task.create({
        name,
        description,
        due_date,
        user_id,
        project_id,
      });

      res.status(200).json(task);
    } else res.status(403).json("Permission denied");
  } catch (error) {
    next(error);
  }
};

//get all tasks
const getAllTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).lean();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

//get all tasks of specific project
const getAllTasksOfProject = async (req, res, next) => {
  try {
    const id = req.query.id;
    const tasks = await Task.find({ project_id: id }).lean();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

//get all tasks of current user
const getAllTasksOfUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const tasks = await Task.find({ user_id: id }).lean();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

//get task details using id
const getTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id).lean();

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

//update task details of current user
const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id).lean();

    //chech if requested user id and account user id is same
    if (task.user_id.toString() == req.user._id.toString()) {
      const { name, description, due_date } = req.body;

      const newTask = await Task.findByIdAndUpdate(id, {
        name,
        description,
        due_date,
      }).lean();

      res.status(200).json(newTask);
    } else res.status(403).json("Permission denied");
  } catch (error) {
    next(error);
  }
};

//delete a task
const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id).lean();

    //chech if requested user id and account user id is same
    if (task.user_id.toString() == req.user._id.toString()) {
      await Task.findByIdAndDelete(id);

      res.status(200).json("Task deleted successfully");
    } else {
      res.json("Permission denied");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
  getAllTasksOfProject,
  getAllTasksOfUser,
};
