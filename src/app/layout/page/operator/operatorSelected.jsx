import { Empty, Popconfirm, Spin } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../components/api";
import Op_hiss from "./selected.jsx/op_his";
import Op_info from "./selected.jsx/op_info";

const OperatorSelected = ({
  user,
  seletedUser,
  setseletedUser,
  setOpList,
  opList,
}) => {
  const [loading, setloading] = useState(false);
  const [isEdit_info, setIsEdit_info] = useState(false);
  const [opDetails, setOpDetails] = useState({});
  useEffect(() => {
    if (seletedUser) {
      setloading(true);
      api
        .get(`/operators_details/${seletedUser.user.id}/`, user?.token)
        .then((res) => {
          setOpDetails((old) => ({
            ...old,
            user: res,
          }));
          setseletedUser((old) => ({
            ...old,
            user: res,
          }));
          const newArray = opList.results.map((item) =>
            item.id === res.id ? { ...item, ...res } : item
          );
          setOpList((old) => ({ ...old, results: newArray }));
        })
        .finally(() => {
          setTimeout(() => {
            setloading(false);
          }, 400);
        });
    }
  }, [seletedUser.user?.id]);
  return (
    <div className="flex flex-col items-start relative">
      {seletedUser ? (
        <>
          {loading && (
            <div className="h-full w-full z-10 bg-[#0001] rounded-xl flex items-center justify-center absolute">
              <Spin size="large" />
            </div>
          )}
          <div className="tabs">
            <div
              className={`item ${seletedUser.option == 1 ? "active" : ""}`}
              onClick={() => {
                setseletedUser({ ...seletedUser, option: 1 });
              }}
            >
              Thông tin
            </div>
            <div
              className={`item ${seletedUser.option == 2 ? "active" : ""}`}
              onClick={() => {
                setseletedUser({ ...seletedUser, option: 2 });
              }}
            >
              Quá trình làm việc
            </div>
          </div>
          {seletedUser.option == 1 ? (
            <div key={1} className="white-box operator-selected">
              <Op_info seletedUser={seletedUser} />
            </div>
          ) : seletedUser.option == 2 ? (
            <div key={2} className="white-box operator-selected">
              <Op_hiss
                user={user}
                opList={opList}
                setOpList={setOpList}
                opDetails={opDetails}
                seletedUser={seletedUser}
                setseletedUser={setseletedUser}
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

export default OperatorSelected;
