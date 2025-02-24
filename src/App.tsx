import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Dashboard from "./views/Dashboard/Dashboard";
import UserProfile from "./views/UserProfile/UserProfile";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/update-profile" element={<UserProfile />} />
      <Route path="*" element={<Login />} />{" "}
      {/* Redirect unknown routes to login */}
    </Routes>
  );
};

export default App;
