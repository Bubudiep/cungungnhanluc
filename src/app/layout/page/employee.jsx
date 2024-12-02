import React, { useEffect, useState } from "react";
import api from "../../../components/api";

const Employee = () => {
  const [listEMP, setListEMP] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = api.getCookie("token");
  useEffect(() => {
    setLoading(true);
    api
      .get(`/employer/?page_size=9999`)
      .then((res) => {})
      .catch((er) => {})
      .finally(() => {});
  }, []);
  return (
    <>
      <div className="employeer-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort("todayStatus")}>Trạng thái</th>
              <th onClick={() => handleSort("employeeCode")}>Mã nhân viên</th>
              <th onClick={() => handleSort("fullName")}>Họ và tên</th>
              <th onClick={() => handleSort("dob")}>Ngày sinh</th>
              <th onClick={() => handleSort("address")}>Địa chỉ</th>
              <th onClick={() => handleSort("accessCode")}>Mã khóa</th>
              <th onClick={() => handleSort("department")}>Bộ phận</th>
              <th onClick={() => handleSort("position")}>Chức vụ</th>
              <th onClick={() => handleSort("startDate")}>Ngày bắt đầu</th>
              <th onClick={() => handleSort("idCard")}>CCCD</th>
              <th onClick={() => handleSort("accountNumber")}>Số tài khoản</th>
              <th onClick={() => handleSort("bank")}>Ngân hàng</th>
              <th>Thao tác</th>
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
    </>
  );
};

export default Employee;
