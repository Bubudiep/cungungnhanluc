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
    "/operator": "Nhân lực",
    "/approver": "Phê duyệt",
    "/attendance": "Bảng công",
    "/op_salary": "Bảng lương",
  };
  const breadcrumbItems = location.pathname
    .split("/")
    .filter((item) => item) // Bỏ các phần rỗng
    .map((item, index, arr) => {
      const to = "/" + arr.slice(0, index + 1).join("/"); // Xây dựng đường dẫn cho từng phần
      return { name: routeNames[to] || item, path: to };
    });

  const isActive = (path) => location.pathname === path;

  return (
    <div className="home-page">
      {window.electron && <Top_container />}
      <div className="body-container">
        <div className="app-container">
          <div className="list-app">
            <Link
              className={`item ${isActive("/dashboard") ? "active" : ""}`}
              to="/dashboard"
            >
              <div className="icon">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <div className="name">Tổng quan</div>
            </Link>
            <Link
              className={`item ${isActive("/operator") ? "active" : ""}`}
              to="/operator"
            >
              <div className="icon">
                <i className="fa-solid fa-users-viewfinder"></i>
              </div>
              <div className="name">Nhân lực</div>
            </Link>
            <Link
              className={`item ${isActive("/attendance") ? "active" : ""}`}
              to="/attendance"
            >
              <div className="icon">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
              <div className="name">Bảng công</div>
            </Link>
            <Link
              className={`item ${isActive("/op_salary") ? "active" : ""}`}
              to="/op_salary"
            >
              <div className="icon">
                <i className="fa-solid fa-money-bill-transfer"></i>
              </div>
              <div className="name">Lương NLĐ</div>
            </Link>
            <Link
              className={`item ${isActive("/approver") ? "active" : ""}`}
              to="/approver"
            >
              <div className="icon">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <div className="name">Phê duyệt</div>
            </Link>
            <Link
              className={`item ${isActive("/employee") ? "active" : ""}`}
              to="/employee"
            >
              <div className="icon">
                <i className="fa-solid fa-users-gear"></i>
              </div>
              <div className="name">Nhân viên</div>
            </Link>
            <Link
              className={`item ${isActive("/company") ? "active" : ""}`}
              to="/company"
            >
              <div className="icon">
                <i className="fa-regular fa-building"></i>
              </div>
              <div className="name">Công ty</div>
            </Link>
          </div>
          <div className="list-app">
            <Link
              className={`item ${isActive("/profile") ? "active" : ""}`}
              to="/profile"
            >
              <div className="avatar">
                {user.profile?.avatar ? (
                  <img src={user.profile?.avatar} alt="Avatar" />
                ) : (
                  <img src={avatar} alt="Default Avatar" />
                )}
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
