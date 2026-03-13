import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./views/Login/Login"));
const Register = lazy(() => import("./views/Register/Register"));
const Dashboard = lazy(() => import("./views/Dashboard/Dashboard"));
const UserProfile = lazy(() => import("./views/UserProfile/UserProfile"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-profile" element={<UserProfile />} />
        <Route path="*" element={<Login />} />{" "}
      </Routes>
    </Suspense>
  );
};

export default App;
