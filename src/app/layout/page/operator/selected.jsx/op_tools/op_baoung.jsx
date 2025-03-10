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
  const [banksList, setBanksList] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [banktype, setBanktype] = useState("opertor");
  const [paytype, setPaytype] = useState("money");
  const [QRdata, setQRdata] = useState(200000);
  const [QRdataUser, setQRdataUser] = useState(200000);
  const [sotienBaoung, setSotienBaoung] = useState(200000);
  useEffect(() => {
    const fetchBanks = async () => {
      const nht = await api.banks();
      setBanksList(nht.data);
    };
    fetchBanks();
  }, []);
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
              nguoiThuhuong: values.owner,
              hinhthucThanhtoan: values.payType,
              khacStk: values.other_stk,
              khacNganhang: values.other_bank,
              khacCtk: values.other_ctk,
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
            message.success("Báo ứng thành công!");
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
    console.log(seletedUser);
  }, [isModalOpen]);
  return (
    <>
      <div className="item" onClick={() => setIsModalOpen(true)}>
        <div className="left">
          <div className="icon">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="name">Báo ứng</div>
          <div className="value">
            {seletedUser?.user?.baoung &&
              seletedUser?.user?.baoung
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
            {seletedUser?.user?.baoung &&
              seletedUser?.user?.baoung
                .filter((item) => item.status === "pending")
                .reduce((sum, item) => sum + parseFloat(item.amount), 0) >
                0 && (
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
            {seletedUser?.user?.baoung &&
              seletedUser?.user?.baoung
                .filter((item) => item.retrieve_status === "not")
                .reduce((sum, item) => sum + parseFloat(item.amount), 0) >
                0 && (
                <div className="bg-red-100 flex-1 border border-red-700 rounded-md overflow-hidden">
                  <div className="flex gap-2 items-center text bg-red-700 text-[#fff] font-[500] p-2 py-1">
                    <GoAlertFill />
                    Số tiền đã ứng chưa thu hồi
                  </div>
                  <div className="p-1 text-[20px] font-[500] text-center">
                    {seletedUser?.user?.baoung
                      .filter((item) => item.retrieve_status === "not")
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
              payType: paytype,
              owner: "opertor",
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
                <Option value="other">Người khác (nhận hộ)</Option>
                <Option value="staff">Người tuyển</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Hình thức"
              name="payType"
              rules={[{ required: true, message: "Vui lòng chọn hình thức!" }]}
            >
              <Select
                allowClear={false}
                placeholder="Hình thức nhận báo ứng"
                onChange={(e) => {
                  setPaytype(e);
                }}
              >
                <Option value="money">Tiền mặt</Option>
                <Option value="bank">Chuyển khoản</Option>
              </Select>
            </Form.Item>
            {paytype === "bank" && (
              <>
                {banktype === "other" && (
                  <div className="flex flex-col gap-0 p-1 bg-[#e9f2ff] border-l-[#368dfd] border-l-4 shadow shadow-black/10 mb-2 ml-20 pb-0">
                    <Form.Item
                      label="Số tài khoản"
                      name="other_stk"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số tài khoản!",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập số tài khoản" />
                    </Form.Item>
                    <Form.Item
                      label="Chủ tài khoản"
                      name="other_ctk"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập chủ tài khoản!",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập chủ tài khoản" />
                    </Form.Item>
                    <Form.Item
                      label="Ngân hàng"
                      name="other_bank"
                      rules={[
                        { required: true, message: "Vui lòng chọn ngân hàng!" },
                      ]}
                    >
                      <Select style={{ width: "100%" }}>
                        <Select.Option value="">Chọn ngân hàng</Select.Option>
                        {banksList.map((bank) => (
                          <Select.Option key={bank.bin} value={bank.bin}>
                            {bank.short_name} - {bank.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                )}
                {banktype === "opertor" && (
                  <div className="ml-12">
                    <OPpayCard
                      data={seletedUser.user}
                      onUpdate={(res) => {
                        setseletedUser((old) => ({ ...old, user: res }));
                        const newArray = opList.results.map((item) =>
                          item.id === res.id ? { ...item, ...res } : item
                        );
                        setOpList((old) => ({ ...old, results: newArray }));
                      }}
                    />
                  </div>
                )}
              </>
            )}
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
            <Form.Item label="Ghi chú" name="reason">
              <Input.TextArea
                rows={3}
                placeholder="Ứng tiền trọ, tiền ăn...."
              />
            </Form.Item>
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
