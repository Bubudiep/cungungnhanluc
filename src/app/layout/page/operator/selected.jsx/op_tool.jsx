import { message, Popconfirm, Modal, DatePicker, Button } from "antd";
import React, { useState } from "react";
import moment from "moment";
import api from "../../../../../components/api";

const Op_tools = ({ user, seletedUser, setseletedUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleNghiviec = () => {
    if (!selectedDate) {
      message.warning("Vui lòng chọn ngày nghỉ!");
      return;
    }
    api
      .post(
        `/operators/${seletedUser.user.id}/nghiviec/`,
        { ngayNghi: selectedDate.format("YYYY-MM-DD") },
        user.token
      )
      .then((res) => {
        setseletedUser((old) => ({
          ...old,
          user: res,
        }));
        setIsModalOpen(false);
        message.success("Đã ghi nhận nghỉ việc thành công!");
      })
      .catch((er) => {
        message.error(er.response?.data?.detail ?? "Lỗi: không xác định!");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="animationbox">
      <div className="op-tools">
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-handshake-simple"></i>
            </div>
            <div className="name">Lịch sử ứng</div>
            <div className="value">1.000.000 VNĐ</div>
          </div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-sack-dollar"></i>
            </div>
            <div className="name">Lịch sử trả lương</div>
            <div className="value">0 VNĐ</div>
          </div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-file-export"></i>
            </div>
            <div className="name">Bảng công</div>
            <div className="value">0 NGÀY</div>
          </div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-link"></i>
            </div>
            <div className="name">Nối hợp đồng</div>
            <div className="value">0 NGÀY</div>
          </div>
        </div>
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-seedling"></i>
            </div>
            <div className="name">Báo ứng</div>
          </div>
        </div>
        <div className="item out" onClick={() => setIsModalOpen(true)}>
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
            <div className="name">Nghỉ việc</div>
          </div>
        </div>
      </div>

      <Modal
        title="Xác nhận nghỉ việc"
        open={isModalOpen}
        onOk={handleNghiviec}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="flex flex-col gap-3">
          <p>Vui lòng chọn ngày nghỉ:</p>
          <DatePicker
            onChange={(date) => setSelectedDate(date)}
            style={{ width: "100%" }}
            defaultValue={selectedDate}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Op_tools;
