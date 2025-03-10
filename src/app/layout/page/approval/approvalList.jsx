import React, { useEffect, useState } from "react";
import ApprovalTools from "./approvalTools";
import { Table, Checkbox, Spin, Empty, Button, Modal, Tooltip } from "antd";
import api from "../../../../components/api";
import { useUser } from "../../../../components/userContext";
import { FaCircleInfo } from "react-icons/fa6";
import ApprovalHis from "./approvalHis";
import ApprovalDetails from "./approvalDetails";

const ListApproval = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [pagenow, setPagenow] = useState(1);
  const [apList, setApList] = useState({ count: 0, results: [] });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const fetchData = (page, pagesize = pageSize) => {
    setLoading(true);
    api
      .get(`/pheduyet/?page=${page}&page_size=${pagesize}`, user.token)
      .then((res) => {
        setApList(res);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setFirstLoad(false);
        }, 500);
      });
  };
  const handlePageChange = (page, size) => {
    setPagenow(page);
    setPageSize(size);
    setLoading(true);
    fetchData(page, size);
  };
  const handleAction = (record) => {
    setSelectedRecord(record);
  };
  useEffect(() => {
    fetchData(1, 10);
  }, []);
  const columns = [
    {
      title: "",
      dataIndex: "status",
      render: (status, record) => (
        <div className={status}>{record.status_display}</div>
      ),
    },
    {
      title: "",
      dataIndex: "requesttype",
      render: (requesttype) => (
        <div
          className={`flex p-2 py-1 rounded text-[#fff] text-[11px] font-[500]`}
          style={{
            backgroundColor: requesttype?.color ?? "#999",
          }}
        >
          {requesttype?.typecode ?? "Chưa phân loại"}
        </div>
      ),
    },
    {
      title: "#ID",
      dataIndex: "request_code",
      render: (request_code, record) => (
        <div
          className="request_code"
          key={record.id}
          onClick={() => {
            handleAction(record);
          }}
        >
          #{request_code}
        </div>
      ),
    },
    {
      title: "Số tiền",
      className: "text-[#1677ff]",
      dataIndex: "amount",
      render: (amount) => parseInt(amount).toLocaleString(),
    },
    {
      title: "Người tạo",
      dataIndex: "requester",
      render: (requester) => requester?.profile?.full_name ?? "-",
    },
    {
      title: "Hạng mục",
      dataIndex: "reason",
      render: (reason) => reason?.typename ?? "-", // Placeholder
    },
    {
      title: "Lý do",
      dataIndex: "comment",
      render: (comment) => (
        <div className="max-w-[100px]">
          <Tooltip title={comment}>{comment ?? "-"}</Tooltip>
        </div>
      ),
    },
    {
      title: "Giải ngân",
      dataIndex: "payment_status_display",
      render: (payment_status_display) => (
        <div
          className={`${payment_status_display === "Chưa" ? "not" : "done"}`}
        >
          {payment_status_display}
        </div>
      ),
    },
    {
      title: "Thu hồi",
      dataIndex: "retrieve_status_display",
      render: (retrieve_status_display) => (
        <div
          className={`${retrieve_status_display === "Chưa" ? "not" : "done"}`}
        >
          {retrieve_status_display}
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (created_at) => new Date(created_at).toLocaleString() ?? "-",
    },
  ];

  return (
    <div className="flex gap-2 flex-1 overflow-hidden">
      <div className="flex flex-col gap-1 !w-[1000px] !max-w-[1000px] approve-page">
        <ApprovalTools
          selectedRowKeys={selectedRowKeys}
          updateList={() => {
            fetchData(pagenow, pageSize);
          }}
        />
        {firstLoad ? (
          <Spin
            size="large"
            className="h-40 flex items-center justify-center"
          />
        ) : (
          <Table
            columns={columns}
            dataSource={apList.results}
            rowKey={(record) => record.id}
            pagination={{
              pageSize: pageSize,
              showSizeChanger: true,
              current: pagenow,
              total: apList.count,
              pageSizeOptions: ["5", "10", "15", "20", "30"],
              onShowSizeChange: handlePageChange,
              locale: { items_per_page: "/ trang" },
              onChange: (page) => {
                setPagenow(page);
                fetchData(page, pageSize);
              },
            }}
            className="approval-table"
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            loading={loading}
            locale={{ emptyText: <Empty /> }}
          />
        )}
      </div>
      <ApprovalHis />
      <ApprovalDetails
        item={selectedRecord}
        setItem={setSelectedRecord}
        list={apList}
        update={(res) => {
          fetchData(pagenow, pageSize);
        }}
      />
    </div>
  );
};

export default ListApproval;
