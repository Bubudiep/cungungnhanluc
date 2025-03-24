import {
  Button,
  Empty,
  message,
  Pagination,
  Popconfirm,
  Skeleton,
  Spin,
  Table,
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
  const [pagenow, setPagenow] = useState(1);
  const [pageSize, setPageSize] = useState(15); // Thêm pageSize vào state
  const [listEMP, setListEMP] = useState([]);
  const [firstload, setFirstload] = useState(false);
  const [showLoad, setShowload] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(false);
  const [openEmployeeDetail, setOpenEmployeeDetail] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Thêm state để lưu các key của hàng đã chọn

  const handleSort = (key) => {
    if (!loading) {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
      const ordering = direction === "asc" ? key : `-${key}`;
      const url = `/employee/?page_size=${pageSize}&ordering=${ordering}`; // Sử dụng pageSize trong URL
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

  const handlePageChange = (page, size) => {
    setPagenow(page); // Cập nhật trang hiện tại
    setPageSize(size); // Cập nhật pageSize khi thay đổi
    setLoading(true); // Hiển thị trạng thái loading
    const url = `/employee/?page=${page}&page_size=${size}`; // API với số trang và pageSize
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
            employee: old.employee.map((oldJ) =>
              oldJ.id === res.id ? { ...oldJ, ...res } : oldJ
            ),
          }));
          message.success("Trạng thái mới đã cập nhật!");
        })
        .catch((er) => {
          message.error(er?.response?.detail ?? "Phát sinh lỗi!");
        })
        .finally(() => {
          setLoadingStates((prev) => ({ ...prev, [employee.id]: false }));
        });
    }, 500);
  };

  const handleSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys); // Cập nhật các hàng đã chọn
  };
  useEffect(() => {
    setFirstload(true);
    const timer = setTimeout(() => {
      api
        .get(`/employee/?page_size=${pageSize}`, user.token) // Sử dụng pageSize trong API call
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
  }, [pageSize]); // Thêm pageSize vào dependency để load lại khi pageSize thay đổi

  const columns = [
    {
      title: "Thông tin nhân viên",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => (
        <div className="flex flex-col">
          <div className="flex text-[#2b67e9]">
            <a href="#" onClick={() => setSelectedEmployee(record)}>
              {record.name ?? "-"}
            </a>
          </div>
          <div className="flex text-[#2b67e9] font-semibold">
            {record.username ?? "-"}
          </div>
        </div>
      ),
    },
    {
      title: "Bộ phận",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Chức vụ",
      dataIndex: "possition_name",
      key: "possition_name",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (text ? api.timeSinceOrder(text) : "-"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          {user.user.isAdmin &&
            (record.isActive ? (
              <>
                <Button
                  type="link"
                  className="edit"
                  onClick={() => {
                    setOpenEmployeeDetail(record);
                  }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </Button>
                <Popconfirm
                  title="Xác nhận khóa tài khoản?"
                  okText="Khóa"
                  cancelText="Hủy"
                  onConfirm={() => handleDeactive(record, false)}
                >
                  <Button
                    type="link"
                    className="remove"
                    icon={<i className="fa-solid fa-lock"></i>}
                    loading={loadingStates[record.id] || false}
                  ></Button>
                </Popconfirm>
              </>
            ) : (
              <>
                <Popconfirm
                  title="Mở khóa tài khoản?"
                  okText="Mở"
                  cancelText="Hủy"
                  onConfirm={() => handleDeactive(record, true)}
                >
                  <Button
                    type="link"
                    className="edit"
                    icon={<i className="fa-solid fa-unlock"></i>}
                    loading={loadingStates[record.id] || false}
                  ></Button>
                </Popconfirm>
              </>
            ))}
        </div>
      ),
    },
  ];

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
      <div className="right-box !max-w-[100%]">
        <div className="tools">
          <div className="left">
            <Searchbox user={user} />
          </div>
          <div className="right">
            {user.user.isAdmin && <Tools_list user={user} setUser={setUser} />}
          </div>
        </div>
        <div className="employeer-table">
          <Table
            columns={columns}
            dataSource={user.employee}
            loading={loading}
            pagination={false} // Tắt pagination tự động của table
            rowKey="id"
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectChange,
            }}
          />
        </div>
        <div className="panel-cl">
          <Pagination
            disabled={loading}
            current={pagenow}
            pageSize={pageSize} // Sử dụng pageSize ở đây
            total={total}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Employee_table;
