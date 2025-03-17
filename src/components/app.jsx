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
import Operator from "../app/layout/page/operator/index";
import ApprovalList from "../app/layout/page/approval/index";
import AttendanceTable from "../app/layout/page/attendance/index";
import OP_Salary from "../app/layout/page/salary";
import Garenal_setting from "../app/layout/page/company/company_setting";
import Company_index from "../app/layout/page/company/company_index";
import Companis from "../app/layout/page/company/company_list";
import Company_permission from "../app/layout/page/company/company_permission";
import OP_details from "../app/layout/page/operator/op_details";
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/electron/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="company" element={<Company />}>
              <Route index element={<Company_index />} />
              <Route path="setting" element={<Garenal_setting />} />
              <Route path="companis" element={<Companis />} />
              <Route path="permission" element={<Company_permission />} />
            </Route>
            <Route path="employee" element={<Employee />} />
            <Route path="profile" element={<User_profile />} />
            <Route path="operator" element={<Operator />}>
              <Route path=":id" element={<OP_details />} />
            </Route>
            <Route path="approver" element={<ApprovalList />} />
            <Route path="attendance" element={<AttendanceTable />} />
            <Route path="op_salary" element={<OP_Salary />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/electron/login/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
export default App;
