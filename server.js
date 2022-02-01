import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoute from "./routes/api/users.js";
import authRoute from "./routes/api/auth.js";
import profileRoute from "./routes/api/profile.js";
import postRoute from "./routes/api/post.js";

const app = express();

dotenv.config();

// Connect Database
connectDB();

// Init Middleware Body Parser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("hello"));

// Define routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/post", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
