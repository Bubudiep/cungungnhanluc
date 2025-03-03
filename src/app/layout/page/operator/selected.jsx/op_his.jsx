import React from "react";
import OP_DiLam from "./op_tools/op_dilam";
import OP_NghiViec from "./op_tools/op_nghiviec";
import Op_baoung from "./op_tools/op_baoung";

const Op_hiss = ({
  opList,
  setOpList,
  opDetails,
  user,
  seletedUser,
  setseletedUser,
}) => {
  return (
    <div className="animationbox">
      <div className="op-card">
        <div className="box">
          <div className="left">
            <div className="avatar">
              <img src={opDetails?.user?.avatar} />
            </div>
          </div>
          <div className="right">
            <div className="user-info">
              <div className="name item">
                <div className="type">Họ và tên</div>
                <div className="value">{opDetails.user?.ho_ten ?? ""}</div>
              </div>
              <div className="name item">
                <div className="type">Mã nhân viên</div>
                <div className="value">{opDetails.user?.ma_nhanvien ?? ""}</div>
              </div>
              <div className="name item">
                <div className="type">Ngày sinh</div>
                <div className="value">{opDetails.user?.ngaysinh ?? ""}</div>
              </div>
              <div className="address text-[#0027a8] font-[500]">
                {opDetails.user?.congty_danglam?.fullname ?? (
                  <div className="text-red-500">Chưa đi làm</div>
                )}
              </div>
              <div className="address">
                {opDetails.user?.quequan ?? (
                  <div className="text-[#999]">Chưa có quê quán</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="op-tools">
        <div className="item">
          <div className="left">
            <div className="icon">
              <i className="fa-solid fa-sack-dollar"></i>
            </div>
            <div className="name">Công lương</div>
          </div>
        </div>
        <Op_baoung
          user={user}
          seletedUser={seletedUser}
          setseletedUser={setseletedUser}
          opList={opList}
          setOpList={setOpList}
        />
        <OP_DiLam
          user={user}
          seletedUser={seletedUser}
          setseletedUser={setseletedUser}
          opList={opList}
          setOpList={setOpList}
        />
        <OP_NghiViec
          user={user}
          seletedUser={seletedUser}
          setseletedUser={setseletedUser}
          opList={opList}
          setOpList={setOpList}
        />
      </div>
      <div className="h3 p-2 text-[#0041bb] gap-2 flex items-center">
        <i className="fa-solid fa-clock-rotate-left text-[13px] mt-[2px]"></i>
        <div className="text">Quá trình làm việc</div>
      </div>
      <div className="history ml-5 mb-2">
        {seletedUser.user &&
          seletedUser.user.work &&
          seletedUser.user.work.map((his, idx) => (
            <div
              key={idx}
              className={`item ${his.end_date ? "pass" : "online"}`}
            >
              <div className="flex gap-[5px] font-[500]">
                Từ
                <div className="time">
                  {his.start_date &&
                    new Date(his.start_date).toLocaleDateString()}
                </div>
                đến
                <div className="time">
                  {his.end_date
                    ? new Date(his.end_date).toLocaleDateString()
                    : "Hiện tại"}
                </div>
              </div>
              <div className="company">
                <div className="flex justify-between">
                  <div className="t1">
                    Số CCCD: {his.so_cccd ?? seletedUser.user.so_cccd}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="t1">Mã nhân viên: {his.ma_nhanvien}</div>
                </div>
                {his.reason && (
                  <div className="flex justify-between">
                    <div className="t1">Lý do nghỉ: {his.reason}</div>
                  </div>
                )}
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
