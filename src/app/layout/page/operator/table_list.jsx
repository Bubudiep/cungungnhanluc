import { Table, Spin, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OperatorList = ({
  loading,
  firstload,
  opList,
  loadOP,
  setseletedUser,
}) => {
  const [pagenow, setPagenow] = useState(1);

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    setPagenow(page);
    loadOP(page);
  };

  // Cấu hình các cột cho Table của antd
  const columns = [
    {
      title: "",
      dataIndex: "congty_danglam",
      render: (congty_danglam) =>
        congty_danglam?.name ? (
          <div className="online">Online</div>
        ) : (
          <div className="offline">Offline</div>
        ),
    },
    {
      title: "Họ và tên",
      dataIndex: "ho_ten",
      render: (text, record) => (
        <div className="flex flex-col">
          <Link to={`/electron/operator/${record.id}`}>{text}</Link>
          <Link to={`/electron/operator/${record.id}`}>
            {record.ma_nhanvien}
          </Link>
        </div>
      ),
    },
    {
      title: "Tên gốc",
      dataIndex: "ten_goc",
      render: (text) => text ?? "-",
    },
    {
      title: "SĐT",
      dataIndex: "sdt",
      render: (text) => text ?? "-",
    },
    {
      title: "Nhà chính",
      dataIndex: "nhachinh",
      render: (nhachinh) => nhachinh?.name ?? "-",
    },
    {
      title: "Công ty",
      dataIndex: "congty_danglam",
      render: (congty_danglam) =>
        congty_danglam?.name ?? <i className="fa-solid fa-ban"></i>,
    },
    {
      title: "Ngày vào làm",
      dataIndex: "work",
      render: (work) => (
        <div className="flex flex-col">
          <div>
            {work?.length > 0 && work[0].start_date
              ? new Date(work[0].start_date).toISOString().split("T")[0]
              : "-"}
          </div>
          <div>
            {work?.length > 0 && work[0].end_date
              ? new Date(work[0].end_date).toISOString().split("T")[0]
              : "-"}
          </div>
        </div>
      ),
    },
    {
      title: "Người tuyển",
      dataIndex: "nguoituyen",
      render: (nguoituyen) =>
        nguoituyen ? (
          <>
            <a className="flex">{nguoituyen?.name ?? "-"}</a>
            <div className="flex">{nguoituyen?.full_name ?? "-"}</div>
          </>
        ) : (
          "-"
        ),
    },
    {
      title: "Quản lý",
      dataIndex: "nguoibaocao",
      render: (nguoibaocao) =>
        nguoibaocao ? (
          <>
            <a className="flex">{nguoibaocao?.name ?? "-"}</a>
            <div className="flex">{nguoibaocao?.full_name ?? "-"}</div>
          </>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-2">
      <Table
        className="employeer-table"
        rowKey={(record) => record.ma_nhanvien}
        columns={columns}
        dataSource={opList.results}
        loading={firstload || loading}
        pagination={{
          current: pagenow,
          total: opList.count,
          onChange: handlePageChange,
        }}
        locale={{
          emptyText: <Empty className="my-40" />,
        }}
      />
    </div>
  );
};

export default OperatorList;
