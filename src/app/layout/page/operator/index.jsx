import { Button, Pagination, Spin } from "antd";
import React, { createContext, useEffect, useState } from "react";
import OperatorDb from "./operatorDb";
import OperatorTools from "./operatorTools";
import OperatorList from "./table_list";
import { useUser } from "../../../../components/userContext";
import api from "../../../../components/api";
import { Outlet } from "react-router-dom";
export const OperatorContext = createContext();
const Operator = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(true);
  const [opList, setOpList] = useState([]);
  const [seletedUser, setseletedUser] = useState(false);
  const loadOP = (page = 1) => {
    api
      .get("/operators_list/?page=" + page + "&page_size=10", user.token)
      .then((res) => {
        setOpList(res);
        setFirstload(false);
      });
  };
  useEffect(() => {
    loadOP();
  }, []);
  return (
    <OperatorContext.Provider value={{ opList, setOpList, loadOP }}>
      <div className="employee-page pb-2">
        <div className="flex flex-col gap-2">
          {/* <OperatorDb /> */}
          <div className="operator-body flex gap-2">
            <div className="flex flex-col gap-2 right-box">
              <OperatorTools setOpList={setOpList} user={user} />
              <OperatorList
                opList={opList}
                loading={loading}
                loadOP={loadOP}
                firstload={firstload}
                setseletedUser={setseletedUser}
              />
            </div>
            <div className="flex flex-col">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </OperatorContext.Provider>
  );
};

export default Operator;
