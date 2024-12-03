import { Empty, Pagination, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import Tools_list from "./tools_list";
import Searchbox from "./seach_box";
import api from "../../../../components/api";

const Employee_table = ({ user }) => {
  const [loading, setLoading] = useState(false);
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
    const sortedList = [...listEMP].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setListEMP(sortedList); // Cập nhật danh sách sắp xếp
  };
  useEffect(() => {
    setLoading(true);
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
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="right-box">
        <div className="tools">
          <div className="left">
            <div className="searchbox">
              <i className="fa-solid fa-magnifying-glass"></i>
              <Searchbox />
            </div>
          </div>
          <div className="right">
            <Tools_list user={user} />
          </div>
        </div>
        {loading ? (
          <div className="employeer-table p-4">
            <div className="flex-col flex gap-2">
              <div className="flex gap-2">
                <Skeleton.Avatar active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
              </div>
              <div className="flex gap-2">
                <Skeleton.Avatar active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
              </div>
              <div className="flex gap-2">
                <Skeleton.Avatar active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
              </div>
              <div className="flex gap-2">
                <Skeleton.Avatar active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
                <Skeleton.Input active size="large" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="employeer-table">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th onClick={() => handleSort("employeeCode")}>
                      Thông tin nhân viên
                    </th>
                    <th onClick={() => handleSort("fullName")}>Bộ phận</th>
                    <th onClick={() => handleSort("dob")}>Chức vụ</th>
                    <th onClick={() => handleSort("address")}>
                      Hoạt động tháng này
                    </th>
                    <th onClick={() => handleSort("accessCode")}>Công cụ</th>
                  </tr>
                </thead>
                <tbody>
                  {listEMP?.length > 0 ? (
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
                              <div
                                className="notwork"
                                title={employee.isOnline}
                              >
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
                            <button className="edit">Cập nhập</button>
                            <button className="remove">Xóa</button>
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
          </>
        )}
      </div>
      <div className="employee-details">
        <div className="full">
          <Empty description="Chọn một nhân viên..." />
        </div>
      </div>
    </>
  );
};

export default Employee_table;
