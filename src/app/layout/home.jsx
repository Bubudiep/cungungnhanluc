import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import avatar from "../../assets/image/avatar.png";
import { useUser } from "../../components/userContext";
import Top_container from "./top-container";

const routes = [
  { path: "/electron/dashboard", name: "Tổng quan", icon: "fa-chart-simple" },
  { path: "/electron/operator", name: "Nhân lực", icon: "fa-users-viewfinder" },
  // { path: "/electron/attendance", name: "Bảng công", icon: "fa-calendar-days" },
  // {
  //   path: "/electron/op_salary",
  //   name: "Lương NLĐ",
  //   icon: "fa-money-bill-transfer",
  // },
  {
    path: "/electron/approver",
    name: "Phê duyệt",
    icon: "fa-file-invoice-dollar",
  },
  // { path: "/electron/employee", name: "Nhân viên", icon: "fa-users-gear" },
  { path: "/electron/company", name: "Công ty", icon: "fa-building" },
];

const routeNames = {
  "/electron": (
    <div className="icon">
      <i className="fa-solid fa-house"></i>
    </div>
  ),
  "/electron/dashboard": "Tổng quan",
  "/electron/employee": "Nhân viên",
  "/electron/company": "Công ty",
  "/electron/company/setting": "Cài đặt chung",
  "/electron/company/permission": "Phân quyền",
  "/electron/company/companis": "Công ty liên kết",
  "/electron/profile": "Cá nhân",
  "/electron/operator": "Nhân lực",
  "/electron/approver": "Phê duyệt",
  "/electron/attendance": "Bảng công",
  "/electron/op_salary": "Bảng lương",
};

const Homepage = () => {
  const { user } = useUser();
  const location = useLocation();

  // Tạo danh sách breadcrumb tự động từ URL
  const breadcrumbItems = location.pathname
    .split("/")
    .filter((item) => item) // Bỏ các phần rỗng
    .map((item, index, arr) => {
      const to = "/" + arr.slice(0, index + 1).join("/");
      return { name: routeNames[to] || item, path: to };
    });

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="home-page">
      {window.electron && <Top_container />}
      <div className="body-container">
        <div className="app-container">
          <div className="list-app">
            {routes.map((route, index) => (
              <Link
                key={index}
                className={`item ${isActive(route.path) ? "active" : ""}`}
                to={route.path}
              >
                <div className="icon">
                  <i className={`fa-solid ${route.icon}`}></i>
                </div>
                <div className="name">{route.name}</div>
              </Link>
            ))}
          </div>

          {/* Avatar */}
          <div className="list-app">
            <Link
              className={`item ${
                isActive("/electron/profile") ? "active" : ""
              }`}
              to="/electron/profile"
            >
              <div className="avatar">
                <img src={user.profile?.avatar || avatar} alt="Avatar" />
              </div>
            </Link>
          </div>
        </div>

        <div className="main-container">
          <div className="route-container">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <i className="fa-solid fa-angle-right"></i>}
                <Link to={item.path} className="breadcrumb-item">
                  {item.name}
                </Link>
              </React.Fragment>
            ))}
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
