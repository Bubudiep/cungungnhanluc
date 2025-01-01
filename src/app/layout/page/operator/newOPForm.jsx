import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Upload,
  message,
  Button,
} from "antd";
import jsQR from "jsqr";
import dayjs from "dayjs";
import api from "../../../../components/api";
import { useUser } from "../../../../components/userContext";
const { TextArea } = Input;

const NewOPForm = ({ form, user }) => {
  const [fileListFront, setFileListFront] = useState([]);
  const [fileListAvatar, setFileListAvatar] = useState([]);
  const [fileListBack, setFileListBack] = useState([]);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [readQR, setReadQR] = useState(false);
  const trangThaiOptions = [
    { label: "Đi làm", value: "di_lam" },
    { label: "Chưa đi làm", value: "chua_di_lam" },
    { label: "Dự kiến", value: "du_kien" },
  ];
  const [nganHangOptions, setNganHangOptions] = useState([]);
  const [nguoiTuyenOptions, setnguoiTuyenOptions] = useState([]);
  const [nhaChinhOptions, setnhaChinhOptions] = useState([]);
  const [congTyOptions, setcongTyOptions] = useState([]);
  const loaiTaiKhoanOptions = [
    { label: "Tài khoản cá nhân", value: "ca_nhan" },
    { label: "Tài khoản người thân", value: "nguoi_than" },
    { label: "Khác (Nhập ghi chú)", value: "khac" },
  ];
  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Vui lòng chọn file ảnh!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };
  const handleUploadFront = async (info) => {
    if (info.fileList && info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      handleReadQR(file);
      setFileListFront([info.fileList[0]]);
      let base64 = await api.convertToBase64(file);
      const img = new Image();
      img.src = base64;
      img.onload = async () => {
        const resizedBase64 = await api.resizeImage(
          img,
          600,
          "image/jpeg",
          0.9
        );
        console.log(resizedBase64);
        setPreviewFront(resizedBase64);
      };
    }
  };

  const handleUploadAvatar = (info) => {
    if (info.fileList && info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setFileListAvatar([info.fileList[0]]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadBack = async (info) => {
    if (info.fileList && info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setFileListBack([info.fileList[0]]);
      let base64 = await api.convertToBase64(file);
      const img = new Image();
      img.src = base64;
      img.onload = async () => {
        const resizedBase64 = await api.resizeImage(img, 500);
        console.log(resizedBase64);
        setPreviewBack(resizedBase64);
      };
    }
  };
  const handleChangeFile = (info) => {
    if (info.fileList && info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      handleReadQR(file);
    }
  };
  const handleReadQR = async (file) => {
    if (!file) return;
    setReadQR(true);
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        // Lấy dữ liệu ảnh từ canvas
        const processImage = (canvas, context) => {
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          setReadQR(false);
          return code;
        };
        // Đọc lần đầu
        let code = processImage(canvas, context);
        if (code) {
          const cccdData = api.parseCCCDString(code.data);
          if (cccdData) {
            console.log(cccdData);
            form.setFieldsValue({
              so_cccd: cccdData.so_cccd,
              ho_ten: cccdData.ho_va_ten,
              ngaysinh: dayjs(cccdData.ngay_sinh, "YYYY-MM-DD"),
              gioi_tinh: cccdData.gioi_tinh,
              quequan: cccdData.que_quan,
            });
          } else {
            message.error("Không phải mã QR CCCD");
          }
        } else {
          const zoomedCanvas = api.zoomAndCrop(canvas, context);
          const zoomedContext = zoomedCanvas.getContext("2d");
          // Đọc lại
          code = processImage(zoomedCanvas, zoomedContext);
          if (code) {
            const cccdData = api.parseCCCDString(code.data);
            if (cccdData) {
              console.log(cccdData);
              form.setFieldsValue({
                so_cccd: cccdData.so_cccd,
                ho_ten: cccdData.ho_va_ten,
                ngaysinh: dayjs(cccdData.ngay_sinh, "YYYY-MM-DD"),
                gioi_tinh: cccdData.gioi_tinh,
                quequan: cccdData.que_quan,
              });
            } else {
              message.error("Không phải mã QR CCCD");
            }
          } else {
            message.error("Không tìm thấy mã QR sau khi phóng to và cắt viền!");
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    api.get("/company_sublist/", user.token).then((res) => {
      setnguoiTuyenOptions(
        res.results[0].staff.data.map((staff) => ({
          value: staff.id,
          label: `${staff.name} ${staff.fullname ? `(${staff.fullname})` : ""}`,
        }))
      );
      setnhaChinhOptions(
        res.results[0].supplier.data.map((sup) => ({
          value: sup.id,
          label: `${sup.name} ${sup.fullname ? `(${sup.fullname})` : ""}`,
        }))
      );
      setcongTyOptions(
        res.results[0].custommer.data.map((cus) => ({
          value: cus.id,
          label: `${cus.name} ${cus.fullname ? `(${cus.fullname})` : ""}`,
        }))
      );
    });
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
    <>
      <div className="h3">
        Thông tin trong công ty của bạn{" "}
        <div className="ml-1 font-normal text-red-500">
          (*) Không phải công ty khách hàng
        </div>
      </div>
      <Form
        form={form}
        layout="horizontal"
        initialValues={{
          trangthai: "di_lam",
        }}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
      >
        <div className="flex flex-col list-input">
          <Row gutter={16} className="add_Operator items-start">
            <Col span={8} className="flex flex-col flex-1">
              <div className="avatar flex justify-center">
                <div className="box">
                  <img src={previewAvatar} alt="Ảnh 3x4" />
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    fileList={fileListAvatar}
                    onChange={handleUploadAvatar}
                    maxCount={1}
                    accept="image/*"
                  >
                    <Button>
                      <i className="fa-solid fa-camera"></i>
                    </Button>
                  </Upload>
                </div>
              </div>
              <Form.Item
                name="ma_nhanvien"
                label="Mã nhân viên"
                className="!my-1"
                rules={[
                  { required: true, message: "Vui lòng nhập mã nhân viên" },
                ]}
              >
                <Input placeholder="Nhập mã nhân viên" />
              </Form.Item>
            </Col>
            <Col span={8} className="flex flex-col flex-1">
              <div className="img-box">
                <div>
                  <img src={previewFront} alt="Ảnh CCCD mặt trước" />
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    fileList={fileListFront}
                    onChange={handleUploadFront}
                    maxCount={1}
                    accept="image/*"
                  >
                    <Button>
                      <i className="fa-solid fa-camera"></i>
                    </Button>
                  </Upload>
                </div>
              </div>
            </Col>
            <Col span={8} className="flex flex-col flex-1">
              <div className="img-box">
                <div>
                  <img src={previewBack} alt="Ảnh CCCD mặt sau" />
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    fileList={fileListBack}
                    onChange={handleUploadBack}
                    maxCount={1}
                    accept="image/*"
                  >
                    <Button>
                      <i className="fa-solid fa-camera"></i>
                    </Button>
                  </Upload>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="add_Operator">
            <Col span={8}>
              <Form.Item
                name="sdt"
                label="SĐT"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="ho_ten"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="so_cccd" label="Số CCCD">
                <Input placeholder="Nhập số căn cước công dân" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className="add_Operator">
            <Col span={8}>
              <Form.Item name="gioi_tinh" label="Giới tính">
                <Input placeholder="Nam/Nữ..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="quequan" label="Quên quán">
                <Input placeholder="Nhập quê quán" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="ngaysinh" label="Ngày sinh">
                <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="h3">Thông tin thanh toán</div>
        <div className="flex flex-col list-input">
          <Row gutter={16} className="add_Operator">
            <Col span={8}>
              <Form.Item name="nganhang" label="Ngân hàng">
                <Select
                  placeholder="Chọn ngân hàng"
                  options={nganHangOptions}
                  allowClear
                  showSearch={true}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="so_taikhoan" label="Số tài khoản">
                <Input placeholder="Nhập số tài khoản" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="chu_taikhoan" label="Chủ tài khoản">
                <Input placeholder="Nhập chủ tài khoản" />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="h3">Thông tin khác</div>
        <div className="flex flex-col list-input">
          <Row gutter={16} className="add_Operator">
            <Col span={8}>
              <Form.Item name="ghichu_taikhoan" label="Loại tài khoản">
                <Select
                  placeholder="Chọn loại tài khoản"
                  options={loaiTaiKhoanOptions}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="ten_goc" label="Tên chính xác">
                <Input placeholder="Nhập tên chính xác" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="ghichu" label="Ghi chú">
                <TextArea rows={2} placeholder="Nhập ghi chú" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default NewOPForm;
