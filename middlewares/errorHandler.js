const errorHandler = (err, req, res, next) => {
  console.log("error middleware");
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: false,
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = errorHandler;
