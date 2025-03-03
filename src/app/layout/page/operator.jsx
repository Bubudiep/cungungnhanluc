import { Button, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import OperatorDb from "./operator/operatorDb";
import OperatorTools from "./operator/operatorTools";
import OperatorList from "./operator/operatorList";
import { useUser } from "../../../components/userContext";
import api from "../../../components/api";
import OperatorSelected from "./operator/operatorSelected";

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
    <div className="employee-page pb-2">
      <div className="flex flex-col gap-2">
        <OperatorDb />
        <div className="operator-body flex gap-2">
          <div className="flex flex-col gap-2 right-box flex-1">
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
            <OperatorSelected
              user={user}
              opList={opList}
              setOpList={setOpList}
              seletedUser={seletedUser}
              setseletedUser={setseletedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operator;
