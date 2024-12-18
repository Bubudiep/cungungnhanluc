import { Button, Empty, Modal, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import api from "../../../components/api";
import { useUser } from "../../../components/userContext";
import Customer from "./company/customer";
import Supplier from "./company/supplier";
import Vendor from "./company/vendor";
import Company_profile from "./company/company_profile";
const Company = () => {
  const { user, setUser } = useUser();
  return (
    <div className="company-page">
      <div className="flex gap-2">
        <div className="company-profile">
          <Company_profile user={user} />
        </div>
        <div className="flex flex-col w-[800px] gap-2 min-w-[600px]">
          <Customer user={user} />
          <Supplier user={user} />
          <Vendor user={user} />
        </div>
      </div>
    </div>
  );
};

export default Company;
