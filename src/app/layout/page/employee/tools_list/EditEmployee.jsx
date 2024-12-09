import { Button, Form, Input, message, Modal, Select, Switch } from "antd";
import React, { useState } from "react";
import api from "../../../../../components/api";

const EditEmployee = ({ open, onCancel, user, setUser }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [newPassword, setNewPassword] = useState(null);
  const [listPossition, setListPossition] = useState(null);
  const [listDepartment, setListDepartment] = useState(null);
  const handleSaveEmployee = () => {
    form
      .validateFields()
      .then((values) => {
        if (!user?.user?.isSuperAdmin && values.isAdmin) {
          message.error(
            "Chỉ SuperAdmin mới có quyền đặt tài khoản này thành Admin!"
          );
          return;
        }
        setSaving(true);
        const new_value = {
          user: {
            username: values.username,
          },
          name: values.name,
          isActive: values.isActive,
          isAdmin: values.isAdmin,
          possition: values.possition,
          department: values.department,
        };
        api
          .patch(`/employee_account/${open.id}/`, new_value, user.token)
          .then((res) => {
            setTimeout(() => {
              setUser((old) => ({
                ...old,
                employee: old.employee.map(
                  (oldJ) =>
                    oldJ.id === res.id
                      ? { ...oldJ, ...res } // Cập nhật thông tin
                      : oldJ // Giữ nguyên phần tử không cần cập nhật
                ),
              }));
              message.success("Đã lưu thông tin tài khoản!");
              setSaving(false);
            }, 500);
          })
          .catch((er) => {
            message.error(er?.response?.detail ?? "Phát sinh lỗi!");
            setSaving(false);
          });
      })
      .catch((info) => {
        message.error("Vui lòng kiểm tra lại thông tin!");
      });
  };
  const generateRandomPassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };
  const handleResetPassword = () => {
    setResetting(true);
    const password = generateRandomPassword();
    setTimeout(() => {
      setNewPassword(password);
      api
        .patch(
          `/employee_account/${open.id}/`,
          { user: { password: password } },
          user.token
        )
        .then((res) => {
          setUser((old) => ({
            ...old,
            employee: old.employee.map(
              (oldJ) =>
                oldJ.id === res.id
                  ? { ...oldJ, ...res } // Cập nhật thông tin
                  : oldJ // Giữ nguyên phần tử không cần cập nhật
            ),
          }));
          message.success("Đã tạo mật khẩu mới!");
          setResetting(false);
        })
        .catch((er) => {
          message.error(er?.response?.detail ?? "Phát sinh lỗi!");
          setResetting(false);
        });
    }, 500);
  };
  // Gán dữ liệu ban đầu vào form khi mở modal
  React.useEffect(() => {
    setListDepartment(
      user.company.department.map((dpm) => ({
        label: dpm.name, // Tùy chỉnh hiển thị
        value: dpm.id,
      }))
    );
    setListPossition(
      user.company.jobtitle.map((dpm) => ({
        label: dpm.name, // Tùy chỉnh hiển thị
        value: dpm.id,
      }))
    );
    if (open) {
      form.setFieldsValue({
        name: open.name,
        username: open.username,
        isActive: open.isActive,
        isAdmin: open.isAdmin,
        department: open.department,
        possition: open.possition,
      });
    }
  }, [open]);

  const copyToClipboard = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword).then(() => {
        message.success("Đã sao chép mật khẩu vào clipboard!");
      });
    }
  };

  return (
    <Modal
      title={`Cập nhập tài khoản ${open?.name}`}
      open={!!open}
      onCancel={() => {
        setNewPassword(false);
        onCancel();
      }}
      footer={[
        <Button
          key="reset-password"
          danger
          onClick={handleResetPassword}
          loading={resetting}
        >
          Đặt lại mật khẩu
        </Button>,
        <Button
          key="save"
          type="primary"
          icon={<i className="fa-solid fa-cloud-arrow-down"></i>}
          onClick={handleSaveEmployee}
          loading={saving}
        >
          Lưu lại
        </Button>,
      ]}
      className="custom-modal"
    >
      <Form
        form={form}
        layout="vertical"
        name="edit_employee"
        initialValues={{
          name: open?.name,
          username: open?.username,
          isActive: open?.isActive,
          isAdmin: open?.isAdmin,
          department: open?.department,
          possition: open?.possition,
        }}
      >
        <Form.Item
          name="name"
          label="Mã nhân viên"
          rules={[{ required: true, message: "Tên không được để trống!" }]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            { required: true, message: "Tên đăng nhập không được để trống!" },
          ]}
        >
          <Input placeholder="Nhập tên đăng nhập" />
        </Form.Item>
        <Form.Item name="department" label="Bộ phận">
          <Select
            showSearch
            placeholder="Chọn nhân viên"
            optionFilterProp="label"
            style={{
              width: 220,
            }}
            options={listDepartment}
          />
        </Form.Item>
        <Form.Item name="possition" label="Chức vụ">
          <Select
            showSearch
            placeholder="Chọn nhân viên"
            optionFilterProp="label"
            style={{
              width: 220,
            }}
            options={listPossition}
          />
        </Form.Item>
        <Form.Item name="isActive" label="Hoạt động" valuePropName="checked">
          <Switch />
        </Form.Item>
        {user?.user?.isSuperAdmin && (
          <Form.Item
            name="isAdmin"
            label="Quản trị viên"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        )}
      </Form>

      {newPassword && (
        <div style={{ marginTop: "20px" }}>
          <h4>Mật khẩu mới</h4>
          <Input.Group compact>
            <Input
              value={newPassword}
              readOnly
              icon={<i className="fa-regular fa-copy"></i>}
              style={{ width: "calc(100% - 100px)" }}
            />
            <Button type="primary" onClick={copyToClipboard}>
              Sao chép
            </Button>
          </Input.Group>
        </div>
      )}
    </Modal>
  );
};

export default EditEmployee;
