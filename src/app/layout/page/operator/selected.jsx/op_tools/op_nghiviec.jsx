import React, { useState } from "react";
import { Modal, DatePicker, message } from "antd";
import moment from "moment";
import api from "../../../../../../components/api";

const OP_NghiViec = ({ user, seletedUser, setseletedUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  console.log(seletedUser);
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

  return (
    <>
      <div className="item out" onClick={() => setIsModalOpen(true)}>
        <div className="left">
          <div className="icon">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
          <div className="name">Nghỉ việc</div>
        </div>
      </div>
      <Modal
        title="Xác nhận nghỉ việc"
        open={isModalOpen}
        onOk={
          seletedUser.user.congty_danglam
            ? handleNghiviec
            : () => {
                setIsModalOpen(false);
              }
        }
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        {seletedUser.user.congty_danglam ? (
          <div className="flex flex-col gap-3">
            <p>
              {seletedUser.user.ho_ten} đang làm việc tại{" "}
              {seletedUser.user.congty_danglam.fullname}
            </p>
            <p>Vui lòng chọn ngày nghỉ:</p>
            <DatePicker
              onChange={(date) => setSelectedDate(date)}
              style={{ width: "100%" }}
              defaultValue={selectedDate}
            />
          </div>
        ) : (
          <p>{seletedUser.user.ho_ten} hiện tại không đi làm!</p>
        )}
      </Modal>
    </>
  );
};

export default OP_NghiViec;
