const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); // desecending order

  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such workout" });

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }

  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  console.log(title , load, reps)
  let emptyField = [];

  if (!title) {
    emptyField.push("title");
  }
  if (!load) {
    emptyField.push("load");
  }
  if (!reps) {
    emptyField.push("reps");
  }

  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyField });
  }
  // console.log(req,"req")
  //add doc to db
  try {
    console.log(req.body,"body");
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  // fet the passed id
  const { id } = req.params;

  //check if is it a valid type mongoose id?
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such workout" });

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) return res.status(400).json({ error: "no such workout" });

  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  // fet the passed id
  const { id } = req.params;

  //check if is it a valid type mongoose id?
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such workout" });

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) return res.status(400).json({ error: "no such workout" });

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
