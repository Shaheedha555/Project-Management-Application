const { body, validationResult } = require("express-validator");

// Sanitize and validate user input middleware function
exports.validateUserData = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("User name is required"),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is not a valid email"),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("password should contain 6 letters minimum"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(422)
        .json({ errors: errors.array().map((error) => error.msg) });
    }
    next();
  },
];
exports.validateProjectData = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Project name is required"),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Project description is required"),
  body("due_date").not().isEmpty().isDate().withMessage("Date is not valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array().map((error) => error.msg) });
    }
    next();
  },
];
exports.validateTaskData = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Task name is required"),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Task description is required"),
  body("due_date").not().isEmpty().toDate().withMessage("Date is not valid"),
  body("project_id").not().isEmpty().withMessage("Project id required"),
  body("user_id").not().isEmpty().withMessage("User id required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array().map((error) => error.msg) });
    }
    next();
  },
];

exports.validateNewUserData = [
  body("name").optional().trim().escape(),
  body("email").optional().isEmail().normalizeEmail(),
  body("password").optional().isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array().map((error) => error.msg) });
    }
    next();
  },
];
exports.validateNewProjectData = [
  body("name").optional().trim().escape(),
  body("description").optional().trim().escape(),
  body("due_date").optional().isDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array().map((error) => error.msg) });
    }
    next();
  },
];
exports.validateNewTaskData = [
  body("name").optional().trim().escape(),
  body("description").optional().trim().escape(),
  body("due_date").optional().isDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array().map((error) => error.msg) });
    }
    next();
  },
];
