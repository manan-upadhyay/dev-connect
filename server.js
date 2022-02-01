import express from "express";
import connectDB from "./config/db.js";

const app = express();

// Connect Database
connectDB();

app.use("/", (req, res) => res.send("hello"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
