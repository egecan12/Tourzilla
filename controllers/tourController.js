const fs = require("fs");

const tourData = fs.readFileSync(
  `${__dirname}/../data/tours-simple.json`,
  "utf-8",
  (err, data) => {}
);
const tours = JSON.parse(tourData);

exports.checkID = (req, res, next, val) => {
  const filteredTours = tours.find((el) => {
    return el.id === parseInt(req.params.id);
  });
  if (!filteredTours) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  next();
};

exports.checkRequestBody = (req, res, next) => {
  // console.log(req.body);
  if (!req.body.name || !req.body.duration) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  console.log(req.params);

  const filteredTours = tours.find((el) => {
    return el.id === parseInt(req.params.id);
  });
  res.status(200).json({
    status: "success",
    data: {
      filteredTours,
    },
  });
};
exports.updateTour = (req, res) => {
  const foundTour = tours.find((el) => el.id === parseInt(req.params.id));
  console.log(parseInt(req.params));
  res.status(200).json({
    status: "success",
    message: "successfully updated",
    data: {
      tour: "<updated data here>",
    },
  });
};

exports.createTour = (req, res) => {
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
