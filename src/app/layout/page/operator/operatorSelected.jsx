import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../components/api";

const OperatorSelected = ({ user, seletedUser, setseletedUser }) => {
  const [isEdit_info, setIsEdit_info] = useState(false);
  const [opDetails, setOpDetails] = useState({});
  useEffect(() => {
    if (seletedUser) {
      api
        .get(`/operators_details/${seletedUser.user.id}/`, user?.token)
        .then((res) => {
          setOpDetails(res);
        });
    }
  }, [seletedUser]);
  return (
    <>
      {seletedUser ? (
        seletedUser.option == 1 ? (
          <>
            <div className="white-box operator-selected">
              <div className="image">
                <div className="item">
                  <img src="" alt="Ảnh CCCD mặt trước" />
                </div>
                <div className="item">
                  <img src="" alt="Ảnh CCCD mặt sau" />
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
                    <div className="right">
                      {seletedUser.user?.ho_ten ?? "-"}
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Giới tính</div>
                    </div>
                    <div className="right">
                      <div className="text">
                        {seletedUser.user?.gioi_tinh ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Ngày sinh</div>
                    </div>
                    <div className="right">
                      <div className="text">
                        {seletedUser.user?.ngaysinh ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Điện thoại</div>
                    </div>
                    <div className="right">
                      <div className="text">{seletedUser.user?.sdt ?? "-"}</div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Số CCCD</div>
                    </div>
                    <div className="right">
                      <div className="text">
                        {seletedUser.user?.so_cccd ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Quê quán</div>
                    </div>
                    <div className="right">
                      <div
                        className="text"
                        title={seletedUser.user?.quequan ?? "-"}
                      >
                        {seletedUser.user?.quequan ?? "-"}
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
                      {seletedUser.user?.work?.end_date
                        ? "Đã nghỉ việc"
                        : seletedUser.user?.work?.start_date
                        ? "Đang đi làm"
                        : "Chưa đi làm"}
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Mã nhân viên</div>
                    </div>
                    <div className="right">
                      {seletedUser.user?.ma_nhanvien ?? "-"}
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Công ty</div>
                    </div>
                    <div className="right">
                      <div className="text">
                        {seletedUser.user?.work?.customer?.fullname ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Ngày bắt đầu</div>
                    </div>
                    <div className="right">
                      <div className="text">
                        {seletedUser.user?.work?.start_date
                          ? new Date(seletedUser.user?.work?.start_date)
                              .toISOString()
                              .split("T")[0]
                          : "-"}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Nhà chính</div>
                    </div>
                    <div className="right">
                      <div className="text">
                        {seletedUser.user?.nhachinh?.fullname ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Thâm niên</div>
                    </div>
                    <div className="right">
                      <div
                        className="text"
                        title={seletedUser.user?.thamnien ?? "-"}
                      >
                        {seletedUser.user?.thamnien ?? "-"}
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
                      {seletedUser.user?.nguoibaocao?.full_name ?? "-"}
                    </div>
                  </div>
                  <div className="item">
                    <div className="left">
                      <div className="name">Người tuyển</div>
                    </div>
                    <div className="right">
                      {seletedUser.user?.nguoituyen?.full_name ?? "-"}
                    </div>
                  </div>
                  <div className="item"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="white-box operator-selected">
            <div className="op-card">
              <div className="box">
                <div className="left">
                  <div className="avatar"></div>
                  <div className="id">{seletedUser.user?.ma_nhanvien}</div>
                </div>
                <div className="right">
                  <div className="user-info">
                    <div className="name item">
                      <div className="type">Họ và tên</div>
                      <div className="value">
                        {seletedUser.user?.ho_ten ?? ""}
                      </div>
                    </div>
                    <div className="name item">
                      <div className="type">Giới tính</div>
                      <div className="value">
                        {seletedUser.user?.gioi_tinh ?? ""}
                      </div>
                    </div>
                    <div className="name item">
                      <div className="type">Ngày sinh</div>
                      <div className="value">
                        {seletedUser.user?.ngaysinh ?? ""}
                      </div>
                    </div>
                  </div>
                  <div className="address text-[#0027a8] font-[500]">
                    {seletedUser.user?.congty_danglam?.fullname ?? ""}
                  </div>
                  <div className="address">
                    {seletedUser.user?.quequan ?? ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="history">
              {opDetails?.work?.map((his) => (
                <div className="item">
                  <div className="flex gap-2">
                    <div className="time">
                      {his.start_date &&
                        new Date(his.start_date).toISOString().split("T")[0]}
                    </div>
                    -
                    <div className="time">
                      {his.end_date
                        ? new Date(his.end_date).toISOString().split("T")[0]
                        : "Hiện tại"}
                    </div>
                  </div>
                  <div className="company">
                    {his.customer.fullname ?? his.customer.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="flex w-[500px] items-center justify-center h-[400px]">
          <Empty
            description="Chọn một nhân lực để xem chi tiết!"
            className="flex flex-col "
          />
        </div>
      )}
    </>
  );
};

export default OperatorSelected;
