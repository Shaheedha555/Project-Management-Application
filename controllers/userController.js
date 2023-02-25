const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// function for generating jwt using user id and secret
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// create new user
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      //generating salt and hashing password using salt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id),
      });
    } else res.status(403).json("User already exist");
  } catch (error) {
    next(error);
  }
};

// login already registered user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      //comparing passwords of req.body and database
      const comparePassword = await bcrypt.compare(password, user.password);

      if (comparePassword) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else res.status(403).json("Wrong password");
    } else res.status(404).json("User not found");
  } catch (error) {
    next(error);
  }
};

//get all user details except password
const getAlluser = async (req, res, next) => {
  try {
    //taking all user data without passwords
    const users = await User.find({}).select("-password");

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//get user data using id
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    //take user data without password
    const user = await User.findById(id).select("-password").lean();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//update current user data
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    //check if the requested user and account user is same
    if (id == req.user._id) {
      const { name, email, password, new_password } = req.body;
      const user = await User.findById(id).lean();

      if (password && new_password) {
        console.log("pswd");
        const comparePassword = await bcrypt.compare(password, user.password);

        if (comparePassword) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(new_password, salt);

          const newUserData = await User.findByIdAndUpdate(
            id,
            {
              password: hashedPassword,
            },
            {
              new: true,
            }
          ).select("-password");

          res.status(200).json(newUserData);
        } else res.status(401).json("Wrong password");
      }

      //check if new email is already used
      const checkEmail = await User.findOne({ email, _id: { $ne: id } });

      if (checkEmail) res.json("Email already used");

      const newUserData = await User.findByIdAndUpdate(
        id,
        {
          name,
          email,
        },
        {
          new: true,
        }
      )
        .select("-password")
        .lean();

      res.status(200).json(newUserData);
    } else {
      res.status(403).json("Permission denied");
    }
  } catch (error) {
    next(error);
  }
};

//delete current user account
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    //check if the requested user and account user is same
    if (id == req.user._id) {
      await User.findByIdAndDelete(id);

      res.status(200).json("User deleted successfully");
    } else res.status(403).json("Permission denied");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAlluser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
};
