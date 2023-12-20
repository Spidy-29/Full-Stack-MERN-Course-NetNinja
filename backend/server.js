// entry file for backend application.
// where we're going to register the express app
require("dotenv").config();
const express = require("express");
const workoutRouters = require("./routes/workoutsRoutes");
const mongoose = require("mongoose");

// express app
const app = express();

//middleware
app.use(express.json()); // check if inside req body is pass by application, pass and attach to req body
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
});

// routes
app.use("/api/workouts", workoutRouters); //base uri attach

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
