import { Empty, Pagination } from "antd";
import React from "react";

const Employee_table = ({ listEMP }) => {
  return (
    <>
      <div className="employeer-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort("employeeCode")}>Mã nhân viên</th>
              <th onClick={() => handleSort("todayStatus")}>
                Thông tin cá nhân
              </th>
              <th onClick={() => handleSort("fullName")}>Bộ phận</th>
              <th onClick={() => handleSort("dob")}>Chức vụ</th>
              <th onClick={() => handleSort("address")}>Hoạt động tháng này</th>
              <th onClick={() => handleSort("accessCode")}>Công cụ</th>
            </tr>
          </thead>
          <tbody>
            {listEMP.length > 0 ? (
              listEMP.map((employee) => (
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
        <Pagination onShowSizeChange={10} defaultCurrent={1} total={20} />
      </div>
    </>
  );
};

export default Employee_table;
