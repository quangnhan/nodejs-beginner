const express = require("express");
const birds = require('./birds')
const app = express();
const port = 3000; // or any other port you prefer

app.use('/birds', birds)

app.get(
  "/example/b",
  (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

const cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

const cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

const cb2 = function (req, res) {
  res.send("Hello from C!");
};

app.get("/example/c", [cb0, cb1, cb2]);

app.get(
  "/example/d",
  cb0, cb1,
  (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from D!");
  }
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
