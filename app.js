const express = require("express");
require("dotenv").config();
const database = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const projectRouter = require("./routes/projectRouter");
const cors = require("cors");
const app = express();
const port = process.env.PORT | 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send(
    `<div style="text-align:center; margin:2rem;"><h2>Project Management Application API is ready for getting requests.</h2><p>Refer
     <a href="https://github.com/Shaheedha555/Project-Management-Application/blob/master/API-Documentation.md">documentation</a>
      for making requests. Thank you!</p> </div>`
  );
});
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
