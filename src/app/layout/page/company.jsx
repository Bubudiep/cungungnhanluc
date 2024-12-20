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
  const [customer, setCustommer] = useState(null);
  const [companyData, setCompanyData] = useState({});
  useEffect(() => {
    api
      .get("/company/", user.token)
      .then((res) => {
        setCompanyData(res.results[0]);
        setCustommer(res.results[0].custommer);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally();
  }, []);
  return (
    <div className="company-page">
      <div className="flex gap-2">
        <div className="company-profile">
          <Company_profile
            user={user}
            companyData={companyData}
            setCompanyData={setCompanyData}
          />
        </div>
        <div className="flex flex-col w-[800px] gap-2 min-w-[600px]">
          <Customer
            user={user}
            companies={customer}
            setCompanies={setCustommer}
          />
          <Supplier user={user} />
          <Vendor user={user} />
        </div>
      </div>
    </div>
  );
};

export default Company;
