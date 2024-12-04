import { Button, Input, Modal, Form, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import api from "../../../../components/api";

const Tools_list = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalType, setModalType] = useState(""); // Thêm state để lưu type
  const [form] = Form.useForm(); // Tạo instance của Form
  const handleCancel = () => {
    setOpen(false);
    setModalLoading(false);
  };
  const openModal = (type) => {
    setModalType(type); // Lưu type hiện tại
    if (type === "department") {
      setModalTitle("Thêm bộ phận");
      setModalContent(
        <Form form={form} name="departmentForm" layout="vertical">
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
      );
    } else if (type === "possition") {
      setModalTitle("Thêm chức vụ");
      setModalContent(
        <Form form={form} name="possitionForm" layout="vertical">
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
      );
    } else if (type === "employee") {
      setModalTitle("Thêm nhân viên");
      setModalContent(
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
            <Input.Password placeholder="Nhập mật khẩu..." />
          </Form.Item>
          <Form.Item name="department" label="Bộ phận">
            <Select
              placeholder="Chọn một bộ phận"
              options={[
                { value: "1", label: "Bộ phận A" },
                { value: "2", label: "Bộ phận B" },
              ]}
            />
          </Form.Item>
          <Form.Item name="jobtitle" label="Chức vụ">
            <Select
              placeholder="Chọn một chức vụ"
              options={[
                { value: "1", label: "Chức vụ A" },
                { value: "2", label: "Chức vụ B" },
              ]}
            />
          </Form.Item>
        </Form>
      );
    }
    setOpen(true);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        setModalLoading(true);
        let apiUrl = "";
        switch (modalType) {
          case "department":
            apiUrl = "/api/department/";
            break;
          case "possition":
            apiUrl = "/api/possition/";
            break;
          case "employee":
            apiUrl = "/create-employee/";
            break;
          default:
            return;
        }
        const data = { ...values, key: user?.key };
        console.log(data);
        api
          .post(apiUrl, data, api.getCookie("token"))
          .then((res) => {
            message.success("Thêm thành công!");
            setOpen(false);
            form.resetFields();
          })
          .catch((err) => {
            if (err?.response?.Error) {
              message.error(err.response.Error);
            } else {
              message.error("Có lỗi xảy ra!");
            }
          })
          .finally(() => {
            setModalLoading(false);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  useEffect(() => {}, []);
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
        {modalContent}
      </Modal>
    </>
  );
};

export default Tools_list;
