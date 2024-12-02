import React from "react";
import api from "../../components/api";
import logo from "../../assets/image/app-logo.png";

const Top_container = () => {
  return (
    <div className="top-container">
      <div className="app-nav">
        <div className="logo">
          <div className="box">
            <img src={logo} />
          </div>
        </div>
        <div className="name">Hoàng Long DJC</div>
      </div>
      <div className="right-nav">
        <div className="user-nav"></div>
        <div className="tools-nav">
          <div className="list">
            <div className="item">
              <div className="icon">
                <i className="fa-solid fa-wifi"></i>
              </div>
              <div className="name">Kết nối</div>
            </div>
          </div>
        </div>
        <div className="tools-nav">
          <div className="list">
            <div
              className="item"
              onClick={() => {
                api.send("reload");
              }}
            >
              <div className="icon">
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              <div className="name">Reload</div>
            </div>
          </div>
        </div>
        <div className="app-actions">
          <div
            className="item"
            onClick={() => {
              api.send("minimize");
            }}
          >
            <i className="fa-solid fa-minus"></i>
          </div>
          <div
            className="item"
            onClick={() => {
              api.send("maximize");
            }}
          >
            <i className="fa-solid fa-expand"></i>
          </div>
          <div
            className="item close"
            onClick={() => {
              api.send("exit");
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top_container;
