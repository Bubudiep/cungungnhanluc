import React, { useEffect, useState } from "react";
import cpn_bg from "../../../../assets/image/company_bg.png";
import cpn_avatar from "../../../../assets/image/company_logo.png";
import zalo_icon from "../../../../assets/image/zalo-icon.png";
import api from "../../../../components/api";

const CompanyProfile = ({ user, companyData, setCompanyData }) => {
  // State để quản lý dữ liệu của user.company
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = () => {
    console.log("Saving company data:", companyData);
    api
      .updateCompanyData(companyData)
      .then((response) => {
        console.log("Company data updated successfully", response);
      })
      .catch((error) => {
        console.error("Error updating company data", error);
      });
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
            <img src={companyData.avatar ?? cpn_avatar} alt="Company Logo" />
            <div className="upload">
              <label htmlFor="upload_avatar">
                <i className="fa-solid fa-camera"></i>
                <div className="text">Ảnh mới</div>
              </label>
              <input
                type="file"
                id="upload_avatar"
                name="avatar"
                onChange={(e) => handleUpload(e, "avatar")}
              />
            </div>
          </div>
          <div className="info">
            <div className="name">{companyData.name ?? "Công ty X"}</div>
            <div className="fullname">
              {companyData.fullname ?? "Công ty TNHH X"}
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <textarea
          rows="3"
          value={companyData.shortDescription ?? ""}
          placeholder="Nhập mô tả ngắn về doanh nghiệp của bạn...."
        />
      </div>
      <div className="profile-container">
        {/* Input Loại hình */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-building"></i>
            </div>
            <div className="name">Loại hình</div>
          </div>
          <div className="value">{companyData.companyType ?? "-"}</div>
        </div>
        {/* Input Mã số thuế */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-file-code"></i>
            </div>
            <div className="name">MST</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="taxCode"
              value={companyData.taxCode}
              onChange={handleInputChange}
              placeholder="Nhập mã số thuế"
            />
          </div>
        </div>
        {/* Input Địa chỉ */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="name">Địa chỉ</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="address"
              value={companyData.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
        {/* Input Liên hệ */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-square-phone"></i>
            </div>
            <div className="name">Liên hệ</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="contact"
              value={companyData.contact}
              onChange={handleInputChange}
              placeholder="Số hotline"
            />
          </div>
        </div>
        {/* Input Zalo */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <img src={zalo_icon} alt="Zalo Icon" />
            </div>
            <div className="name">Zalo</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="zalo"
              value={companyData.zalo}
              onChange={handleInputChange}
              placeholder="Link Zalo"
            />
          </div>
        </div>
        {/* Input Facebook */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="name">Facebook</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="facebook"
              value={companyData.facebook}
              onChange={handleInputChange}
              placeholder="Link Facebook"
            />
          </div>
        </div>
        {/* Input Tiktok */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-brands fa-tiktok"></i>
            </div>
            <div className="name">Tiktok</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="tiktok"
              value={companyData.tiktok}
              onChange={handleInputChange}
              placeholder="Link Tiktok"
            />
          </div>
        </div>
        {/* Input Instagram */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-brands fa-instagram"></i>
            </div>
            <div className="name">Instagram</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="instagram"
              value={companyData.instagram}
              onChange={handleInputChange}
              placeholder="Link Instagram"
            />
          </div>
        </div>
        {/* Input Website */}
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-globe"></i>
            </div>
            <div className="name">Website</div>
          </div>
          <div className="value">
            <input
              type="text"
              name="website"
              value={companyData.website}
              onChange={handleInputChange}
              placeholder="Thông tin Website"
            />
          </div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="value">Cập nhập lần cuối:</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
