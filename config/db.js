const mongoose = require("mongoose");

const database = async (uri) => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = database;
