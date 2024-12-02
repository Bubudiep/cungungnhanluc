import React, { useEffect, useState } from "react";
import api from "../../../components/api";

const Employee = () => {
  const [listEMP, setListEMP] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Trạng thái sắp xếp

  useEffect(() => {
    setLoading(true);
    api
      .get(`/employee/?page_size=9999`)
      .then((res) => {
        setListEMP(res?.results || []); // Cập nhật danh sách nhân viên
      })
      .catch((er) => {
        console.error("Lỗi khi tải dữ liệu:", er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Hàm xử lý sắp xếp
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

  return (
    <div className="employee-page">
      <div className="department">
        <div className="h3">
          <div className="left">Danh sách bộ phận</div>
          <div className="right">
            <button className="no-add">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="list-department">
          <div className="items">
            <div className="name">Bộ phận 1</div>
            <div className="right">
              <i class="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="items">
            <div className="name">Bộ phận 1</div>
            <div className="right">
              <i class="fa-solid fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="right-box">
        <div className="tools">
          <div className="left">
            <div className="searchbox">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="tên, mã,..." />
              <button className="search">Tìm kiếm</button>
            </div>
          </div>
          <div className="right">
            <button className="create">
              <i className="fa-solid fa-plus"></i>Thêm bộ phận
            </button>
            <button className="create">
              <i className="fa-solid fa-plus"></i>Thêm nhân viên
            </button>
          </div>
        </div>
        <div className="employeer-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th onClick={() => handleSort("employeeCode")}>Mã nhân viên</th>
                <th onClick={() => handleSort("todayStatus")}>
                  Thông tin cá nhâ
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
              {listEMP.map((employee) => (
                <tr key={employee.employeeCode}>
                  <td className="isOut">
                    {employee.status === "Chưa nghỉ việc" ? (
                      <div className="work" title={employee.status}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                    ) : (
                      <div className="notwork" title={employee.status}>
                        <i className="fa-solid fa-xmark"></i>
                      </div>
                    )}
                  </td>
                  <td className="isWork">
                    {employee.status === "Chưa nghỉ việc"
                      ? employee.todayStatus
                      : "Thôi việc"}
                  </td>
                  <td>{employee.employeeCode}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.address}</td>
                  <td>{employee.accessCode}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.idCard}</td>
                  <td>{employee.accountNumber}</td>
                  <td>{employee.bank}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="edit">Sửa</button>
                      <button className="remove">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
