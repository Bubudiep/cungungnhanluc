import { Empty, Pagination, Skeleton, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Tools_list from "./tools_list";
import Searchbox from "./seach_box";
import api from "../../../../components/api";

const Employee_table = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(false);
  const [showLoad, setShowload] = useState(true);
  const [pagenow, setPagenow] = useState(1);
  const [listEMP, setListEMP] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Trạng thái sắp xếp
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const ordering = direction === "asc" ? key : `-${key}`;
    const url = `/employee/?page_size=10&ordering=${ordering}`;
    setLoading(true);
    const timer = setTimeout(() => {
      api
        .get(url, user.token)
        .then((res) => {
          setListEMP(res.results || []); // Cập nhật danh sách nhân viên
        })
        .catch((er) => {
          console.error("Lỗi khi tải dữ liệu:", er);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    setFirstload(true);
    const timer = setTimeout(() => {
      api
        .get(`/employee/?page_size=10`, user.token)
        .then((res) => {
          setListEMP(res.results || []); // Cập nhật danh sách nhân viên
        })
        .catch((er) => {
          console.error("Lỗi khi tải dữ liệu:", er);
        })
        .finally(() => {
          setFirstload(false);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-1 items-start gap-2">
      <div className="right-box">
        <div className="tools">
          <div className="left">
            <div className="searchbox">
              <i className="fa-solid fa-magnifying-glass"></i>
              <Searchbox />
            </div>
          </div>
          <div className="right">
            {user?.user?.isAdmin ?? <Tools_list user={user} />}
          </div>
        </div>
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
                <th onClick={() => handleSort("name")}>
                  Thông tin nhân viên
                  {sortConfig.key === "name" && (
                    <div className="flex flex-col filter">
                      <i
                        className={`fa-solid fa-caret-up ${
                          sortConfig.direction === "asc" && "active"
                        }`}
                      ></i>
                      <i
                        className={`fa-solid fa-caret-down ${
                          sortConfig.direction !== "asc" && "active"
                        }`}
                      ></i>
                    </div>
                  )}
                </th>
                <th onClick={() => handleSort("department")}>
                  Bộ phận
                  {sortConfig.key === "department" && (
                    <div className="flex flex-col filter">
                      <i
                        className={`fa-solid fa-caret-up ${
                          sortConfig.direction === "asc" && "active"
                        }`}
                      ></i>
                      <i
                        className={`fa-solid fa-caret-down ${
                          sortConfig.direction !== "asc" && "active"
                        }`}
                      ></i>
                    </div>
                  )}
                </th>
                <th onClick={() => handleSort("possition")}>
                  Chức vụ
                  {sortConfig.key === "possition" && (
                    <div className="flex flex-col filter">
                      <i
                        className={`fa-solid fa-caret-up ${
                          sortConfig.direction === "asc" && "active"
                        }`}
                      ></i>
                      <i
                        className={`fa-solid fa-caret-down ${
                          sortConfig.direction !== "asc" && "active"
                        }`}
                      ></i>
                    </div>
                  )}
                </th>
                <th>Hoạt động tháng này</th>
                <th>Công cụ</th>
              </tr>
            </thead>
            <tbody>
              {firstload ? (
                <tr>
                  <td colSpan={9999} className="none">
                    <Spin size="large" />
                  </td>
                </tr>
              ) : listEMP?.length > 0 ? (
                listEMP?.map((employee) => (
                  <tr key={employee.id}>
                    <td className="isOut">
                      <div className="flex flex-col items-start">
                        {employee.isActive ? (
                          employee.isOnline ? (
                            <div className="online">online</div>
                          ) : (
                            <div className="offline">offline</div>
                          )
                        ) : (
                          <div className="notwork" title={employee.isOnline}>
                            <i className="fa-solid fa-xmark"></i>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{employee.name ?? "-"}</td>
                    <td>{employee.fullNamee ?? "-"}</td>
                    <td>{employee.dobe ?? "-"}</td>
                    <td>{employee.addresse ?? "-"}</td>
                    <td>
                      <div className="flex gap-1">
                        {user?.user?.isAdmin ?? (
                          <>
                            <button className="edit">Cập nhập</button>
                            <button className="remove">Xóa</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="null" colSpan={999}>
                    <Empty description="Chưa có nhân viên nào..." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="panel-cl">
          <Pagination defaultCurrent={pagenow} total={0} />
        </div>
      </div>
      <div className="employee-details">
        <div className="full">
          <Empty description="Chọn một nhân viên..." />
        </div>
      </div>
    </div>
  );
};

export default Employee_table;
