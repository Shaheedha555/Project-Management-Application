const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  //checking for if header contain token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //taking token part that contains user informations
      token = req.headers.authorization.split(" ")[1];
      //verifying by decoding token and secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //saving user into req.user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);

      res.status(401).json("error");
    }
  }
  if (!token) {
    console.log("no tkn");

    res.status(403).json("not authorized");
  }
};

module.exports = protect;
