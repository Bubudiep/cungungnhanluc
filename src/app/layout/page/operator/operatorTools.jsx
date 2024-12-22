import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
} from "antd";
import NewOPForm from "./newOPForm";
import api from "../../../../components/api";
import dayjs from "dayjs";
const { TextArea } = Input;
const OperatorTools = ({ user, setOpList }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const handleOpen = () => {
    setVisible(true);
    form.setFieldsValue({
      trang_thai: "di_lam",
      ngay_vao_lam: dayjs(new Date().toISOString().split("T")[0], "YYYY-MM-DD"),
    });
  };
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        const revalues = {
          ...values,
          ngay_vao_lam: values.ngay_vao_lam
            ? dayjs(values.ngay_vao_lam).format("YYYY-MM-DD")
            : null,
          ngaysinh: values.ngaysinh
            ? dayjs(values.ngaysinh).format("YYYY-MM-DD")
            : null,
        };
        setIsAdd(true);
        api
          .post("/operators/", revalues, user.token)
          .then((res) => {
            console.log(res);
            setOpList((old) => ({
              ...old,
              results: [res, ...old.results],
            }));
            message.success("Đã thêm người lao động mới!");
          })
          .catch((e) => {
            message.error(e?.response?.data?.detail ?? "Lỗi khi thêm!");
          })
          .finally(setIsAdd(false));
        // setVisible(false);
        // form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        message.error("Thiếu các trường yêu cầu!");
      });
  };
  return (
    <div className="tool-list">
      <div className="left">
        <Button
          type="primary"
          onClick={handleOpen}
          icon={<i className="fa-solid fa-plus"></i>}
        >
          Thêm NLĐ
        </Button>
      </div>
      <Modal
        title="Thêm người lào động"
        open={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        loading={isAdd}
        okText="Lưu"
        cancelText="Hủy"
        width={1000}
      >
        <div className="flex flex-col gap-1">
          <NewOPForm form={form} user={user} />
        </div>
      </Modal>
    </div>
  );
};

export default OperatorTools;
