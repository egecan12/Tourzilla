const app = require("./app");
const port = 3000;

//START SERVER
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
