import React from "react";
import { Button, Form, Input, Modal, Select } from "antd";

const AddEmployee = ({
  open,
  handleCancel,
  modalLoading,
  onSave,
  jobtitle,
  department,
}) => {
  const [form] = Form.useForm();
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };
  return (
    <Modal
      title="Thêm nhân viên"
      open={open}
      onCancel={handleCancel}
      footer={
        <Button
          type="primary"
          icon={<i className="fa-solid fa-cloud-arrow-down" />}
          loading={modalLoading}
          onClick={handleSave}
        >
          Lưu lại
        </Button>
      }
      className="custom-modal"
    >
      {
        <Form
          form={form}
          name="employeeForm"
          layout="vertical"
          className="custom-form"
        >
          <Form.Item
            name="employeeCode"
            label="Mã nhân viên"
            rules={[{ required: true, message: "Vui lòng nhập mã nhân viên!" }]}
          >
            <Input placeholder="Nhập mã nhân viên..." />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên..." />
          </Form.Item>
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập..." />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input placeholder="Nhập mật khẩu..." />
          </Form.Item>
          <Form.Item
            name="department"
            label="Bộ phận"
            initialValue={department.length > 0 ? department[0].id : undefined}
          >
            <Select
              placeholder="Chọn một bộ phận"
              options={department.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="jobtitle"
            label="Chức vụ"
            initialValue={jobtitle.length > 0 ? jobtitle[0].id : undefined}
          >
            <Select
              placeholder="Chọn một bộ phận"
              options={jobtitle.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
        </Form>
      }
    </Modal>
  );
};

export default AddEmployee;
