import React, { useEffect, useState } from "react";
import api from "../../../components/api";
import Employee_table from "./employee/employee_table";
import { useUser } from "../../../components/userContext";
import { message } from "antd";

const Employee = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [empData, setEmpData] = useState(false);
  console.log(user);
  useEffect(() => {
    setLoading(true);
    api
      .get(`/db-employee/?key=` + user.key, user.token)
      .then((res) => {
        setEmpData(res || {}); // Cập nhật danh sách nhân viên
      })
      .catch((er) => {
        message.error(er?.message?.detail ?? "Phát sinh lỗi khi tải dữ liệu!");
        console.error("Lỗi khi tải dữ liệu:", er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="employee-page">
      <div className="flex flex-col gap-2">
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
            <div className="value">{user?.company?.department.length ?? 0}</div>
            <div className="content">Tổng số lượng bộ phận</div>
          </div>
          <div className="items">
            <div className="name">Chức vụ</div>
            <div className="value">{user?.company?.jobtitle.length ?? 0}</div>
            <div className="content">Tổng số lượng chức vụ</div>
          </div>
          <div className="items">
            <div className="name">Nghỉ việc</div>
            <div className="value">{empData?.totalResign ?? 0}</div>
            <div className="content">Những người đã nghỉ việc</div>
          </div>
        </div>
        <div className="employee-list">
          <Employee_table empData={empData} user={user} setUser={setUser} />
        </div>
      </div>
    </div>
  );
};

export default Employee;
