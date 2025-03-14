import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../../components/api";
import { useUser } from "../../../../../components/userContext";
import { Empty, Spin } from "antd";
import Op_hiss from "./op_his";
import Op_info from "./op_info";
import { OperatorContext } from "../index";

const OP_details = () => {
  const { user, setUser } = useUser();
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [opDetails, setOpDetails] = useState({});
  const [optionView, setOptionView] = useState(1);
  const { setOpList, loadOP } = useContext(OperatorContext);
  useEffect(() => {
    if (id) {
      setloading(true);
      api
        .get(`/operators_details/${id}/`, user?.token)
        .then((res) => {
          setOpDetails(res);
        })
        .finally(() => {
          setTimeout(() => {
            setloading(false);
          }, 400);
        });
    }
  }, [id]);
  return (
    <div className="flex flex-col items-start relative">
      {opDetails ? (
        <>
          {loading && (
            <div className="h-full w-full z-10 bg-[#0001] rounded-xl flex items-center justify-center absolute">
              <Spin size="large" />
            </div>
          )}
          <div className="tabs">
            <div
              className={`item ${optionView == 1 ? "active" : ""}`}
              onClick={() => {
                setOptionView(1);
              }}
            >
              Quản lý thông tin
            </div>
            <div
              className={`item ${optionView == 2 ? "active" : ""}`}
              onClick={() => {
                setOptionView(2);
              }}
            >
              Thông tin cá nhân
            </div>
          </div>
          {optionView == 2 ? (
            <div key={1} className="white-box operator-selected">
              <Op_info
                opDetails={opDetails}
                user={user}
                setOpList={setOpList}
                setOpDetails={setOpDetails}
              />
            </div>
          ) : optionView == 1 ? (
            <div key={2} className="white-box operator-selected">
              <Op_hiss
                opDetails={opDetails}
                setOpDetails={setOpDetails}
                setOpList={setOpList}
                user={user}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div key={4} className="white-box">
          <div className="animationbox flex flex-1 mt-10 mb-10">
            <div className="flex w-[500px] items-center justify-center">
              <Empty
                description="Chọn một nhân lực để xem chi tiết!"
                className="flex flex-col "
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OP_details;
