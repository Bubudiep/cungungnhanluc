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
import jsQR from "jsqr";
import api from "../../../../components/api";
import dayjs from "dayjs";
const { TextArea } = Input;

const OperatorTools = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const canvasRef = useRef(null);

  const handleOpen = () => {
    setVisible(true);
    form.setFieldsValue({ trang_thai: "di_lam" });
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
        setVisible(false);
        // form.resetFields();
      })
      .catch((e) => {
        message.error("Thiếu các trường yêu cầu!");
      });
  };
  const trangThaiOptions = [
    { label: "Đi làm", value: "di_lam" },
    { label: "Chưa đi làm", value: "chua_di_lam" },
    { label: "Dự kiến", value: "du_kien" },
  ];
  const [nganHangOptions, setNganHangOptions] = useState([]);
  const nguoiTuyenOptions = [
    { label: "Người tuyển A", value: "recruiter_a" },
    { label: "Người tuyển B", value: "recruiter_b" },
  ];
  const nhaChinhOptions = [
    { label: "Nhà chính A", value: "nha_chinh_a" },
    { label: "Nhà chính B", value: "nha_chinh_b" },
    { label: "Nhà chính C", value: "nha_chinh_c" },
  ];
  const congTyOptions = [
    { label: "Công ty A", value: "cong_ty_a" },
    { label: "Công ty B", value: "cong_ty_b" },
    { label: "Công ty C", value: "cong_ty_c" },
  ];
  const loaiTaiKhoanOptions = [
    { label: "Tài khoản cá nhân", value: "tai_khoan_ca_nhan" },
    { label: "Tài khoản người thân", value: "tai_khoan_nguoi_than" },
    { label: "Khác", value: "tai_khoan_khac" },
  ];
  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Vui lòng chọn file ảnh!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };
  const handleChange = (info) => {
    if (info.fileList && info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      handleReadQR(file);
    }
  };
  const handleReadQR = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          message.success("Đã đọc được dữ liệu QR!");
          console.log(code.data);
          const cccdData = api.parseCCCDString(code.data);
          if (cccdData) {
            form.setFieldsValue({
              so_cccd: cccdData.so_cccd,
              ho_va_ten: cccdData.ho_va_ten,
              ngay_sinh: dayjs(cccdData.ngay_sinh, "YYYY-MM-DD"),
              gioi_tinh: cccdData.gioi_tinh,
              que_quan: cccdData.que_quan,
            });
          }
        } else {
          message.error("Không tìm thấy mã QR trong ảnh!");
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const loadBanks = async () => {
      const banks = await api.banks();
      const options = banks.data.map((bank) => ({
        label: bank.code + " - " + bank.name,
        value: bank.bin, // Tùy chọn value là short_name hoặc code
      }));
      setNganHangOptions(options);
    };
    loadBanks();
  }, []);
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
        okText="Lưu"
        cancelText="Hủy"
        width={1000}
      >
        <div className="flex flex-col gap-1">
          <div className="h3">
            Thông tin người lao động
            <div className="ml-auto flex gap-2 items-center">
              <Upload
                beforeUpload={handleBeforeUpload}
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                accept="image/*"
              >
                <Button icon={<i className="fa-solid fa-qrcode"></i>}>
                  Upload ảnh CCCD
                </Button>
              </Upload>
            </div>
          </div>
          <NewOPForm
            form={form}
            trangThaiOptions={trangThaiOptions}
            nguoiTuyenOptions={nguoiTuyenOptions}
            congTyOptions={congTyOptions}
            nganHangOptions={nganHangOptions}
            nhaChinhOptions={nhaChinhOptions}
            loaiTaiKhoanOptions={loaiTaiKhoanOptions}
          />
        </div>
      </Modal>
      {/* Canvas ẩn để xử lý ảnh khi quét QR */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default OperatorTools;
