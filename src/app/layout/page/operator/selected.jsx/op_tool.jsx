import { message, Popconfirm, Modal, DatePicker, Button, Input } from "antd";
import React, { useState } from "react";
import moment from "moment";
import api from "../../../../../components/api";
import OP_NghiViec from "./op_tools/op_nghiviec";
import OP_DiLam from "./op_tools/op_dilam";

const Op_tools = ({ user, seletedUser, setseletedUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDILamModalOpen, setIsDILamModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [workDetails, setWorkDetails] = useState({
    timeStart: null,
    timeEnd: null,
  });
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

  const handleDiLam = () => {
    if (!workDetails.timeStart || !workDetails.timeEnd) {
      message.warning("Vui lòng điền đủ thông tin làm việc!");
      return;
    }
    api
      .post(
        `/operators/${seletedUser.user.id}/dilam/`,
        {
          timeStart: workDetails.timeStart,
          timeEnd: workDetails.timeEnd,
        },
        user.token
      )
      .then(() => {
        setIsDILamModalOpen(false);
        message.success("Đã ghi nhận đi làm thành công!");
      })
      .catch((er) => {
        message.error(er.response?.data?.detail ?? "Lỗi: không xác định!");
      });
  };

  const handleCancelDiLam = () => {
    setIsDILamModalOpen(false);
    setWorkDetails({ timeStart: null, timeEnd: null });
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
        <OP_DiLam
          user={user}
          seletedUser={seletedUser}
          setseletedUser={setseletedUser}
        />
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-seedling"></i>
            </div>
            <div className="name">Báo ứng</div>
          </div>
        </div>
        <OP_NghiViec
          user={user}
          seletedUser={seletedUser}
          setseletedUser={setseletedUser}
        />
      </div>
    </div>
  );
};

export default Op_tools;
