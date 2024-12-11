import { Button, Pagination, Spin } from "antd";
import React, { useState } from "react";
import OperatorDb from "./operator/operatorDb";
import OperatorTools from "./operator/operatorTools";
import OperatorList from "./operator/operatorList";

const Operator = () => {
  return (
    <div className="employee-page">
      <OperatorDb />
      <div className="operator-body flex gap-1">
        <div className="flex flex-col gap-2">
          <OperatorTools />
          <OperatorList />
        </div>
      </div>
    </div>
  );
};

export default Operator;
