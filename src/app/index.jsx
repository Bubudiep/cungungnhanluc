import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../components/api";
import Homepage from "./layout/home";
import hitech from "../assets/image/hitech.png";
import load_logo from "../assets/image/app-logo.png";
const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [appLoading, setAppLoading] = useState(true);
  const [loadOut, setLoadOut] = useState(false);
  const [loadShow, setLoadShow] = useState(false);
  const [user, setUser] = useState();
  const key = import.meta.env.VITE_KEY;
  const author = import.meta.env.VITE_AUTHOR;
  const version = import.meta.env.VITE_VERSION;
  const checkUser = async (token) => {
    await api
      .get("/user/?key=" + key, token)
      .then((res) => {
        setUser({
          ...res,
          key: key,
          token: token,
        });
        const isFirstLoad = searchParams.get("fistLoad");
        const isFromLogin = searchParams.get("fromLogin");
        if (isFirstLoad || isFromLogin) {
          try {
            api.send("resize", true);
            api.send("maximized");
          } catch (e) {}
        }
        setTimeout(() => {
          setLoadOut(true);
          setTimeout(() => {
            setLoadShow(true);
            setAppLoading(false);
          }, 400);
        }, 1000); // 1000 ms = 1 giây
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      })
      .finally(() => {
        setTimeout(() => {
          setLoadOut(true);
          setTimeout(() => {
            setLoadShow(true);
            setAppLoading(false);
          }, 300);
        }, 1000); // 1000 ms = 1 giây
      });
  };
  useEffect(() => {
    setAppLoading(true);
    const token = api.getCookie("token");
    if (token) {
      console.log("Có token:", token);
      checkUser(token);
    } else {
      console.log("Không tìm thấy token!");
      navigate("/login");
    }
  }, []);
  return (
    <>
      {appLoading && (
        <div className={`app-load ${loadOut ? "fadeOut" : ""}`}>
          <div className="body">
            <div className="logo">
              <img src={load_logo} />
            </div>
            <div className="loading-spinner" />
          </div>
          <div className="bottom">
            <div className="logo">
              <div className="value">{author}</div>
            </div>
            <div className="coppy-right">
              Thiết kế bởi<div className="author">{author}</div>
            </div>
          </div>
          <div className="version">{version}</div>
        </div>
      )}
      {loadShow && <Homepage user={user} />}
    </>
  );
};

export default Home;
