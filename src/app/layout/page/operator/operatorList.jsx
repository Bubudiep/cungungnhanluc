import { Button, Empty, Pagination, Spin } from "antd";
import React, { useState } from "react";
const OperatorList = ({
  loading,
  firstload,
  opList,
  loadOP,
  setseletedUser,
}) => {
  const [pagenow, setPagenow] = useState(1);
  const handlePageChange = (e) => {
    setPagenow(e);
    loadOP(e);
  };
  return (
    <div className="flex flex-1 flex-col gap-2">
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
                <th>Họ và tên</th>
                <th>Tên gốc</th>
                <th>SĐT</th>
                <th>Nhà chính</th>
                <th>Công ty</th>
                <th>Ngày vào làm</th>
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
                <>
                  {opList.results.length > 0 ? (
                    opList.results.map((op, idx) => (
                      <tr key={idx}>
                        <td>{(pagenow - 1) * 10 + (idx + 1)}</td>
                        <td>
                          <div className="flex flex-col">
                            <a
                              onClick={(e) =>
                                setseletedUser({ user: op, option: 1 })
                              }
                            >
                              {op.ho_ten}
                            </a>
                            <a
                              onClick={(e) =>
                                setseletedUser({ user: op, option: 1 })
                              }
                            >
                              {op.ma_nhanvien}
                            </a>
                          </div>
                        </td>
                        <td>{op.ten_goc ?? "-"}</td>
                        <td>{op.sdt ?? "-"}</td>
                        <td>{op.nhachinh?.name ?? "-"}</td>
                        <td>
                          {op?.congty_danglam?.name ?? (
                            <i className="fa-solid fa-ban"></i>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-col">
                            <div className="flex">
                              {op?.work?.start_date &&
                                new Date(op?.work?.start_date)
                                  ?.toISOString()
                                  ?.split("T")[0]}
                            </div>
                            <div className="flex">
                              {op?.work?.end_date
                                ? new Date(op?.work?.end_date)
                                    ?.toISOString()
                                    ?.split("T")[0]
                                : "-"}
                            </div>
                          </div>
                        </td>
                        <td>
                          {op?.nguoituyen && (
                            <>
                              <a className="flex">
                                {op?.nguoituyen?.name ?? "-"}
                              </a>
                              <div className="flex">
                                {op?.nguoituyen?.full_name ?? "-"}
                              </div>
                            </>
                          )}
                        </td>
                        <td>
                          {op?.nguoibaocao && (
                            <>
                              <a className="flex">
                                {op?.nguoibaocao?.name ?? "-"}
                              </a>
                              <div className="flex">
                                {op?.nguoibaocao?.full_name ?? "-"}
                              </div>
                            </>
                          )}
                        </td>
                        <td>
                          <div className="flex gap-1 ml-2">
                            <button
                              className="edit"
                              onClick={(e) =>
                                setseletedUser({ user: op, option: 2 })
                              }
                            >
                              <i className="fa-solid fa-clock-rotate-left"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9999}>
                        <Empty className="my-40" />
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel-cl">
        <Pagination
          disabled={loading}
          defaultCurrent={pagenow}
          total={opList.count}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OperatorList;
