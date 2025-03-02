import React, { useState } from "react";
import api from "../../../../../../components/api";
import { Modal } from "antd";

const Op_baoung = ({
  user,
  seletedUser,
  setseletedUser,
  opList,
  setOpList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thongtinBaoung, setThongtinBaoung] = useState({
    company: null,
    startDate: null,
    employeeCode: null,
  });
  const handleCancel = () => {
    setIsModalOpen(false);
    setThongtinBaoung({
      company: null,
      startDate: null,
    });
  };
  const handleBaoung = () => {
    const { company, startDate, employeeCode } = workDetails;
    if (!company || !startDate || !employeeCode) {
      message.warning("Vui lòng điền đầy đủ thông tin làm việc!");
      return;
    }
    api
      .post(
        `/operators/${seletedUser.user.id}/baoung/`,
        { employeeCode, company, startDate: startDate.format("YYYY-MM-DD") },
        user.token
      )
      .then((res) => {
        setseletedUser((old) => ({
          ...old,
          user: res,
        }));
        const newArray = opList.results.map((item) =>
          item.id === res.id ? { ...item, ...res } : item
        );
        setOpList((old) => ({ ...old, results: newArray }));
        setIsModalOpen(false);
        message.success("Đã ghi nhận đi làm thành công!");
      })
      .catch((er) => {
        message.error(er.response?.data?.detail ?? "Lỗi: không xác định!");
      });
  };
  return (
    <>
      <div className="item" onClick={() => setIsModalOpen(true)}>
        <div className="left">
          <div className="icon">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="name">Báo ứng</div>
        </div>
      </div>
      <Modal
        title="Thông tin đi làm"
        open={isModalOpen}
        onOk={seletedUser?.user?.congty_danglam ? handleCancel : handleBaoung}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      ></Modal>
    </>
  );
};

export default Op_baoung;
