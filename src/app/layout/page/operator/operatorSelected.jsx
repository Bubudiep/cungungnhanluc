import { Empty, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../components/api";
import Op_tools from "./selected.jsx/op_tool";
import Op_hiss from "./selected.jsx/op_his";

const OperatorSelected = ({
  user,
  seletedUser,
  setseletedUser,
  setOpList,
  opList,
}) => {
  const [isEdit_info, setIsEdit_info] = useState(false);
  const [opDetails, setOpDetails] = useState({});
  useEffect(() => {
    if (seletedUser) {
      api
        .get(`/operators_details/${seletedUser.user.id}/`, user?.token)
        .then((res) => {
          setOpDetails((old) => ({
            ...old,
            user: res,
          }));
          const newArray = opList.results.map((item) =>
            item.id === res.id ? { ...item, ...res } : item
          );
          console.log(newArray);
          setOpList((old) => ({ ...old, results: newArray }));
        });
    }
  }, [seletedUser.user]);
  return (
    <div className="flex flex-col items-start">
      {seletedUser ? (
        <>
          <div className="tabs">
            <div
              className={`item ${seletedUser.option == 1 ? "active" : ""}`}
              onClick={() => {
                setseletedUser({ ...seletedUser, option: 1 });
              }}
            >
              Thông tin
            </div>
            <div
              className={`item ${seletedUser.option == 2 ? "active" : ""}`}
              onClick={() => {
                setseletedUser({ ...seletedUser, option: 2 });
              }}
            >
              Quá trình làm việc
            </div>
          </div>
          {seletedUser.option == 1 ? (
            <div key={1} className="white-box operator-selected">
              <div className="animationbox">
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
                        <div className="text">
                          {seletedUser.user?.sdt ?? "-"}
                        </div>
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
            </div>
          ) : seletedUser.option == 2 ? (
            <>
              <div key={2} className="white-box operator-selected">
                <Op_hiss
                  user={user}
                  opDetails={opDetails}
                  seletedUser={seletedUser}
                  setseletedUser={setseletedUser}
                />
              </div>
            </>
          ) : (
            <>
              <div key={3} className="white-box operator-selected">
                <Op_tools
                  user={user}
                  seletedUser={seletedUser}
                  setseletedUser={setseletedUser}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <div key={4} className="white-box">
          <div className="animationbox flex flex-1 mt-10 mb-10">
            <div className="flex w-[500px] items-center justify-center">
              <Empty
                description="Chọn một nhân lực để xem chi tiết!"
                className="flex flex-col "
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatorSelected;
