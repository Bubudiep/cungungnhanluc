import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
const Company = () => {
  const nav = useNavigate();
  const menuItems = [
    {
      to: "employee",
      icon: "fa-solid fa-users-gear",
      name: "Nhân viên",
    },
    {
      to: "setting",
      icon: "fa-solid fa-sliders",
      name: "Thông tin chung",
    },
    {
      to: "permission",
      icon: "fa-solid fa-user-lock",
      name: "Phân quyền",
    },
    {
      to: "companis",
      icon: "fa-solid fa-window-restore",
      name: "Công ty liên kết",
    },
  ];
  const location = useLocation();
  const isActive = (path) => location.pathname.includes("company" + path);
  useEffect(() => {
    nav(`/electron/company/${menuItems[0].to}`);
  }, []);
  return (
    <div className="flex gap-2 flex-1">
      <div className="sub-menu">
        <div className="items">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`sub-items-item ${
                isActive(`/${item.to}`) ? "active" : ""
              }`}
            >
              <div className="icon">
                <i className={item.icon}></i>
              </div>
              <div className="name">{item.name}</div>
              <div className="action"></div>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Company;
