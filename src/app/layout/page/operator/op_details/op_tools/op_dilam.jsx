import React, { useState, useEffect } from "react";
import { Modal, Input, Select, DatePicker, message } from "antd";
import moment from "moment";
import api from "../../../../../../components/api";

const OP_DiLam = ({ opDetails, setOpDetails, user, setOpList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workDetails, setWorkDetails] = useState({
    company: null,
    startDate: null,
    employeeCode: null,
  });
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    api.get("/company_sublist/", user.token).then((res) => {
      setCompanies(res.results[0].custommer.data);
    });
  }, []);
  const handleDiLam = () => {
    const { company, startDate, employeeCode } = workDetails;
    if (!company || !startDate || !employeeCode) {
      message.warning("Vui lòng điền đầy đủ thông tin làm việc!");
      return;
    }
    api
      .post(
        `/operators/${opDetails.id}/dilam/`,
        { employeeCode, company, startDate: startDate.format("YYYY-MM-DD") },
        user.token
      )
      .then((res) => {
        setOpList((old) => ({
          ...old,
          results: old.results.map((item) => (item.id === res.id ? res : item)),
        }));
        setOpDetails(res);
        setIsModalOpen(false);
        message.success("Đã ghi nhận đi làm thành công!");
      })
      .catch((er) => {
        message.error(er.response?.data?.detail ?? "Lỗi: không xác định!");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setWorkDetails({
      company: null,
      startDate: null,
    });
  };

  return (
    <>
      <div className="item" onClick={() => setIsModalOpen(true)}>
        <div className="left">
          <div className="icon">
            <i className="fa-solid fa-person-digging"></i>
          </div>
          <div className="name">Đi làm</div>
        </div>
      </div>
      <Modal
        title="Thông tin đi làm"
        open={isModalOpen}
        onOk={opDetails?.congty_danglam ? handleCancel : handleDiLam}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        {opDetails?.congty_danglam ? (
          <p>{opDetails?.ho_ten} đang làm việc, vui lòng nghỉ làm trước!</p>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="left">Mã nhân viên</div>
              <div className="right ml-auto">
                <Input
                  placeholder="Nhập mã nhân viên"
                  value={workDetails.employeeCode}
                  className="min-w-[200px]"
                  onChange={(e) =>
                    setWorkDetails((old) => ({
                      ...old,
                      employeeCode: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="left">Công ty làm việc</div>
              <div className="right ml-auto">
                <Select
                  placeholder="Chọn công ty"
                  value={workDetails.company}
                  onChange={(value) =>
                    setWorkDetails((old) => ({ ...old, company: value }))
                  }
                  className="min-w-[200px]"
                  options={companies.map((company) => ({
                    label: company.name,
                    value: company.id,
                  }))}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="left">Ngày bắt đầu đi làm</div>
              <div className="right ml-auto">
                <DatePicker
                  placeholder="Chọn ngày bắt đầu"
                  style={{ width: "100%" }}
                  value={workDetails.startDate}
                  className="min-w-[200px]"
                  onChange={(date) =>
                    setWorkDetails((old) => ({ ...old, startDate: date }))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OP_DiLam;
