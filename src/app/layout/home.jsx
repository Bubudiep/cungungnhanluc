import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import api from "../../components/api";
import Top_container from "./top-container";
import avatar from "../../assets/image/avatar.png";
import { useUser } from "../../components/userContext";

const Homepage = () => {
  const { user, setUser } = useUser();
  const location = useLocation();
  const routeNames = {
    "/": "Home",
    "/dashboard": "Tổng quan",
    "/employee": "Nhân viên",
    "/company": "Công ty",
    "/profile": "Cá nhân",
  };
  const breadcrumbItems = location.pathname
    .split("/")
    .filter((item) => item) // Bỏ các phần rỗng
    .map((item, index, arr) => {
      const to = "/" + arr.slice(0, index + 1).join("/"); // Xây dựng đường dẫn cho từng phần
      return { name: routeNames[to] || item, path: to };
    });
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
            {/* <Link className="item" to="/company">
              <div className="icon">
                <i className="fa-regular fa-building"></i>
              </div>
              <div className="name">Công ty</div>
            </Link> */}
          </div>
          <div className="list-app">
            <Link className="item" to="/profile">
              <div className="avatar">
                {user.profile?.avatar ? <></> : <img src={avatar} />}
              </div>
            </Link>
          </div>
        </div>
        <div className="main-container">
          <div className="route-container">
            <div className="route-container">
              <Link to="/" className="items">
                <div className="icon">
                  <i className="fa-solid fa-house"></i>
                </div>
              </Link>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <i className="fa-solid fa-angle-right"></i>
                  {index === breadcrumbItems.length - 1 ? (
                    <span className="breadcrumb-item active">{item.name}</span>
                  ) : (
                    <Link to={item.path} className="breadcrumb-item">
                      {item.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="outlet-box">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
