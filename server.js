const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

//to be able to send bod with req we need this middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const tourData = fs.readFileSync(
  `${__dirname}/data/tours.json`,
  "utf-8",
  (err, data) => {}
);
console.log(JSON.parse(tourData));

//v1 stands for version one, it is a good practice to sepperate the versions
app.get("/api/v1/tours", (req, res) => {
  // Simulate data (replace this with your actual data retrieval logic)
  res.status(200).json({
    status: "success",
    results: tourData.length,
    data: {
      tours: tourData,
    },
  });
  res.end();
});

app.post("/api/v1/tours", (req, res) => {
  console.log(req);
  res.end("done");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
