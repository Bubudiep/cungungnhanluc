import React, { useEffect, useState } from "react";
import api from "../../../../../components/api";

const Op_info = ({ opDetails, user, setOpDetails }) => {
  const [userBank, setUserBank] = useState({});
  const loadBanks = async () => {
    const banklist = await api.banks();
    if (banklist.data) {
      const matchbank = banklist.data.find(
        (item) => item.bin === opDetails.nganhang
      );
      setUserBank(matchbank);
    }
  };
  useEffect(() => {
    loadBanks();
  }, []);
  return (
    <div className="animationbox">
      <div className="image">
        <div className="item">
          <img src={opDetails?.cccd_front} alt="Ảnh CCCD mặt trước" />
        </div>
        <div className="item">
          <img src={opDetails?.cccd_back} alt="Ảnh CCCD mặt sau" />
        </div>
      </div>
      <div className="flex flex-col g-1">
        <div className="flex items-center justify-between px-2 font-medium text-xs text-[#4382ed]">
          <div className="text">Thông tin cá nhân</div>
          <div className="tools">
            <button className="edit h-7 w-7 flex items-center justify-center">
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </div>
        <div className="form-edit">
          <div className="item">
            <div className="left">
              <div className="name">Họ và tên</div>
            </div>
            <div className="right">{opDetails?.ho_ten ?? "-"}</div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Số CCCD</div>
            </div>
            <div className="right">
              <div className="text">{opDetails?.so_cccd ?? "-"}</div>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Ngày sinh</div>
            </div>
            <div className="right">
              <div className="text">{opDetails?.ngaysinh ?? "-"}</div>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Điện thoại</div>
            </div>
            <div className="right">
              <div className="text">{opDetails?.sdt ?? "-"}</div>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Quê quán</div>
            </div>
            <div className="right">
              <div className="text" title={opDetails?.quequan ?? "-"}>
                {opDetails?.quequan ?? "-"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2 items-center justify-between px-2 font-medium text-xs text-[#4382ed]">
          <div className="text">Thông tin người lao động</div>
          <div className="tools">
            <button className="edit h-7 w-7 flex items-center justify-center">
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </div>
        <div className="form-edit">
          <div className="item">
            <div className="left">
              <div className="name">Trạng thái</div>
            </div>
            <div className="right">
              {opDetails?.work.length > 0
                ? opDetails?.work[0].end_date
                  ? "Đã nghỉ việc"
                  : opDetails?.work[0].start_date
                  ? `Đang làm tại ${opDetails?.congty_danglam?.fullname}`
                  : "Chưa đi làm"
                : "Chưa đi làm"}
            </div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Mã nhân viên</div>
            </div>
            <div className="right">{opDetails?.ma_nhanvien ?? "-"}</div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Nhà chính</div>
            </div>
            <div className="right">
              <div className="text">{opDetails?.nhachinh?.fullname ?? "-"}</div>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Thâm niên</div>
            </div>
            <div className="right">
              <div className="text" title={opDetails?.thamnien ?? "-"}>
                {opDetails?.thamnien ?? "-"}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Ngân hàng</div>
            </div>
            <div className="right">
              <div className="text" title={opDetails?.so_taikhoan ?? "-"}>
                {opDetails?.so_taikhoan
                  ? `${opDetails?.so_taikhoan} - ${userBank?.short_name}`
                  : "-"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2 items-center justify-between px-2 font-medium text-xs text-[#4382ed]">
          <div className="text">Quản lý và người tuyển</div>
          <div className="tools">
            <button className="edit h-7 w-7 flex items-center justify-center">
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </div>
        <div className="form-edit">
          <div className="item">
            <div className="left">
              <div className="name">Quản lý</div>
            </div>
            <div className="right">
              {opDetails?.nguoibaocao?.full_name ?? "-"}
            </div>
          </div>
          <div className="item">
            <div className="left">
              <div className="name">Người tuyển</div>
            </div>
            <div className="right">
              {opDetails?.nguoituyen?.full_name ?? "-"}
            </div>
          </div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
};

export default Op_info;
