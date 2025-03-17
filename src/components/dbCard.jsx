import React from "react";

const DashboardCard = ({ data }) => {
  return (
    <div className="db-card">
      {data.map((item, index) => (
        <div className="items" key={index}>
          <div className="name">{item.name}</div>
          <div className="value flex flex-1 items-center justify-center">
            {item.value}
          </div>
          <div className="content !mt-0">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
