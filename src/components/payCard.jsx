import React, { useEffect, useState } from "react";
import api from "./api";
import { Empty, Input, Button, message, Modal, Select } from "antd";
import { BiSolidEdit, BiSolidSave } from "react-icons/bi";
import { useUser } from "./userContext";

const OPpayCard = ({ data, qrCode, onUpdate }) => {
  const { user } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(data?.nganhang || "");
  const [bank, setBank] = useState({});
  const [stk, setStk] = useState(data?.so_taikhoan || "");
  const [chuTaiKhoan, setChuTaiKhoan] = useState(data?.chu_taikhoan || "");
  const [banksList, setBanksList] = useState([]);

  useEffect(() => {
    setStk(data.so_taikhoan);
    setChuTaiKhoan(data.chu_taikhoan);
    setSelectedBank(data.nganhang);

    api
      .get("https://api.vietqr.io/v2/banks")
      .then((res) => {
        setBanksList(res.data); // Đúng cấu trúc của API
        const foundBank = res.data.find(
          (bank) => String(bank.bin) === String(data.nganhang)
        );
        setBank(foundBank || {}); // Nếu không tìm thấy, tránh bị lỗi undefined
      })
      .catch((error) => {
        setBanksList([]);
      });
  }, [data]);

  const handleUpdate = () => {
    api
      .patch(
        `/operators/${data.id}/`,
        {
          so_taikhoan: stk,
          chu_taikhoan: chuTaiKhoan,
          nganhang: selectedBank,
        },
        user.token
      )
      .then((res) => {
        onUpdate(res);
        setIsModalVisible(false); // Đóng modal sau khi cập nhật thành công
      })
      .catch((er) => {
        console.log(er);
        message.error(er?.response?.detail ?? "Lỗi khi cập nhật!");
      });
  };

  return (
    <div className="opPaycard relative">
      <div className="avatar">
        <img src={data.avatar} alt="Avatar" />
      </div>
      <div className="info">
        <div className="stk">
          <span>{stk || "Chưa có số tài khoản"}</span>
        </div>
        <div className="stk font-[500]">
          <span>{chuTaiKhoan || "Chưa có chủ tài khoản"}</span>
        </div>
        <div className="ml-0 pl-0 pb-1">
          <span className="py-1">
            {bank?.short_name || "Chưa có ngân hàng"} - {bank?.name || ""}
          </span>
        </div>
        <div className="logo">
          {bank?.logo && <img src={bank.logo} alt="Logo ngân hàng" />}
        </div>
        <div className="stk">{data?.ghichu_taikhoan ?? "-"}</div>
      </div>
      <Button
        onClick={() => setIsModalVisible(true)}
        className="absolute right-1 bottom-1"
      >
        <BiSolidEdit />
      </Button>
      <Modal
        title="Chỉnh sửa thông tin thanh toán"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleUpdate}>
            <BiSolidSave /> Lưu
          </Button>,
        ]}
      >
        <Input
          value={stk}
          onChange={(e) => setStk(e.target.value)}
          placeholder="Nhập số tài khoản"
          className="mb-2"
        />
        <Input
          value={chuTaiKhoan}
          onChange={(e) => setChuTaiKhoan(e.target.value)}
          placeholder="Nhập tên chủ tài khoản"
          className="mb-2"
        />
        <Select
          value={selectedBank}
          onChange={setSelectedBank}
          style={{ width: "100%" }}
          className="mb-2"
          placeholder="Chọn ngân hàng"
        >
          {banksList.map((bank) => (
            <Select.Option key={bank.bin} value={bank.bin}>
              {bank.short_name} - {bank.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>

      {/* {qrCode && qrCode} */}
    </div>
  );
};

export default OPpayCard;
