import { Button, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import OperatorDb from "./operator/operatorDb";
import OperatorTools from "./operator/operatorTools";
import OperatorList from "./operator/operatorList";
import { useUser } from "../../../components/userContext";
import api from "../../../components/api";

const Operator = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(true);
  const [opList, setOpList] = useState([]);
  const loadOP = (page = 1) => {
    api
      .get("/operators/?page=" + page + "&page_size=15", user.token)
      .then((res) => {
        setOpList(res);
        setFirstload(false);
      });
  };
  useEffect(() => {
    loadOP();
  }, []);
  return (
    <div className="employee-page">
      <OperatorDb />
      <div className="operator-body flex gap-1">
        <div className="flex flex-col gap-2">
          <OperatorTools setOpList={setOpList} user={user} />
          <OperatorList
            opList={opList}
            loading={loading}
            firstload={firstload}
          />
        </div>
      </div>
    </div>
  );
};

export default Operator;
