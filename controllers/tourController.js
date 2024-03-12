const Tour = require('../models/tourModel');

// exports.getAllTours = (req, res) => {
//   // Simulate data (replace this with your actual data retrieval logic)
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     requestTime: req.requestTime,
//     data: {
//       tours: tours,
//     },
//   });
//   res.end();
// };

// exports.getTour = (req, res) => {
//   console.log(req.params);

//   const filteredTours = tours.find((el) => {
//     return el.id === parseInt(req.params.id);
//   });
//   res.status(200).json({
//     status: 'success',
//     data: {
//       filteredTours,
//     },
//   });
// };
// exports.updateTour = (req, res) => {
//   const foundTour = tours.find((el) => el.id === parseInt(req.params.id));
//   console.log(parseInt(req.params));
//   res.status(200).json({
//     status: 'success',
//     message: 'successfully updated',
//     data: {
//       tour: '<updated data here>',
//     },
//   });
// };

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};
