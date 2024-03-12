const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//START SERVER
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
