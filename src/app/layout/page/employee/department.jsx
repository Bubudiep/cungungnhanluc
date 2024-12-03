import React from "react";

const Department = () => {
  return (
    <div className="department">
      <div className="h3">
        <div className="left">Danh sách bộ phận</div>
        <div className="right">
          <button className="no-add">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="list-department">
        <div className="items">
          <div className="name">Bộ phận 1</div>
          <div className="right">
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <div className="items">
          <div className="name">Bộ phận 1</div>
          <div className="right">
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
