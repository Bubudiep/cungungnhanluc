import React, { useEffect, useState } from "react";
import api from "./api";
import { Empty, Input, Button, message } from "antd";
import { BiSolidEdit, BiSolidSave } from "react-icons/bi";
import { useUser } from "./userContext";

const OPpayCard = ({ data, qrCode, onUpdate }) => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [bank, setBank] = useState({});
  const [stk, setStk] = useState(data?.so_taikhoan || "");
  const [chuTaiKhoan, setChuTaiKhoan] = useState(data?.chu_taikhoan || "");
  const [selectedBank, setSelectedBank] = useState(data?.nganhang || "");
  const [banksList, setBanksList] = useState([]);
  useEffect(() => {
    const fetchBanks = async () => {
      const nht = await api.banks();
      setBanksList(nht.data);
    };
    fetchBanks();
    setStk(data?.so_taikhoan);
    setChuTaiKhoan(data?.chu_taikhoan);
    setSelectedBank(data?.nganhang);
  }, [data]);
  useEffect(() => {
    if (selectedBank) {
      const bankInfo = banksList.find((item) => item.bin === selectedBank);
      setBank(bankInfo || {});
    }
  }, [selectedBank, banksList]);
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
      })
      .catch((er) => {
        message.error(er?.response?.detail ?? "Lỗi khi cập nhập!");
      });
    setIsEditing(false);
  };
  return (
    <div className="opPaycard relative">
      <div className="avatar">
        <img src={data.avatar} alt="Avatar" />
      </div>
      <div className="info">
        <div className="name">{data?.ho_ten ?? "Họ và tên"}</div>
        <div className="stk">
          {isEditing ? (
            <Input
              value={stk}
              onChange={(e) => setStk(e.target.value)}
              placeholder="Nhập số tài khoản"
            />
          ) : (
            <span>{stk || "Chưa có số tài khoản"}</span>
          )}
        </div>
        <div className="stk">
          {isEditing ? (
            <Input
              value={chuTaiKhoan}
              onChange={(e) => setChuTaiKhoan(e.target.value)}
              placeholder="Nhập tên chủ tài khoản"
            />
          ) : (
            <span>{chuTaiKhoan || "Chưa có chủ tài khoản"}</span>
          )}
        </div>
        <div className="nganhang">
          {isEditing ? (
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Chọn ngân hàng</option>
              {banksList.map((bank) => (
                <option key={bank.bin} value={bank.bin}>
                  {bank.short_name} - {bank.name}
                </option>
              ))}
            </select>
          ) : (
            <span className="p-1">
              {bank?.short_name || "Chưa có ngân hàng"} - {bank?.name || ""}
            </span>
          )}
        </div>
        <div className="logo">
          {selectedBank && bank?.logo && (
            <img src={bank.logo} alt="Logo ngân hàng" />
          )}
        </div>
        <div className="note">Ghi chú: {data?.ghichu_taikhoan ?? "-"}</div>
      </div>
      {isEditing ? (
        <Button
          type="primary"
          onClick={handleUpdate}
          className="absolute left-1 bottom-1"
        >
          <BiSolidSave />
        </Button>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          className="absolute left-1 bottom-1"
        >
          <BiSolidEdit />
        </Button>
      )}
      {qrCode && qrCode}
    </div>
  );
};

export default OPpayCard;
