import React, { useEffect, useState } from "react";
import api from "../../../components/api";
import Employee_table from "./employee/employee_table";
import { useUser } from "../../../components/userContext";

const Employee = () => {
  const [loading, setLoading] = useState(false);
  const [empData, setEmpData] = useState(false);
  const user = useUser();
  console.log(user);
  useEffect(() => {
    setLoading(true);
    api
      .get(`/db-employee/`, api.getCookie("token"))
      .then((res) => {
        setEmpData(res || {}); // Cập nhật danh sách nhân viên
      })
      .catch((er) => {
        console.error("Lỗi khi tải dữ liệu:", er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="employee-page">
      <div className="db-card">
        <div className="items">
          <div className="name">Tổng số</div>
          <div className="value">{empData?.totalEmp ?? 0}</div>
          <div className="content">Nhân viên của công ty</div>
        </div>
        <div className="items">
          <div className="name">Trực tuyến</div>
          <div className="value">{empData?.totalOnline ?? 0}</div>
          <div className="content">Danh sách đi làm hôm nay</div>
        </div>
        <div className="items">
          <div className="name">Nghỉ ngơi</div>
          <div className="value">{empData?.totalOffine ?? 0}</div>
          <div className="content">Những người nghỉ hôm nay</div>
        </div>
        <div className="items">
          <div className="name">Bất thường</div>
          <div className="value">{empData?.totalBT ?? 0}</div>
          <div className="content">Những người đi muộn, về sớm</div>
        </div>
        <div className="items">
          <div className="name">Bộ phận</div>
          <div className="value">{empData?.totalDPM ?? 0}</div>
          <div className="content">Tổng số lượng bộ phận</div>
        </div>
        <div className="items">
          <div className="name">Chức vụ</div>
          <div className="value">{empData?.totalJT ?? 0}</div>
          <div className="content">Tổng số lượng chức vụ</div>
        </div>
        <div className="items">
          <div className="name">Nghỉ việc</div>
          <div className="value">{empData?.totalResign ?? 0}</div>
          <div className="content">Những người đã nghỉ việc</div>
        </div>
      </div>
      <div className="employee-list">
        <Employee_table empData={empData} user={user} />
      </div>
    </div>
  );
};

export default Employee;
