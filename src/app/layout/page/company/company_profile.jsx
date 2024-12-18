import React, { useState } from "react";
import cpn_bg from "../../../../assets/image/company_bg.png";
import cpn_avatar from "../../../../assets/image/company_logo.png";
import zalo_icon from "../../../../assets/image/zalo-icon.png";
import api from "../../../../components/api";

const CompanyProfile = ({ user }) => {
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
  const handleUpload = (e, type) => {
    console.log(type);
  };
  return (
    <div className="fadeIn">
      <div className="avatar-container">
        <div
          className="background"
          style={{ backgroundImage: `url(${cpn_bg})` }}
        >
          <div className="upload-wall">
            <label htmlFor="upload_wall">
              <i className="fa-solid fa-camera"></i>
              <div className="text">Ảnh mới</div>
            </label>
            <input
              type="file"
              id="upload_wall"
              onChange={(e) => handleUpload(e, "background")}
            />
          </div>
        </div>
        <div className="avatar">
          <div className="logo">
            <img src={cpn_avatar} alt="Company Logo" />
            <div className="upload">
              <label htmlFor="upload_avatar">
                <i className="fa-solid fa-camera"></i>
                <div className="text">Ảnh mới</div>
              </label>
              <input
                type="file"
                id="upload_avatar"
                onChange={(e) => handleUpload(e, "avatar")}
              />
            </div>
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
                placeholder="Tên đầy đủ của doanh nghiệp..."
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
      <div className="description">
        <textarea
          rows="3"
          placeholder="Nhập mô tả ngắn về doanh nghiệp của bạn...."
        ></textarea>
      </div>
      <div className="profile-container">
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-building"></i>
            </div>
            <div className="name">Loại hình</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-file-code"></i>
            </div>
            <div className="name">Mã số thuế</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="name">Tình trạng</div>
          </div>
          <div className="value">
            {user?.company?.isValidate ? (
              <div className="on">Đã xác minh</div>
            ) : (
              <div className="off">Chờ xác minh</div>
            )}
          </div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="name">Địa chỉ</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-square-phone"></i>
            </div>
            <div className="name">Liên hệ</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <img src={zalo_icon} />
            </div>
            <div className="name">Zalo</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="name">Facebook</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-brands fa-tiktok"></i>
            </div>
            <div className="name">Tiktok</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-brands fa-instagram"></i>
            </div>
            <div className="name">Instagram</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-globe"></i>
            </div>
            <div className="name">Website</div>
          </div>
          <div className="value">{user?.company?.address ?? "-"}</div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="value">
            Ngày khởi tạo: {api.timeSinceOrder(user.company.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
