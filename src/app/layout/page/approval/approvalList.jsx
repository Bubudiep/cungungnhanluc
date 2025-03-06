import React, { useEffect, useState } from "react";
import ApprovalTools from "./approvalTools";
import { Empty, Pagination, Spin } from "antd";
import api from "../../../../components/api";
import { useUser } from "../../../../components/userContext";
const ListApproval = () => {
  const { user, setUser } = useUser();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(true);
  const [pagenow, setPagenow] = useState(1);
  const [apList, setApList] = useState({ count: 0, results: [] });
  const handlePageChange = (page) => {
    setPagenow(page);
    setLoading(true);
    const url = `/pheduyet/?page=${page}`;
    api
      .get(url, user.token)
      .then((res) => {
        setTotal(res.count); // Cập nhật tổng số nhân viên
        setApList(res);
      })
      .catch((er) => {
        console.error("Lỗi khi tải dữ liệu:", er);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setFirstload(false);
        }, 500);
      });
  };
  useEffect(() => {
    handlePageChange(1);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-1 w-[800px]">
        <ApprovalTools />
        <div className="approval-table">
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
                <th>Trạng thái</th>
                <th>Phân loại</th>
                <th>Người tạo</th>
                <th>Người lao động</th>
                <th>Hạng mục</th>
                <th>Lý do</th>
                <th>Xử lý</th>
                <th>Cập nhập</th>
                <th>Ngày tạo</th>
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
                  {apList?.results?.length > 0 ? (
                    apList?.results.map((op, idx) => (
                      <tr key={idx} className={`${op?.status?.toUpperCase()}`}>
                        <td></td>
                        <td className={`!text-[11px] ${op?.status} online`}>
                          {op?.status == "pending" ? "Chờ duyệt" : op?.status}
                        </td>
                        <td>{op?.requesttype?.typecode ?? "Chưa phân loại"}</td>
                        <td>{op?.requester?.profile?.full_name ?? "-"}</td>
                        <td>{op?.operator?.ho_ten ?? "-"}</td>
                        <td>-</td>
                        <td>{op?.comment ?? "-"}</td>
                        <td>
                          <div className="flex flex-col">
                            <div className="flex">
                              {op?.work?.length > 0 &&
                                op?.work[0].start_date &&
                                new Date(op?.work[0].start_date)
                                  ?.toISOString()
                                  ?.split("T")[0]}
                            </div>
                            <div className="flex">
                              {op?.work?.length > 0 && op?.work[0].end_date
                                ? new Date(op?.work[0].end_date)
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
                                setseletedUser({ user: op, option: 1 })
                              }
                            >
                              <i className="fa-solid fa-circle-info"></i>
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
        <div className="panel-cl">
          <Pagination
            disabled={loading}
            defaultCurrent={pagenow}
            total={apList.count}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ListApproval;
