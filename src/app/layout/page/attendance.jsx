import React, { useEffect, useState } from "react";
import { Table, DatePicker, Button, Input } from "antd";
import dayjs from "dayjs";

const AttendanceTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    const filtered = data.filter((item) =>
      item[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(selectedKeys[0].toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm(); // Áp dụng lại filter
    setFilteredData(data);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="flex flex-col gap-1 p-2">
        <Input
          placeholder={`Nhập ${dataIndex == "name" ? "họ tên..." : "mã nv..."}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="text-[13px]"
        />
        <div className="flex gap-1">
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            className="p-3 text-[13px]"
          >
            Tìm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            className="p-3 text-[13px]"
          >
            Xóa
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <i
        className={`fa-solid fa-magnifying-glass`}
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: "Mã NV",
      dataIndex: "employeeCode",
      key: "employeeCode",
      fixed: "left",
      width: 100,
      className: "fixed-column",
      ...getColumnSearchProps("employeeCode"),
      sorter: (a, b) => a.employeeCode.localeCompare(b.employeeCode), // Sắp xếp theo họ tên
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 150,
      className: "fixed-column",
      ...getColumnSearchProps("name"),
    },
    ...Array.from({ length: selectedMonth.daysInMonth() }).map((_, i) => {
      const date = selectedMonth.startOf("month").add(i, "day"); // Tính ngày tương ứng
      const isSunday = date.day() === 0; // Chủ nhật có giá trị day() là 0
      const daysOfWeek = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
      ];
      const dayOfWeek = daysOfWeek[date.day()];
      return {
        title: (
          <div className="flex flex-col">
            <div className="date">Ngày {`${i + 1}/${date.month() + 1}`}</div>
            <div className="day">{dayOfWeek}</div> {/* Hiển thị thứ */}
          </div>
        ),
        dataIndex: `day${i + 1}`,
        key: `day${i + 1}`,
        width: 100,
        className: isSunday
          ? "attendance-column sunday-column"
          : "attendance-column", // Áp dụng lớp CSS cho chủ nhật
        render: (value) => (value ? value : "-"),
      };
    }),
    {
      title: "Tổng giờ",
      dataIndex: "totalWorkTimes",
      key: "totalWorkTimes",
      fixed: "right",
      width: 100,
      sorter: (a, b) => a.totalWorkTimes - b.totalWorkTimes, // Sắp xếp theo tổng giờ làm
    },
  ];

  useEffect(() => {
    const generateRandomAttendance = (numEmployees, daysInMonth) => {
      const employees = [];
      for (let i = 1; i <= numEmployees; i++) {
        const employee = {
          employeeCode: `NV${i.toString().padStart(3, "0")}`,
          name: `Công nhân ${i}`,
        };

        let totalWorkDays = 0;
        let totalWorkTimes = 0;

        for (let day = 1; day <= daysInMonth; day++) {
          const hours = Math.random() > 0.2 ? Math.floor(Math.random() * 9) : 0; // 80% đi làm, ngẫu nhiên từ 0-8 giờ
          employee[`day${day}`] = hours;
          totalWorkTimes += hours;
          totalWorkDays += hours > 0 ? 1 : 0;
        }

        employee.totalWorkTimes = totalWorkTimes;
        employee.totalWorkDays = totalWorkDays;
        employees.push(employee);
      }

      return employees;
    };

    const generatedData = generateRandomAttendance(20, 31);
    setData(generatedData);
    setFilteredData(generatedData);
  }, [selectedMonth]);

  const getSundayColumns = () => {
    return Array.from({ length: selectedMonth.daysInMonth() }).map((_, i) => {
      const date = selectedMonth.startOf("month").add(i, "day"); // Xác định ngày
      return date.day() === 0; // Kiểm tra ngày Chủ nhật
    });
  };
  const sundayColumns = getSundayColumns();
  const rowClassName = (record, index) => {
    return sundayColumns.map((isSunday, colIndex) =>
      isSunday ? `sunday-column-${colIndex + 1}` : ""
    );
  };
  return (
    <div className="attendance-page mt-1">
      <div className="db-card">
        <div className="items">
          <div className="name">Người đi làm</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="content !mt-0">Tổng người đi làm</div>
        </div>
        <div className="items">
          <div className="name">Giờ làm</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="content !mt-0">Tổng giờ làm trong tháng</div>
        </div>
        <div className="items">
          <div className="name">Ngày nghỉ</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="content !mt-0">Những ngày mà công nhân nghỉ</div>
        </div>
        <div className="items">
          <div className="name">Đi làm dưới 7 ngày</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="content !mt-0">Tổng số người đi làm dưới 7 ngày</div>
        </div>
        <div className="items">
          <div className="name">Đi làm đầy đủ</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="content !mt-0">Không nghỉ ngày nào</div>
        </div>
      </div>
      <div className="flex">
        <div className="left flex gap-1 items-center">
          <DatePicker
            picker="month"
            value={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            allowClear={false}
            className="p-2 h-[32px] w-[90px]"
          />
          <Button
            className="h-[32px] w-[36px] text-[13px]"
            onClick={() => setFilteredData(data)}
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </Button>
        </div>
        <div className="ml-auto flex gap-1">
          <Button
            type="primary"
            icon={<i className="fa-solid fa-file-arrow-up"></i>}
          >
            Tải lên
          </Button>
          <Button
            icon={<i className="fa-solid fa-file-csv"></i>}
            type="primary"
          >
            Xuất dữ liệu
          </Button>
        </div>
      </div>
      <div className="white-box">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="employeeCode"
          loading={loading}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 15 }}
          className="custom-attendance-table"
          rowClassName={rowClassName}
        />
      </div>
    </div>
  );
};

export default AttendanceTable;
