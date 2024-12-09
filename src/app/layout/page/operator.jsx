import { Button, Pagination, Spin } from "antd";
import React, { useState } from "react";

const Operator = () => {
  const [firstload, setFirstload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pagenow, setPagenow] = useState(1);
  const [total, setTotal] = useState(1);
  const handlePageChange = () => {};
  return (
    <div className="employee-page">
      <div className="db-card">
        <div className="items">
          <div className="name">Dự kiến</div>
          <div className="value">00</div>
          <div className="content">Người dự kiến mai đi làm</div>
        </div>
        <div className="items">
          <div className="name">Hôm nay</div>
          <div className="value">00</div>
          <div className="content">Người mới thêm hôm nay</div>
        </div>
        <div className="items">
          <div className="name">Tháng này</div>
          <div className="value">00</div>
          <div className="content">Số người trong tháng này</div>
        </div>
        <div className="items">
          <div className="name">Đang đi làm</div>
          <div className="value">00</div>
          <div className="content">Danh sách đang đi làm</div>
        </div>
        <div className="items">
          <div className="name">Xin nghỉ</div>
          <div className="value">00</div>
          <div className="content">Những người xin nghỉ</div>
        </div>
        <div className="items">
          <div className="name">Không đi làm</div>
          <div className="value">00</div>
          <div className="content">Những người không đi làm</div>
        </div>
        <div className="items">
          <div className="name">Đã nghỉ việc</div>
          <div className="value">00</div>
          <div className="content">Những người đã nghỉ việc</div>
        </div>
        <div className="items">
          <div className="name">Đi làm lại</div>
          <div className="value">00</div>
          <div className="content">Những người nghỉ đi làm lại</div>
        </div>
      </div>
      <div className="tool-list">
        <div className="left">
          <Button
            onClick={() => {}}
            icon={<i className="fa-solid fa-plus"></i>}
          >
            Thêm người
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-start gap-2">
        <div className="right-box">
          <div className="employee-list">
            <div className="employeer-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      {loading && (
                        <>
                          <Spin size="small" />
                        </>
                      )}
                    </th>
                    <th>Mã NV</th>
                    <th>Họ và tên</th>
                    <th>Tên gốc</th>
                    <th>SĐT</th>
                    <th>Nhà chính</th>
                    <th>Công ty</th>
                    <th>Ngày vào làm</th>
                    <th>Ghi chú</th>
                    <th>Số tài khoản</th>
                    <th>Người tuyển</th>
                    <th>Quản lý</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {firstload ? (
                    <tr>
                      <td colSpan={9999} className="none">
                        <Spin
                          size="large"
                          style={{
                            height: 350,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="panel-cl">
            <Pagination
              disabled={loading}
              defaultCurrent={pagenow}
              total={total}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operator;
