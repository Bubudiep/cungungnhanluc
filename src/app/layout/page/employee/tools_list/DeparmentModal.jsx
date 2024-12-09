import React from "react";
import { Modal, Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

const DepartmentModal = ({ open, onCancel, onSave, loading }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  return (
    <Modal
      title="Thêm bộ phận"
      open={open}
      onCancel={onCancel}
      footer={
        <Button
          type="primary"
          icon={<i className="fa-solid fa-cloud-arrow-down" />}
          loading={loading}
          onClick={handleSave}
        >
          Lưu lại
        </Button>
      }
    >
      <Form form={form} layout="vertical" name="departmentForm">
        <Form.Item
          name="departmentName"
          label="Tên bộ phận"
          rules={[{ required: true, message: "Vui lòng nhập tên bộ phận!" }]}
        >
          <Input placeholder="Nhập tên bộ phận..." />
        </Form.Item>
        <Form.Item name="description" label="Mô tả chức năng">
          <TextArea placeholder="Nhập mô tả cho bộ phận..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepartmentModal;
