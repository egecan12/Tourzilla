const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//MIDDLEWARES

app.use(express.json());
if (process.env.NODE_ENV === 'developemnet') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

//v1 stands for version one, it is a good practice to sepperate the versions

//ROUTE HANDLERS

//ROUTES

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
