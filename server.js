const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

dotenv.config({ path: "./.env" });
  
// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected..."))
  .catch((error) => console.log("An error occured..."));
 
// Serve client folder
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/api/test",async (req, res, next) => {
  try {
 res.send("the api is working....") 
  } catch (error) {
    console.log(error)
  }
  
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//   Listen to port
exports.expressServer = app.listen(process.env.PORT || 4000, () =>
  console.log("Listening...",process.env.PORT )
);
