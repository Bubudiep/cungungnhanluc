import React, { useState, useEffect } from "react";
import {
  Button,
  Empty,
  Modal,
  Form,
  Input,
  message,
  Spin,
  Pagination,
} from "antd";
import api from "../../../../components/api";

const Vendor = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstload, setFirstload] = useState(true);
  const [creating, setCreating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pagenow, setPagenow] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetchCompanies();
  }, []);
  const fetchCompanies = (page) => {
    setLoading(true);
    if (user) {
      setTimeout(() => {
        api
          .get("/vendors/?page_size=5&page=" + pagenow, user.token)
          .then((res) => {
            setCompanies(res.results);
            setLoading(false);
            setFirstload(false);
            setTotal(res.count);
            setPagenow(pagenow); // Cập nhật trang hiện tại
          })
          .catch((error) => {
            console.error(error);
          });
      }, 500);
    }
  };
  const handleAddCompany = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setCreating(true);
      api
        .post("/vendors/", values, user.token)
        .then((data) => {
          fetchCompanies();
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch((er) => {
          message.error(er?.response?.detail ?? "Phát sinh lỗi khởi tạo!");
        })
        .finally(() => {
          setCreating(false);
        });
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const renderTableBody = () => {
    if (loading && firstload) {
      return (
        <tr>
          <td colSpan={9999} className="none">
            <Spin
              size="large"
              style={{
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </td>
        </tr>
      );
    }
    if (!companies || companies.length === 0) {
      return (
        <tr>
          <td colSpan={999} className="text-center p-8">
            <Empty />
          </td>
        </tr>
      );
    }
    return companies.map((company, inx) => (
      <tr key={company.id}>
        <td className="text-[13px] text-center">
          {(pagenow - 1) * 5 + (inx + 1)}
        </td>
        <td>{company.name}</td>
        <td>{company.fullname}</td>
        <td>{company.hotline}</td>
        <td>{company.address}</td>
        <td>{company.website}</td>
      </tr>
    ));
  };
  return (
    <>
      <div className="white-table">
        <div className="h3">
          <div className="text">Danh sách các công ty cung ứng (Vendor)</div>
          <div className="tools">
            <Button type="primary" onClick={handleAddCompany}>
              Thêm công ty
            </Button>
          </div>
        </div>
        <table className="text-[13px]">
          <thead>
            <tr>
              <th className="w-[50px]">
                <div className="flex justify-center">
                  {loading && !firstload && <Spin size="small" />}
                </div>
              </th>
              <th>Tên gọi</th>
              <th>Tên doanh nghiệp</th>
              <th>Số liên hệ</th>
              <th>Địa chỉ</th>
              <th>Trang web</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
        <div className="panel-cl-inline">
          <Pagination
            disabled={loading}
            defaultCurrent={pagenow}
            total={total}
            onChange={fetchCompanies}
            pageSize={5}
          />
        </div>
      </div>
      <Modal
        title="Thêm công ty"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={creating}
        okText="Lưu"
        cancelText="Hủy"
        className="add_company_modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên gọi"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
          >
            <Input placeholder="nhập tên thường gọi của doanh nghiệp..." />
          </Form.Item>
          <Form.Item
            label="Tên doanh nghiệp"
            name="fullname"
            rules={[
              { required: true, message: "Vui lòng nhập tên doanh nghiệp" },
            ]}
          >
            <Input placeholder="nhập tên kinh doanh..." />
          </Form.Item>
          <Form.Item label="Số liên hệ" name="hotline">
            <Input placeholder="nhập số điện thoại..." />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="nhập email..." />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="nhập địa chỉ..." />
          </Form.Item>
          <Form.Item label="Trang web" name="website">
            <Input placeholder="nhập website... (nếu có)" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Vendor;
