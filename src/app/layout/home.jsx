import React from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../../components/api";
import Top_container from "./top-container";

const Homepage = ({ user }) => {
  return (
    <div className="home-page">
      <Top_container />
      <div className="body-container">
        <div className="app-container">
          <div className="list-app">
            <Link className="item" to="/dashboard">
              <div className="icon">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <div className="name">Tổng quan</div>
            </Link>
            <Link className="item" to="/employee">
              <div className="icon">
                <i className="fa-solid fa-users-gear"></i>
              </div>
              <div className="name">Nhân viên</div>
            </Link>
          </div>
        </div>
        <div className="main-container">
          <div className="route-container"></div>
          <div className="outlet-box">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
