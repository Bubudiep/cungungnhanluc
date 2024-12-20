import { Empty, Pagination, Spin } from "antd";
import React, { useState } from "react";
const OperatorList = ({ loading, firstload, opList }) => {
  const [pagenow, setPagenow] = useState(1);
  const [total, setTotal] = useState(opList?.count);
  const handlePageChange = () => {};
  return (
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
                  <tr>
                    <td colSpan={9999}>
                      <Empty className="my-40" />
                    </td>
                  </tr>
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
  );
};

export default OperatorList;
