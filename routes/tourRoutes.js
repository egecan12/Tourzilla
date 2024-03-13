const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router.route('/get-tour-stats').get(tourController.getTourStats);
router.route('/get-monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
