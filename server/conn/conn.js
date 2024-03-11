const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
    .connect("mongodb+srv://pomodoro-app:zn4IB2IHFClfFWzW@cluster0.vywnfeb.mongodb.net/").then(() =>{
      console.log("Connected to Database");
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

conn();

