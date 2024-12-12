import { Button, Empty, Modal, Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
import api from "../../../components/api";
import { useUser } from "../../../components/userContext";
const Company = () => {
  const { user, setUser } = useUser();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchCompanies();
  }, []);
  const fetchCompanies = async () => {
    setLoading(true);
    if (user) {
      api
        .get("/customers/", user.token)
        .then((res) => {
          setCompanies(res.results); // giả sử response.data là mảng công ty
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleAddCompany = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setCreating(true);
      api
        .post("/customers/", values, user.token)
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
    if (loading) {
      return (
        <tr>
          <td colSpan={999} className="text-center p-8">
            Đang tải dữ liệu...
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

    return companies.map((company) => (
      <tr key={company.id}>
        <td></td>
        <td>{company.name}</td>
        <td>{company.fullname}</td>
        <td>{company.hotline}</td>
        <td>{company.address}</td>
        <td>{company.website}</td>
      </tr>
    ));
  };

  return (
    <div className="company-page">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
        <div className="white-table">
          <div className="h3">
            <div className="text">Khách hàng</div>
            <div className="tools">
              <Button type="primary" onClick={handleAddCompany}>
                Thêm công ty
              </Button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tên gọi</th>
                <th>Tên doanh nghiệp</th>
                <th>Số liên hệ</th>
                <th>Địa chỉ</th>
                <th>Trang web</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
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
      </div>
    </div>
  );
};

export default Company;
