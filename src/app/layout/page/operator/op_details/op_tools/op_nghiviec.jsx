import React, { useState } from "react";
import { Modal, DatePicker, Input, message } from "antd";
import moment from "moment";
import api from "../../../../../../components/api";
import dayjs from "dayjs";

const OP_NghiViec = ({ opDetails, setOpDetails, user, setOpList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [reason, setReason] = useState(""); // State lưu lý do nghỉ việc
  const handleNghiviec = () => {
    if (!selectedDate) {
      message.warning("Vui lòng chọn ngày nghỉ!");
      return;
    }
    if (!reason.trim()) {
      message.warning("Vui lòng nhập lý do nghỉ việc!");
      return;
    }

    api
      .post(
        `/operators/${opDetails?.id}/nghiviec/`,
        {
          ngayNghi: selectedDate.format("YYYY-MM-DD"),
          lyDo: reason, // Gửi thêm lý do nghỉ việc
        },
        user.token
      )
      .then((res) => {
        setOpDetails(res);
        setOpList((old) => ({
          ...old,
          results: old.results.map((item) => (item.id === res.id ? res : item)),
        }));
        setIsModalOpen(false);
        setReason(""); // Reset input lý do nghỉ
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
          <div className="name">Báo nghỉ</div>
        </div>
      </div>
      <Modal
        title="Người lao động nghỉ việc"
        open={isModalOpen}
        onOk={
          opDetails?.congty_danglam
            ? handleNghiviec
            : () => setIsModalOpen(false)
        }
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        {opDetails?.congty_danglam ? (
          <div className="flex flex-col gap-3">
            <p>
              {opDetails?.ho_ten} đang làm việc tại{" "}
              {opDetails?.congty_danglam.fullname}
            </p>
            <p>Vui lòng chọn ngày nghỉ:</p>
            <DatePicker
              onChange={(date) => setSelectedDate(date)}
              style={{ width: "100%" }}
              defaultValue={dayjs(selectedDate, "YYYY-MM-DD")}
            />
            <p>Nhập lý do nghỉ việc:</p>
            <Input.TextArea
              rows={3}
              placeholder="Nhập lý do nghỉ việc..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        ) : (
          <p>{opDetails?.ho_ten} hiện tại không đi làm!</p>
        )}
      </Modal>
    </>
  );
};

export default OP_NghiViec;
