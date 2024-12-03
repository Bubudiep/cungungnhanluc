import React, { useEffect, useState } from "react";
import api from "../../../components/api";
import Searchbox from "./employee/seach_box";
import Employee_table from "./employee/employee_table";
import Tools_list from "./employee/tools_list";
import Department from "./employee/department";
import { Empty } from "antd";

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
      <div className="db-card">
        <div className="items">
          <div className="name">Tổng số</div>
          <div className="value">00</div>
          <div className="content">Số lượng nhân viên của công ty</div>
        </div>
        <div className="items">
          <div className="name">Trực tuyến</div>
          <div className="value">00</div>
          <div className="content">Danh sách đi làm hôm nay</div>
        </div>
        <div className="items">
          <div className="name">Nghỉ ngơi</div>
          <div className="value">00</div>
          <div className="content">Những người nghỉ hôm nay</div>
        </div>
        <div className="items">
          <div className="name">Bất thường</div>
          <div className="value">00</div>
          <div className="content">Những người đi muộn, về sớm</div>
        </div>
        <div className="items">
          <div className="name">Nghỉ việc</div>
          <div className="value">00</div>
          <div className="content">Những người đã nghỉ việc</div>
        </div>
        <div className="items">
          <div className="name">Bộ phận</div>
          <div className="value">00</div>
          <div className="content">Tổng số lượng bộ phận</div>
        </div>
      </div>
      <div className="employee-list">
        <div className="right-box">
          <div className="tools">
            <div className="left">
              <div className="searchbox">
                <i className="fa-solid fa-magnifying-glass"></i>
                <Searchbox />
              </div>
            </div>
            <div className="right">
              <Tools_list />
            </div>
          </div>
          <Employee_table listEMP={listEMP} />
        </div>
        <div className="employee-details">
          <div className="full">
            <Empty description="Chọn một nhân viên..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
