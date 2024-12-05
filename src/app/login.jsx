import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/api"; // Đường dẫn tới file api.js
import qs from "qs"; // Để chuyển đổi dữ liệu đối tượng thành chuỗi URL-encoded
import "../assets/css/login.scss";
import "../assets/css/all.scss";
import bg from "../assets/image/login-bg.png";
import app_lg from "../assets/image/app-logo.png";
import { Button, message, notification, Popconfirm } from "antd";
import { QRCode } from "react-qrcode-logo";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const author = import.meta.env.VITE_AUTHOR;
  const version = import.meta.env.VITE_VERSION;
  const key = import.meta.env.VITE_KEY;
  const passwordRef = useRef();
  const checkAuth = async () => {
    try {
      const token = api.getCookie("token");
      console.log(token);
      if (token) {
        // Kiểm tra API để xác thực token
        api.get("/user/?key=" + key, token).then((res) => {
          navigate("/?fromLogin=true");
        });
      } else {
        // Kiểm tra localStorage
        const savedUsername = localStorage.getItem("username");
        const savedPassword = localStorage.getItem("password");
        if (savedUsername && savedPassword) {
          setUsername(savedUsername);
          setPassword(savedPassword);
        }
      }
    } catch (err) {
      // Nếu có lỗi, không làm gì cả, người dùng vẫn ở trên trang login
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuth();
    try {
      api.send("unmaximize");
      api.send("resize", false);
    } catch (err) {
      console.error("Not support electron!");
    }
  }, []);

  const handleLogin = async (e) => {
    setLoading(true);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    if (username && password) {
      await api
        .post(
          "/login/",
          qs.stringify({
            key: key,
            username: username,
            password: password,
          })
        )
        .then((response) => {
          const token = response.access_token;
          const expirationTime = new Date();
          expirationTime.setTime(
            expirationTime.getTime() + 7 * 24 * 60 * 60 * 1000
          );
          document.cookie = `token=${token}; expires=${expirationTime.toUTCString()}; path=/`;
          navigate("/?fromLogin=true");
        })
        .catch((err) => {
          if (err.response.data.Error) {
            notification.error({
              message: "Lỗi",
              description: err.response.data.Error,
            });
            return;
          } else {
            notification.error({
              message: "Lỗi",
              description: "Lỗi không xác định!",
            });
            return;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      message.info("Chưa nhập đủ thông tin!");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div
        className="video-container"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="video-description">
          <div className="box-sizing">
            <div className="box-view">
              <div className="qr">
                <QRCode
                  value="https://ipays.vn"
                  size={130}
                  fgColor="#3e5c7e"
                  eyeColor="#202f41"
                  eyeRadius={10}
                  qrStyle="dots"
                  removeQrCodeBehindLogo={true}
                  logoPadding={2}
                  bgColor="transparent"
                />
                <div className="logo">
                  <img src={app_lg} />
                </div>
              </div>
              <div className="title">QR ĐĂNG NHẬP</div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container">
        <div className="login-box">
          <div className="header">Xin chào,</div>
          <div className="hi">Chào mừng bạn quay trờ lại!</div>
          <div className="form">
            <div className="items">
              <div className="name">Tài khoản</div>
              <div className="value">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="tên truy cập...."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") passwordRef.current.select();
                  }}
                />
              </div>
            </div>
            <div className="items">
              <div className="name">Mật khẩu</div>
              <div className="value">
                <input
                  type="password"
                  value={password}
                  ref={passwordRef}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  required
                  placeholder="mật khẩu...."
                />
              </div>
            </div>
          </div>
          <div className="login-btn">
            <Button id="login-btn" onClick={handleLogin} loading={loading}>
              Đăng nhập
            </Button>
          </div>
          <div className="with-zalo">
            <button>Đăng nhập bằng Zalo</button>
          </div>
          <div className="fc g4">
            <div className="flex register">Đăng ký tài khoản mới</div>
            <div className="flex forget-pass">Quên mật khẩu?</div>
            <div className="flex">
              <Popconfirm
                title="Thoát"
                description="Bạn thật sự muốn thoát?"
                onConfirm={() => {
                  api.send("exit");
                }}
              >
                <div className="exit">Thoát</div>
              </Popconfirm>
            </div>
          </div>
          <div className="app-version">
            <div className="version">{version}</div>
            <div className="logo">{author}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
