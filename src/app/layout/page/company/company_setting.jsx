import React, { useEffect, useState } from "react";
import Company_profile from "./company_profile";
import api from "../../../../components/api";
import { useUser } from "../../../../components/userContext";

const Garenal_setting = () => {
  const { user, setUser } = useUser();
  const [companyData, setCompanyData] = useState({});
  useEffect(() => {
    api
      .get("/company/", user.token)
      .then((res) => {
        console.log(res);
        setCompanyData(res.results[0]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally();
  }, []);
  return (
    <div className="company-page">
      <div className="flex flex-1 gap-2 items-start">
        <div className="company-profile">
          <Company_profile
            user={user}
            companyData={companyData}
            setCompanyData={setCompanyData}
          />
        </div>
      </div>
    </div>
  );
};

export default Garenal_setting;
