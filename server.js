const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const morgan = require("morgan");

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

const tourData = fs.readFileSync(
  `${__dirname}/data/tours.json`,
  "utf-8",
  (err, data) => {}
);
const tours = JSON.parse(tourData);

//v1 stands for version one, it is a good practice to sepperate the versions

//ROUTE HANDLERS
const getAllTours = (req, res) => {
  // Simulate data (replace this with your actual data retrieval logic)
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours: tours,
    },
  });
  res.end();
};

const getTour = (req, res) => {
  console.log(req.params);

  const filteredTours = tours.find((el) => {
    return el.id === parseInt(req.params.id);
  });
  if (!filteredTours) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      filteredTours,
    },
  });
};
const updateTour = (req, res) => {
  const foundTour = tours.find((el) => el.id === parseInt(req.params.id));
  console.log(parseInt(req.params));
  if (!foundTour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfully updated",
    data: {
      tour: "<updated data here>",
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;

  //object assing let us merge 2 objects
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    //201 means it is created- almost same as 200
    res.status(201).json({
      status: "success",
      data: {
        tours: tours,
      },
    });
  });
};
const getAllUsers = (req, res) => {
  // Simulate data (replace this with your actual data retrieval logic)
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours: tours,
    },
  });
  res.end();
};

const getUser = (req, res) => {
  console.log(req.params);

  const filteredTours = tours.find((el) => {
    return el.id === parseInt(req.params.id);
  });
  if (!filteredTours) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      filteredTours,
    },
  });
};
const updateUser = (req, res) => {
  const foundTour = tours.find((el) => el.id === parseInt(req.params.id));
  console.log(parseInt(req.params));
  if (!foundTour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfully updated",
    data: {
      tour: "<updated data here>",
    },
  });
};

const createUser = (req, res) => {
  console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;

  //object assing let us merge 2 objects
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    //201 means it is created- almost same as 200
    res.status(201).json({
      status: "success",
      data: {
        tours: tours,
      },
    });
  });
};

//ROUTES

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.post("/api/v1/tours", createTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour);

app.route("/api/v1/users").get(getAllUsers).post(createUser);
app.route("/api/v1/users/:id").get(getUser).patch(updateUser);

//START SERVER
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
