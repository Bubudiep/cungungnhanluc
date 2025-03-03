import React, { useEffect, useRef, useState } from "react";
import api from "../../../../../../components/api";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import OPpayCard from "../../../../../../components/payCard";
import { QRCode } from "react-qrcode-logo";
import moment from "moment";
import dayjs from "dayjs";
import { GoAlertFill } from "react-icons/go";
const { Option } = Select;
const Op_baoung = ({
  user,
  seletedUser,
  setseletedUser,
  opList,
  setOpList,
}) => {
  const qrRef = useRef();
  const [form] = Form.useForm(); // Tạo instance của Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [banktype, setBanktype] = useState(false);
  const [QRdata, setQRdata] = useState(200000);
  const [QRdataUser, setQRdataUser] = useState(200000);
  const [sotienBaoung, setSotienBaoung] = useState(200000);
  const handlePreview = async (file) => {
    file.preview = await getBase64(file.originFileObj);
    setPreviewImage(file.preview);
    setPreviewOpen(true);
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleChange = ({ fileList }) => setFileList(fileList);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleBaoung = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        api
          .post(
            `/operators/${seletedUser.user.id}/baoung/`,
            {
              soTien: values.amount,
              lyDo: values.reason,
              ngayUng: values.date.format("YYYY-MM-DD"),
            },
            user.token
          )
          .then((res) => {
            setseletedUser((old) => ({
              ...old,
              user: res,
            }));
            const newArray = opList.results.map((item) =>
              item.id === res.id ? { ...item, ...res } : item
            );
            setOpList((old) => ({ ...old, results: newArray }));
            setIsModalOpen(false);
            message.success("Đã ghi nhận đi làm thành công!");
          })
          .catch((er) => {
            message.error(er.response?.data?.detail ?? "Lỗi: không xác định!");
          });
      })
      .catch((e) => {
        console.log(e);
        message.error("Thiếu các trường yêu cầu!");
      });
  };
  useEffect(() => {
    console.log(user);
    if (seletedUser?.user?.nganhang && seletedUser?.user?.so_taikhoan) {
      const maQR = api.taoMaQR(
        seletedUser?.user?.so_taikhoan,
        seletedUser?.user?.nganhang,
        sotienBaoung,
        `${api
          .removeSpecial(seletedUser?.user?.ho_ten)
          .replaceAll(" ", "")}_baoung_${sotienBaoung}`
      );
      setQRdata(maQR);
    }
    if (user?.profile?.bank_number && user?.profile?.bank) {
      const maQRUser = api.taoMaQR(
        user?.profile?.bank_number,
        user?.profile?.bank,
        sotienBaoung,
        `${api
          .removeSpecial(seletedUser?.user?.ho_ten)
          .replaceAll(" ", "")}_baoung_${sotienBaoung}`
      );
      console.log(maQRUser);
      setQRdataUser(maQRUser);
    }
  }, [isModalOpen, sotienBaoung]);
  return (
    <>
      <div className="item" onClick={() => setIsModalOpen(true)}>
        <div className="left">
          <div className="icon">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="name">Báo ứng</div>
          <div className="value">
            {seletedUser?.user?.baoung
              .filter((item) => item.status === "pending")
              .reduce((sum, item) => sum + parseFloat(item.amount), 0)
              .toLocaleString()}{" "}
            VNĐ
          </div>
        </div>
      </div>
      <Modal
        className="!w-auto max-w-[700px]"
        title={`Báo ứng cho ${seletedUser?.user?.ho_ten}`}
        open={isModalOpen}
        onOk={handleBaoung}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="flex flex-col gap-1">
          <div className="hint leading-[1.2] bg-[#eef6ff] mb-1 border border-[#7a9abb] rounded-md text-[#274c74] select-none">
            <div className="font-[500] flex items-center gap-1.5 p-1 px-2 pb-1">
              <GoAlertFill className="inline" /> Báo ứng
            </div>
            <div className="p-1.5 pt-0">
              Bạn sẽ cho người lao động ứng trước một khoản tiền nhất định, sau
              đó kế toán sẽ kiểm tra và phê duyệt chuyển khoản lại cho bạn!
            </div>
          </div>
          <div className="flex gap-2">
            {seletedUser?.user?.baoung
              .filter((item) => item.status === "pending")
              .reduce((sum, item) => sum + parseFloat(item.amount), 0) > 0 && (
              <div className="bg-red-100 flex-1 border border-[#d18125] rounded-md overflow-hidden">
                <div className="flex gap-2 items-center text bg-[#d18125] text-[#fff] font-[500] p-2 py-1">
                  <GoAlertFill />
                  Số tiền chưa giải ngân
                </div>
                <div className="p-1 text-[20px] font-[500] text-center text-[#ac4922]">
                  {seletedUser?.user?.baoung
                    .filter((item) => item.status === "pending")
                    .reduce((sum, item) => sum + parseFloat(item.amount), 0)
                    .toLocaleString()}{" "}
                  VNĐ
                </div>
              </div>
            )}
            {seletedUser?.user?.baoung
              .filter((item) => item.retrieve_status === "not_retrieved")
              .reduce((sum, item) => sum + parseFloat(item.amount), 0) > 0 && (
              <div className="bg-red-100 flex-1 border border-red-700 rounded-md overflow-hidden">
                <div className="flex gap-2 items-center text bg-red-700 text-[#fff] font-[500] p-2 py-1">
                  <GoAlertFill />
                  Số tiền đang ứng chưa thu hồi
                </div>
                <div className="p-1 text-[20px] font-[500] text-center">
                  {seletedUser?.user?.baoung
                    .filter((item) => item.retrieve_status === "not_retrieved")
                    .reduce((sum, item) => sum + parseFloat(item.amount), 0)
                    .toLocaleString()}{" "}
                  VNĐ
                </div>
              </div>
            )}
          </div>
          <Form
            form={form}
            initialValues={{
              amount: 200000,
              date: dayjs(),
              type: "pending",
            }}
            labelCol={{ span: 5 }}
          >
            <Form.Item
              label="Thụ hưởng"
              name="owner"
              rules={[{ required: true, message: "Vui lòng chọn ngày ứng!" }]}
            >
              <Select
                allowClear={false}
                placeholder="Chọn người thụ hưởng"
                onChange={(e) => {
                  setBanktype(e);
                }}
              >
                <Option value="opertor">Người lao động</Option>
                <Option value="staff">Người tuyển</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>
            <div className="ml-12">
              {banktype === "staff" ? (
                <OPpayCard
                  data={{
                    so_taikhoan: user.profile.bank_number,
                    avatar: user.profile.avatar,
                    nganhang: user.profile.bank,
                    ho_ten: user.profile.full_name,
                    chu_taikhoan: user.profile.full_name,
                  }}
                  qrCode={
                    user.profile.bank_number && (
                      <div className="flex ml-auto justify-center items-center mr-2">
                        <QRCode
                          value={QRdataUser} // Chuỗi muốn mã hóa
                          size={150} // Kích thước mã QR
                          ecLevel="L"
                          qrStyle="dots" // Kiểu QR ("squares" hoặc "dots")
                          fgColor="#517fc4" // Màu QR
                          eyeColor="#2678f3e0" // Màu của các ô vuông lớn (QR eyes)
                          bgColor="transparent" // Màu nền QR
                          eyeRadius={[5, 5, 5, 5]}
                          quietZone={10} // Vùng trắng xung quanh QR
                        />
                      </div>
                    )
                  }
                />
              ) : banktype === "opertor" ? (
                <OPpayCard
                  data={seletedUser.user}
                  qrCode={
                    seletedUser.user.nganhang && (
                      <div className="flex ml-auto justify-center items-center mr-2">
                        <QRCode
                          value={QRdata} // Chuỗi muốn mã hóa
                          size={150} // Kích thước mã QR
                          ecLevel="L"
                          qrStyle="dots" // Kiểu QR ("squares" hoặc "dots")
                          fgColor="#517fc4" // Màu QR
                          eyeColor="#2678f3e0" // Màu của các ô vuông lớn (QR eyes)
                          bgColor="transparent" // Màu nền QR
                          eyeRadius={[5, 5, 5, 5]}
                          quietZone={10} // Vùng trắng xung quanh QR
                        />
                      </div>
                    )
                  }
                />
              ) : (
                <></>
              )}
            </div>
            <Form.Item
              label="Số tiền"
              name="amount"
              rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
            >
              <InputNumber
                min={200000}
                max={2000000}
                step={100000}
                onChange={(e) => {
                  setSotienBaoung(e);
                }}
                style={{ width: "100%" }}
                placeholder="Từ 200.000 đến 2.000.000"
                formatter={(value) =>
                  value
                    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : ""
                }
                parser={(value) => value.replace(/\./g, "")} // Xóa dấu chấm khi nhập lại số
              />
            </Form.Item>
            <Form.Item
              label="Ngày ứng"
              name="date"
              rules={[{ required: true, message: "Vui lòng chọn ngày ứng!" }]}
            >
              <DatePicker allowClear={false} />
            </Form.Item>
            {/* <Form.Item
              label="Phân loại"
              name="type"
              rules={[{ required: true, message: "Vui lòng chọn ngày ứng!" }]}
            >
              <Select allowClear={false}>
                <Option value="pending">Kế toán giải ngân</Option>
                <Option value="completed">Người tuyển ứng trước cho NLĐ</Option>
              </Select>
            </Form.Item> */}
            <Form.Item label="Ghi chú" name="reason">
              <Input.TextArea
                rows={3}
                placeholder="Ứng tiền trọ, tiền ăn...."
              />
            </Form.Item>
            {/* <Upload
              className="uploadPage"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false} // Không upload lên server ngay
            >
              {fileList.length >= 2 ? null : <div>Thêm ảnh</div>}
            </Upload> */}
          </Form>
        </div>
      </Modal>
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Op_baoung;
