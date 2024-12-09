import React, { useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import api from "../../../components/api";
import { useUser } from "../../../components/userContext";
import Employee_card from "./user/employee_card";

const User_profile = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      api
        .get(`/my-info/?key=${user.key}`, user.token)
        .then((res) => {
          setMyData(res);
          setUser((oldUser) => ({
            ...oldUser,
            myData: res,
          }));
          console.log(res);
        })
        .catch((err) => {
          message.error(
            err?.response?.data?.detail ?? "Phát sinh lỗi khi tải dữ liệu!"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    };
    setTimeout(fetchData, 500);
  }, []); // Depend on user key and token
  return (
    <div className="profile-page">
      <div className="profile-box">
        {loading ? (
          <div className="big">
            <Spin size="large" />
          </div>
        ) : (
          <Employee_card
            user={user}
            setUser={setUser}
            myData={myData}
            setMyData={setMyData}
          />
        )}
      </div>
    </div>
  );
};

export default User_profile;
