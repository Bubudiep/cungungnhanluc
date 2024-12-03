import { Button, Input, Modal, Form, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const Tools_list = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const handleCancel = () => {
    setOpen(false);
    setModalLoading(false);
  };
  const openModal = (type) => {
    if (type === "department") {
      setModalTitle("Thêm bộ phận");
      setModalContent(
        <Form
          className="custom-form"
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item label="Tên bộ phận" required tooltip="Ít nhất 8 ký tự">
            <Input placeholder="Nhập tên bộ phận..." />
          </Form.Item>
          <Form.Item label="Mô tả chức năng">
            <TextArea placeholder="Nhập mô tả cho bộ phận..." />
          </Form.Item>
        </Form>
      );
    } else if (type === "possition") {
      setModalTitle("Thêm chức vụ");
      setModalContent(
        <Form
          className="custom-form"
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item label="Tên chức vụ" required tooltip="Ít nhất 8 ký tự">
            <Input placeholder="Nhập tên chức vụ..." />
          </Form.Item>
          <Form.Item label="Mô tả công việc">
            <TextArea placeholder="Nhập mô tả công việc cho chức vụ..." />
          </Form.Item>
        </Form>
      );
    } else if (type === "employee") {
      setModalTitle("Thêm nhân viên");
      setModalContent(
        <Form
          className="custom-form"
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item label="Mã nhân viên" required>
            <Input placeholder="Nhập mã nhân viên..." />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            required
            tooltip="Ít nhất 8 ký tự, không dấu"
          >
            <Input placeholder="Nhập tên đăng nhập..." />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            required
            tooltip="Ít nhất 8 ký tự, không dấu"
          >
            <Input.Password placeholder="Nhập mật khẩu..." />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            required
            tooltip="Phải giống mật khẩu ở trên"
          >
            <Input.Password placeholder="Nhập lại mật khẩu..." />
          </Form.Item>
          <Form.Item label="Bộ phận">
            <Select
              showSearch
              allowClear
              placeholder="Chọn một bộ phận"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Jack",
                },
                {
                  value: "2",
                  label: "Lucy",
                },
                {
                  value: "3",
                  label: "Tom",
                },
              ]}
              notFoundContent="Không khớp với bộ phận nào!"
            />
          </Form.Item>
          <Form.Item label="Chức vụ">
            <Select
              allowClear
              showSearch
              placeholder="Chọn một chức vụ"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Jack",
                },
                {
                  value: "2",
                  label: "Lucy",
                },
                {
                  value: "3",
                  label: "Tom",
                },
              ]}
              notFoundContent="Không khớp với chức vụ nào!"
            />
          </Form.Item>
        </Form>
      );
    }
    setOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={() => openModal("possition")}>
        <i className="fa-solid fa-plus"></i> Thêm chức vụ
      </Button>
      <Button type="primary" onClick={() => openModal("department")}>
        <i className="fa-solid fa-plus"></i> Thêm bộ phận
      </Button>
      <Button type="primary" onClick={() => openModal("employee")}>
        <i className="fa-solid fa-plus"></i> Thêm nhân viên
      </Button>
      <Modal
        title={modalTitle}
        open={open}
        onCancel={handleCancel}
        footer={<></>}
        className="custom-modal"
      >
        {modalContent}
        <Button
          icon={<i className="fa-solid fa-cloud-arrow-down" />}
          loading={modalLoading}
          type="primary"
          style={{ marginTop: "12px" }}
          onClick={() => {
            setModalLoading(true);
            console.log(modalTitle);
          }}
        >
          Lưu lại
        </Button>
      </Modal>
    </>
  );
};

export default Tools_list;
