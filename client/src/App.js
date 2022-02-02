import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar.js";
import Landing from "./components/layout/Landing.js";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => (
  <Fragment>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route
          exact
          path="login"
          element={
            <section className="container">
              <Login />
            </section>
          }
        />
        <Route
          exact
          path="register"
          element={
            <section className="container">
              <Register />
            </section>
          }
        />
      </Routes>
    </Router>
  </Fragment>
);

export default App;
