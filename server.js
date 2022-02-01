import express from "express";

const app = express();

app.use("/", (req, res) => res.send("hello"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
