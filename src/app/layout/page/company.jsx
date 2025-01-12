import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const Company = () => {
  const menuItems = [
    {
      to: "setting",
      icon: "fa-solid fa-sliders",
      name: "Thông tin chung",
    },
    {
      to: "companis",
      icon: "fa-solid fa-window-restore",
      name: "Công ty liên kết",
    },
    {
      to: "permission",
      icon: "fa-solid fa-user-lock",
      name: "Phân quyền",
    },
  ];
  const location = useLocation();
  const isActive = (path) => location.pathname.includes("company" + path);
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
