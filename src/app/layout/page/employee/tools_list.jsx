import { Button, Input, Modal, Form, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import api from "../../../../components/api";
import DepartmentModal from "./tools_list/DeparmentModal";
import PositionModal from "./tools_list/PositionModal";
import ListDepartment from "./tools_list/ListDepartment";
import ListPossition from "./tools_list/ListPossition";
import AddEmployee from "./tools_list/AddEmployee";
import Department from "./department";

const Tools_list = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const [openListDepartment, setOpenListDepartment] = useState(false);
  const [openListPossition, setOpenListPossition] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalType, setModalType] = useState(""); // Thêm state để lưu type
  const [form] = Form.useForm(); // Tạo instance của Form
  const [modalFooter, setModalFooter] = useState(false);
  const handleCancel = () => {
    setOpen(false);
    setModalLoading(false);
  };
  const openModal = (type) => {
    setModalType(type); // Lưu type hiện tại
    if (type === "employee") {
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
          <Form.Item
            name="department"
            label="Bộ phận"
            initialValue={
              user.company.department.length > 0
                ? user.company.department[0].id
                : undefined
            }
          >
            <Select
              placeholder="Chọn một bộ phận"
              options={user.company.department.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="jobtitle"
            label="Chức vụ"
            initialValue={
              user.company.jobtitle.length > 0
                ? user.company.jobtitle[0].id
                : undefined
            }
          >
            <Select
              placeholder="Chọn một bộ phận"
              options={user.company.jobtitle.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
        </Form>
      );
      setModalFooter(
        <Button
          type="primary"
          icon={<i className="fa-solid fa-cloud-arrow-down" />}
          loading={modalLoading}
          onClick={handleSave}
        >
          Lưu lại
        </Button>
      );
    }
    setOpen(true);
  };

  const handleSave = (values) => {
    setModalLoading(true);
    const apiUrl = "/create-employee/";
    const data = { ...values, key: user?.key };
    api
      .post(apiUrl, data, api.getCookie("token"))
      .then((res) => {
        api.get(`/employee/?page_size=10`, user.token).then((res) => {
          setUser((old) => ({
            ...old,
            employee: res.results,
          }));
        });
        message.success("Thêm thành công!");
        setOpen(false);
      })
      .catch((err) => {
        if (err?.response?.data?.Error) {
          message.error(err.response.data.Error);
        } else {
          message.error("Có lỗi xảy ra!");
        }
      })
      .finally(() => {
        setModalLoading(false);
      });
  };

  const [openDepartment, setOpenDepartment] = useState(false);
  const handleSaveDepartment = (values) => {
    setModalLoading(true);
    api
      .post(
        "/create-fxm/",
        { data: values, key: user?.key, func: "department" },
        api.getCookie("token")
      )
      .then((res) => {
        message.success("Thêm bộ phận thành công!");
        setUser((old) => ({
          ...old,
          company: {
            ...old.company,
            department: [res, ...old.company.department],
          },
        }));
        setOpenDepartment(false);
      })
      .catch((er) => {
        message.error(er?.response?.detail ?? "Có lỗi xảy ra!");
      })
      .finally(() => setModalLoading(false));
  };

  const [openPosition, setOpenPosition] = useState(false);
  const handleSavePosition = (values) => {
    setModalLoading(true);
    api
      .post(
        "/create-fxm/",
        { data: values, key: user?.key, func: "possition" },
        api.getCookie("token")
      )
      .then((res) => {
        message.success("Thêm chức vụ thành công!");
        setUser((old) => ({
          ...old,
          company: { ...old.company, jobtitle: [res, ...old.company.jobtitle] },
        }));
        setOpenPosition(false);
      })
      .catch((er) => {
        message.error(er?.response?.detail ?? "Có lỗi xảy ra!");
      })
      .finally(() => setModalLoading(false));
  };
  const deleteDepartment = (Department) => {
    setUser((old) => ({
      ...old,
      company: {
        ...old.company,
        department: old.company.department.filter(
          (oldDepartment) => oldDepartment.id !== Department.id
        ),
      },
    }));
  };
  const updateDepartment = (updatedDepartment) => {
    setUser((old) => ({
      ...old,
      company: {
        ...old.company,
        department: old.company.department.map(
          (oldDepartment) =>
            oldDepartment.id === updatedDepartment.id
              ? { ...oldDepartment, ...updatedDepartment } // Cập nhật thông tin
              : oldDepartment // Giữ nguyên phần tử không cần cập nhật
        ),
      },
    }));
  };
  const deletePossition = (Possition) => {
    setUser((old) => ({
      ...old,
      company: {
        ...old.company,
        jobtitle: old.company.jobtitle.filter(
          (oldJ) => oldJ.id !== Possition.id
        ),
      },
    }));
  };
  const updatePossition = (Possition) => {
    setUser((old) => ({
      ...old,
      company: {
        ...old.company,
        jobtitle: old.company.jobtitle.map(
          (oldJ) =>
            oldJ.id === Possition.id
              ? { ...oldJ, ...Possition } // Cập nhật thông tin
              : oldJ // Giữ nguyên phần tử không cần cập nhật
        ),
      },
    }));
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpenListPossition(true)}>
        Danh sách chức vụ
      </Button>
      <Button type="primary" onClick={() => setOpenListDepartment(true)}>
        Danh sách bộ phận
      </Button>
      <Button type="primary" onClick={() => openModal("employee")}>
        <i className="fa-solid fa-plus"></i> Thêm nhân viên
      </Button>
      <DepartmentModal
        open={openDepartment}
        onCancel={() => setOpenDepartment(false)}
        onSave={handleSaveDepartment}
        loading={modalLoading}
      />
      <PositionModal
        open={openPosition}
        onCancel={() => setOpenPosition(false)}
        onSave={handleSavePosition}
        loading={modalLoading}
      />
      <AddEmployee
        form={form}
        open={open}
        handleCancel={handleCancel}
        modalLoading={modalLoading}
        onSave={handleSave}
        jobtitle={user.company.jobtitle}
        department={user.company.department}
      />
      <ListPossition
        open={openListPossition}
        onCancel={() => setOpenListPossition(false)}
        setOpenPosition={setOpenPosition}
        jobtitle={user.company.jobtitle}
        token={user.token}
        onDelete={deletePossition}
        onEdit={updatePossition}
      />
      <ListDepartment
        open={openListDepartment}
        onCancel={() => setOpenListDepartment(false)}
        setOpenDepartment={setOpenDepartment}
        department={user.company.department}
        token={user.token}
        onDelete={deleteDepartment}
        onEdit={updateDepartment}
      />
    </>
  );
};

export default Tools_list;
