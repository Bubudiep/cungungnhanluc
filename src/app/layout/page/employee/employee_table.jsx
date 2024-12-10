import {
  Button,
  Empty,
  message,
  Pagination,
  Popconfirm,
  Skeleton,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import Tools_list from "./tools_list";
import Searchbox from "./seach_box";
import api from "../../../../components/api";
import EditEmployee from "./tools_list/EditEmployee";

const Employee_table = ({ user, setUser }) => {
  const [total, setTotal] = useState(0);
  const [loadingStates, setLoadingStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(false);
  const [showLoad, setShowload] = useState(true);
  const [pagenow, setPagenow] = useState(1);
  const [listEMP, setListEMP] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(false);
  const [openEmployeeDetail, setOpenEmployeeDetail] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Trạng thái sắp xếp
  const handleSort = (key) => {
    if (!loading) {
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
            setUser((old) => ({
              ...old,
              employee: res.results,
            }));
          })
          .catch((er) => {
            console.error("Lỗi khi tải dữ liệu:", er);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 500);
      return () => clearTimeout(timer);
    }
  };
  const handlePageChange = (page) => {
    setPagenow(page); // Cập nhật trang hiện tại
    setLoading(true); // Hiển thị trạng thái loading
    const url = `/employee/?page=${page}&page_size=10`; // API với số trang
    const timer = setTimeout(() => {
      api
        .get(url, user.token)
        .then((res) => {
          setUser((old) => ({
            ...old,
            employee: res.results,
          }));
          setTotal(res.count); // Cập nhật tổng số nhân viên
        })
        .catch((er) => {
          console.error("Lỗi khi tải dữ liệu:", er);
        })
        .finally(() => {
          setLoading(false); // Ẩn trạng thái loading
        });
    }, 500);
    return () => clearTimeout(timer);
  };
  const handleDeactive = (employee, active) => {
    setLoadingStates((prev) => ({ ...prev, [employee.id]: true }));
    setTimeout(() => {
      api
        .patch(
          `/employee_account/${employee.id}/`,
          { isActive: active },
          user.token
        )
        .then((res) => {
          setUser((old) => ({
            ...old,
            employee: old.employee.map(
              (oldJ) =>
                oldJ.id === res.id
                  ? { ...oldJ, ...res } // Cập nhật thông tin
                  : oldJ // Giữ nguyên phần tử không cần cập nhật
            ),
          }));
          message.success("Trạng thái mới đã cập nhập!");
        })
        .catch((er) => {
          message.error(er?.response?.detail ?? "Phát sinh lỗi!");
        })
        .finally(() => {
          setLoadingStates((prev) => ({ ...prev, [employee.id]: false }));
        });
    }, 500);
  };
  useEffect(() => {
    setFirstload(true);
    const timer = setTimeout(() => {
      api
        .get(`/employee/?page_size=10`, user.token)
        .then((res) => {
          setUser((old) => ({
            ...old,
            employee: res.results,
          }));
          setTotal(res.count);
          setListEMP(res.results || []); // Cập nhật danh sách nhân viên
        })
        .catch((er) => {
          message.error(er?.response?.detail ?? "Lỗi khi tải dữ liệu!");
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
      <EditEmployee
        open={openEmployeeDetail}
        user={user}
        setUser={setUser}
        onCancel={() => {
          setOpenEmployeeDetail(false);
        }}
      />
      <div className="right-box">
        <div className="tools">
          <div className="left">
            <Searchbox user={user} />
          </div>
          <div className="right">
            {user.user.isAdmin && <Tools_list user={user} setUser={setUser} />}
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
                <th onClick={() => handleSort("name")} style={{ width: 300 }}>
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
                <th
                  onClick={() => handleSort("department")}
                  style={{ width: 200 }}
                >
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
                <th
                  onClick={() => handleSort("possition")}
                  style={{ width: 200 }}
                >
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
                <th style={{ width: 100 }}>Thời gian tạo</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody className="fadeIn">
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
              ) : user.employee?.length > 0 ? (
                user.employee?.map((employee) => (
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
                          <div className="notwork">
                            <i className="fa-solid fa-xmark"></i>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <div className="flex text-[#2b67e9]">
                          <a
                            href="#"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            {employee.name ?? "-"}
                          </a>
                        </div>
                        <div className="flex text-[#2b67e9] font-semibold">
                          {employee.username ?? "-"}
                        </div>
                      </div>
                    </td>
                    <td>
                      {employee.department_name ? (
                        <a
                          href="#"
                          onClick={() => setSelectedEmployee(employee)}
                        >
                          {employee.department_name}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {employee.possition_name ? (
                        <a
                          href="#"
                          onClick={() => setSelectedEmployee(employee)}
                        >
                          {employee.possition_name}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="text-[#999]">
                      {employee.created_at
                        ? api.timeSinceOrder(employee.created_at)
                        : "-"}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        {user.user.isAdmin &&
                          (employee.isActive ? (
                            <>
                              <Button
                                type="link"
                                className="edit"
                                onClick={() => {
                                  setOpenEmployeeDetail(employee);
                                }}
                              >
                                <i className="fa-regular fa-pen-to-square"></i>
                              </Button>
                              <Popconfirm
                                title="Xác nhận khóa tài khoản?"
                                okText="Khóa"
                                cancelText="Hủy"
                                onConfirm={() =>
                                  handleDeactive(employee, false)
                                }
                              >
                                <Button
                                  type="link"
                                  className="remove"
                                  icon={<i className="fa-solid fa-lock"></i>}
                                  loading={loadingStates[employee.id] || false} // Trạng thái loading chỉ áp dụng cho nhân viên hiện tại
                                ></Button>
                              </Popconfirm>
                            </>
                          ) : (
                            <>
                              <Popconfirm
                                title="Mở khóa tài khoản?"
                                okText="Mở"
                                cancelText="Hủy"
                                onConfirm={() => handleDeactive(employee, true)}
                              >
                                <Button
                                  type="link"
                                  className="edit"
                                  icon={<i className="fa-solid fa-unlock"></i>}
                                  loading={loadingStates[employee.id] || false} // Trạng thái loading chỉ áp dụng cho nhân viên hiện tại
                                ></Button>
                              </Popconfirm>
                            </>
                          ))}
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
          <Pagination
            disabled={loading}
            defaultCurrent={pagenow}
            total={total}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <div className="employee-details">
        <div className="full">
          {selectedEmployee ? (
            <></>
          ) : (
            <Empty description="Chọn một nhân viên hoặc bộ phận, chức vụ để phân quyền..." />
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee_table;
