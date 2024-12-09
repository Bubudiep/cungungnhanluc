import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../app";
import Login from "../app/login";
import NotFound from "../app/404";
import Dashboard from "../app/layout/page/dashboard";
import "@fortawesome/fontawesome-free/css/all.css";
import Employee from "../app/layout/page/employee";
import Company from "../app/layout/page/company";
import User_profile from "../app/layout/page/user";
import { UserProvider } from "./userContext";
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company" element={<Company />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/profile" element={<User_profile />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
export default App;
