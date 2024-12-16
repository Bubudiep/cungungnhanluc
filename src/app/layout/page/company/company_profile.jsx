import React, { useState } from "react";
import cpn_bg from "../../../../assets/image/company_bg.png";
import cpn_avatar from "../../../../assets/image/company_logo.png";

const CompanyProfile = () => {
  const [editFullname, setEditFullname] = useState(false); // Track whether editing mode is active
  const [companyName, setCompanyName] = useState("Công ty TNHH Tên công ty"); // Track the company name

  const toggleEditMode = () => {
    if (editFullname) {
      console.log("Updated company name:", companyName); // Save the name
    }
    setEditFullname(!editFullname); // Toggle editing mode
  };

  const handleInputChange = (e) => {
    setCompanyName(e.target.value); // Update the company name as user types
  };

  return (
    <div className="fadeIn">
      <div className="avatar-container">
        <div
          className="background"
          style={{ backgroundImage: `url(${cpn_bg})` }}
        ></div>
        <div className="avatar">
          <div className="logo">
            <img src={cpn_avatar} alt="Company Logo" />
          </div>
          <div className="info">
            <div className="name">Tên công ty</div>
            <div className="fullname">
              <input
                type="text"
                value={companyName}
                onChange={handleInputChange}
                readOnly={!editFullname} // Toggle read-only state
                className={`edit-input ${editFullname ? "editable" : ""}`}
              />
              <button onClick={toggleEditMode} className="edit-save-button">
                <i
                  className={`fa-solid ${editFullname ? "fa-check" : "fa-pen"}`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
