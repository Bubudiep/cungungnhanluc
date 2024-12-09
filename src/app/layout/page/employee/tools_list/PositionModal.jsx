import React from "react";
import { Modal, Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

const PositionModal = ({ open, onCancel, onSave, loading }) => {
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
      title="Thêm chức vụ"
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
      <Form form={form} layout="vertical" name="positionForm">
        <Form.Item
          name="positionName"
          label="Tên chức vụ"
          rules={[{ required: true, message: "Vui lòng nhập tên chức vụ!" }]}
        >
          <Input placeholder="Nhập tên chức vụ..." />
        </Form.Item>
        <Form.Item name="jobDescription" label="Mô tả công việc">
          <TextArea placeholder="Nhập mô tả công việc cho chức vụ..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PositionModal;
