const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

//v1 stands for version one, it is a good practice to sepperate the versions

//ROUTE HANDLERS

//ROUTES

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
//START SERVER
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
