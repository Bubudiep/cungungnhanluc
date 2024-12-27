import React from "react";

const Op_hiss = ({ opDetails }) => {
  console.log(opDetails);
  return (
    <div className="animationbox">
      <div className="op-card">
        <div className="box">
          <div className="left">
            <div className="avatar"></div>
            <div className="id">{opDetails.user?.ma_nhanvien}</div>
          </div>
          <div className="right">
            <div className="user-info">
              <div className="name item">
                <div className="type">Họ và tên</div>
                <div className="value">{opDetails.user?.ho_ten ?? ""}</div>
              </div>
              <div className="name item">
                <div className="type">Giới tính</div>
                <div className="value">{opDetails.user?.gioi_tinh ?? ""}</div>
              </div>
              <div className="name item">
                <div className="type">Ngày sinh</div>
                <div className="value">{opDetails.user?.ngaysinh ?? ""}</div>
              </div>
            </div>
            <div className="address text-[#0027a8] font-[500]">
              {opDetails.user?.congty_danglam?.fullname ?? "Đang không đi làm"}
            </div>
            <div className="address">{opDetails.user?.quequan ?? ""}</div>
          </div>
        </div>
      </div>
      <div className="history">
        {opDetails.user.work &&
          opDetails.user.work.map((his, idx) => (
            <div
              key={idx}
              className={`item ${his.end_date ? "pass" : "online"}`}
            >
              <div className="flex gap-[5px] font-[500]">
                Từ
                <div className="time">
                  {his.start_date &&
                    new Date(his.start_date).toISOString().split("T")[0]}
                </div>
                đến
                <div className="time">
                  {his.end_date
                    ? new Date(his.end_date).toISOString().split("T")[0]
                    : "Hiện tại"}
                </div>
              </div>
              <div className="company">
                <div className="pos">-</div>
                <div className="name">
                  {his.customer.fullname ?? his.customer.name}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Op_hiss;
