import React, { useEffect, useState } from "react";
import { useUser } from "../../../../components/userContext";
import api from "../../../../components/api";
import Customer from "./list_companis/customer";
import Supplier from "./list_companis/supplier";
import Vendor from "./list_companis/vendor";

const Companis = () => {
  const { user, setUser } = useUser();
  const [customer, setCustommer] = useState(null);
  useEffect(() => {
    api
      .get("/company/", user.token)
      .then((res) => {
        setCustommer(res.results[0].custommer);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally();
  }, []);
  return (
    <div className="company-page">
      <div className="flex gap-2 items-start">
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

export default Companis;
