import React, { useEffect, useState } from "react";
import cpn_bg from "../../../../assets/image/company_bg.png";
import cpn_avatar from "../../../../assets/image/company_logo.png";
import zalo_icon from "../../../../assets/image/zalo-icon.png";
import api from "../../../../components/api";
import { Button, message } from "antd";

const CompanyProfile = ({ user, companyData, setCompanyData }) => {
  const [onSave, setOnSave] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = () => {
    setOnSave(true);
    api
      .patch(`/company/${companyData.id}/`, companyData, user.token)
      .then((response) => {
        setCompanyData(response);
        message.success("Cập nhập thành công!");
        console.log("Company data updated successfully", response);
      })
      .catch((error) => {
        message.error(
          error?.response?.data?.detail ?? "Lỗi khi cập nhập thông tin!"
        );
        console.error("Error updating company data", error);
      })
      .finally(setOnSave(false));
  };
  const handleUpdate = (key, value) => {
    api
      .patch(
        `/company/${companyData.id}/`,
        {
          [key]: value,
        },
        user.token
      )
      .then((res) => {
        message.success("Đã cập nhập thông tin mới!");
        console.log(res);
        setCompanyData(res);
      })
      .catch((er) => {
        message.error(er?.response?.detail ?? "Lỗi khi cập nhập!");
      });
  };
  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    const name = file.name; // Tên tệp
    const size = file.size; // Kích thước tệp (byte)
    const typeFile = file.type; // Loại tệp (ví dụ: image/jpeg, image/png)
    if (!file) return;
    let base64 = await api.convertToBase64(file);
    const img = new Image();
    img.src = base64;
    img.onload = async () => {
      const resizedBase64 = await api.resizeImage(
        img,
        type === "avatar" ? 200 : 500
      );
      const width = img.width; // Chiều rộng ảnh
      const height = img.height; // Chiều cao ảnh
      handleUpdate(type, {
        data: resizedBase64,
        name: name,
        size: size,
        typeFile: typeFile,
        width: width,
        height: height,
      });
    };
  };
  return (
    <div className="fadeIn">
      <div className="avatar-container">
        <div
          className="background"
          style={{ backgroundImage: `url(${companyData.wallpaper ?? cpn_bg})` }}
        >
          <div className="upload-wall">
            <label htmlFor="upload_wall">
              <i className="fa-solid fa-camera"></i>
              <div className="text">Ảnh mới</div>
            </label>
            <input
              type="file"
              id="upload_wall"
              accept="image/*"
              onChange={(e) => handleUpload(e, "wallpaper")}
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
                accept="image/*"
                onChange={(e) => handleUpload(e, "avatar")}
              />
            </div>
          </div>
          <div className="info">
            <div className="name">{companyData.name ?? "Công ty X"}</div>
            <div className="fullname">
              {!companyData.fullname || companyData.fullname != ""
                ? "Công ty TNHH X"
                : companyData.fullname}
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <textarea
          rows="2"
          name="description"
          value={companyData.description ?? ""}
          onChange={handleInputChange}
          placeholder="Nhập mô tả ngắn về doanh nghiệp của bạn...."
        />
      </div>
      <div className="profile-container">
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-building"></i>
            </div>
            <div className="name">Loại hình</div>
          </div>
          <div className="value">{companyData.companyType ?? ""}</div>
        </div>
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
              value={companyData.taxCode ?? ""}
              onChange={handleInputChange}
              placeholder="Nhập mã số thuế"
            />
          </div>
        </div>
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
              value={companyData.address ?? ""}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
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
              name="hotline"
              value={companyData.hotline ?? ""}
              onChange={handleInputChange}
              placeholder="Số hotline"
            />
          </div>
        </div>
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
              value={companyData.zalo ?? ""}
              onChange={handleInputChange}
              placeholder="Link Zalo"
            />
          </div>
        </div>
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
              value={companyData.facebook ?? ""}
              onChange={handleInputChange}
              placeholder="Link Facebook"
            />
          </div>
        </div>
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
              value={companyData.tiktok ?? ""}
              onChange={handleInputChange}
              placeholder="Link Tiktok"
            />
          </div>
        </div>
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
              value={companyData.instagram ?? ""}
              onChange={handleInputChange}
              placeholder="Link Instagram"
            />
          </div>
        </div>
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
              value={companyData.website ?? ""}
              onChange={handleInputChange}
              placeholder="Thông tin Website"
            />
          </div>
        </div>
        <div className="item pt-2">
          <div className="left">
            <Button
              onClick={handleSave}
              loading={onSave}
              icon={<i className="fa-solid fa-floppy-disk"></i>}
              type="primary"
            >
              Lưu lại
            </Button>
          </div>
          <div className="value">
            Khởi tạo: {api.timeSinceOrder(companyData.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
