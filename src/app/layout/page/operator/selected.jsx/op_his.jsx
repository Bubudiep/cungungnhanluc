import React from "react";
import OP_DiLam from "./op_tools/op_dilam";
import OP_NghiViec from "./op_tools/op_nghiviec";

const Op_hiss = ({ opDetails, user, seletedUser, setseletedUser }) => {
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
      <div className="h3 p-2 text-[#0041bb] gap-2 flex items-center">
        <i className="fa-solid fa-clock-rotate-left text-[13px] mt-[2px]"></i>
        <div className="text">Quá trình làm việc</div>
      </div>
      <div className="history ml-5">
        {opDetails.user &&
          opDetails.user.work &&
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
