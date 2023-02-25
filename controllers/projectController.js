const Project = require("../models/Project");

//create new project
const createProject = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { name, description, due_date } = req.body;

    const newProject = await Project.create({
      name,
      description,
      due_date,
      user_id,
    });

    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
};

//get all project details
const getAllProject = async (req, res, next) => {
  try {
    const projects = await Project.find({}).lean();

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

//get projects of current user
const getAllProjectOfUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const projects = await Project.find({ user_id: id }).lean();

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

//get a specific project details
const getProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id).lean();

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

//update project of current user
const updateProject = async (req, res, next) => {
  try {
    const { name, description, due_date } = req.body;
    const id = req.params.id;
    const project = await Project.findById(id).lean();

    //chech if requested user id and account user id is same
    if (project.user_id == req.user._id) {
      const newProject = await Project.findByIdAndUpdate(
        id,
        { name, description, due_date },
        { new: true }
      ).lean();

      res.status(200).json(newProject);
    } else {
      res.status(403).json("Permission denied");
    }
  } catch (error) {
    next(error);
  }
};

//delete a project of current user
const deleteProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id).lean();

    //chech if requested user id and account user id is same
    if (project.user_id == req.user._id) {
      await Project.findByIdAndDelete(id);

      res.status(200).json("Project deleted successfully");
    } else {
      res.status(403).json("Permission denied");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getAllProject,
  getProject,
  updateProject,
  deleteProject,
  getAllProjectOfUser,
};
