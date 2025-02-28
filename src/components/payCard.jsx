import React, { useEffect, useState } from "react";
import api from "./api";
import { Empty } from "antd";

const OPpayCard = ({ data }) => {
  console.log(data);
  const [bank, setBank] = useState({});
  const nganhang = async () => {
    if (data.nganhang) {
      const nht = await api.banks();
      setBank(nht.data.find((item) => item.bin === data.nganhang));
    }
  };
  useEffect(() => {
    nganhang();
  }, [data]);
  return (
    <div className="opPaycard">
      {data?.so_taikhoan ? (
        <>
          <div className="avatar">
            <img src={data.avatar} />
          </div>
          <div className="info">
            <div className="name">{data?.ho_ten ?? "Họ và tên"}</div>
            <div className="stk">
              Số tài khoản: {data?.so_taikhoan ?? "Chưa có số tài khoản"}
            </div>
            <div className="stk">
              Chủ tài khoản: {data?.chu_taikhoan ?? "Chưa có số tài khoản"}
            </div>
            <div className="logo">
              {data?.nganhang
                ? bank?.logo && <img src={bank?.logo} />
                : "Chưa có ngân hàng"}
            </div>
            <div className="note">Ghi chú: {data?.ghichu_taikhoan ?? "-"}</div>
            <div className="nganhang">
              {data?.nganhang ? bank?.short_name : "Chưa có ngân hàng"}
              {" - "}
              {data?.nganhang ? bank?.name : "Chưa có ngân hàng"}
            </div>
          </div>
        </>
      ) : (
        <Empty description="Chưa có ngân hàng" className="py-3"></Empty>
      )}
    </div>
  );
};

export default OPpayCard;
