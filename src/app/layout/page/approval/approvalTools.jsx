import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../components/api";
import dayjs from "dayjs";
import { useUser } from "../../../../components/userContext";
import OPpayCard from "../../../../components/payCard";
import { GoAlertFill } from "react-icons/go";
import moment from "moment";

const ApprovalTools = ({ selectedRowKeys, updateList }) => {
  const { user, setUser } = useUser();
  const [form] = Form.useForm(); // Tạo instance của Form
  const [visible, setVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [key, setKey] = useState(0);
  const [loaiYC, setLoaiYC] = useState([]);
  const [ycSelected, setYcSelected] = useState({ need_operator: false });
  const [reasonType, setReasonType] = useState([]);
  const [nguoilaodong, setnguoilaodong] = useState([]);
  const [nguoilaodongP, setnguoilaodongP] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
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
  const handleOpen = () => {
    setKey((prevKey) => prevKey + 1);
    setVisible(true);
    form.setFieldsValue({
      trang_thai: "di_lam",
      ngay_vao_lam: dayjs(new Date().toLocaleDateString(), "YYYY-MM-DD"),
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
        setIsCreate(true);
        api
          .post(
            "/pheduyet/",
            { ...values, date: values.date.format("YYYY-MM-DD") },
            user.token
          )
          .then((res) => {
            message.success("Thêm yêu cầu thành công!");
            updateList();
            setVisible(false);
          })
          .catch((e) => {
            console.log(e);
            message.error(e?.response?.detail ?? "Lỗi khi tạo!");
            setIsCreate(false);
          })
          .finally(() => {
            setIsCreate(false);
          });
      })
      .catch((e) => {
        console.log(e);
        message.error("Thiếu các trường yêu cầu!");
      });
  };
  const handleAction = () => {
    console.log("Xử lý các ID:", selectedRowKeys);
  };
  useEffect(() => {
    setIsAdd(true);
    setIsCreate(false);
    setFileList([]);
    setnguoilaodongP({});
    setYcSelected({ need_operator: false });
    api
      .get("/pheduyet/config/", user.token)
      .then((res) => {
        if (res.phanloai)
          setLoaiYC(res.phanloai.filter((item) => item.typecode !== "Báo ứng"));
        if (res.lydo) setReasonType(res.lydo);
        if (res.nguoilaodong) setnguoilaodong(res.nguoilaodong);
      })
      .catch((er) => {
        console.log(er);
        message.error(e?.response?.detail ?? "Lỗi khi lấy dữ liệu cài đặt!");
      })
      .finally(() => {
        setIsAdd(false);
      });
  }, [visible]);
  return (
    <div className="tools flex">
      <div className="left"></div>
      <div className="flex right ml-auto gap-1">
        {selectedRowKeys.length > 0 && (
          <Button type="primary" onClick={handleAction}>
            Xử lý ({selectedRowKeys.length})
          </Button>
        )}
        <Button
          type="primary"
          onClick={handleOpen}
          icon={<i className="fa-solid fa-plus"></i>}
        >
          Thêm yêu cầu
        </Button>
      </div>
      <Modal
        title="Thêm yêu cầu mới"
        open={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={isCreate}
        loading={isAdd}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
        width={600}
      >
        <div className="flex flex-col gap-1">
          <div className="hint leading-[1.2] bg-[#eef6ff] mb-1 border border-[#7a9abb] rounded-md text-[#274c74] select-none">
            <div className="font-[500] flex items-center gap-1.5 p-1 px-2 pb-1">
              <GoAlertFill className="inline" /> Thêm phê duyệt
            </div>
            <div className="p-1.5 pt-0">
              Tạo yêu cầu thanh toán cho mục đích chung của công ty. Tiền sẽ
              được thanh toán cho người yêu cầu khi mà yêu cầu được phê duyệt.
              <br />
              Báo ứng không nằm trong mục này
            </div>
          </div>
          <Form
            form={form}
            initialValues={{
              trangthai: "di_lam",
              date: moment(),
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 30 }}
          >
            <Form.Item
              label="Loại yêu cầu"
              name="yeucau"
              rules={[
                { required: true, message: "Vui lòng chọn loại yêu cầu!" },
              ]}
            >
              <Select
                placeholder="Chọn loại yêu cầu"
                onChange={(e) => {
                  setYcSelected(loaiYC.find((item) => item.id === e));
                }}
              >
                {loaiYC.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.typecode}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {ycSelected?.need_operator && (
              <Form.Item
                label="Người lao động"
                name="nguoilaodong"
                rules={[
                  {
                    required: ycSelected?.need_operator,
                    message: "Vui lòng chọn người lao động!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn người lao động"
                  onChange={(e) => {
                    setnguoilaodongP(
                      nguoilaodong.find((item) => item.id === e)
                    );
                  }}
                >
                  {nguoilaodong.map((op) => (
                    <Select.Option key={op.id} value={op.id}>
                      {op.ho_ten} ({op.ma_nhanvien})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            {ycSelected?.need_operator && nguoilaodongP?.id && (
              <OPpayCard data={nguoilaodongP} />
            )}
            <Form.Item
              label="Hình thức"
              name="payType"
              rules={[{ required: true, message: "Vui lòng chọn hình thức!" }]}
            >
              <Select allowClear={false} placeholder="Hình thức nhận tiền">
                <Option value="money">Tiền mặt</Option>
                <Option value="bank">Chuyển khoản</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày yêu cầu"
              name="date"
              rules={[{ required: true, message: "Vui lòng chọn ngày ứng!" }]}
            >
              <DatePicker allowClear={false} />
            </Form.Item>
            <Form.Item
              label="Số tiền"
              name="amount"
              rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
            >
              <InputNumber
                min={20000}
                max={2000000}
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
              label="Phân loại"
              name="reasonType"
              rules={[{ required: true, message: "Hãy phân loại lý do!" }]}
            >
              <Select placeholder="Phân loại lý do">
                {reasonType.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.typename}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Lý do" name="reason">
              <Input.TextArea rows={3} placeholder="Chi phí mua giấy A4...." />
            </Form.Item>
            <Upload
              className="uploadPage"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false} // Không upload lên server ngay
            >
              {fileList.length >= 2 ? null : <div>Thêm ảnh</div>}
            </Upload>
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
    </div>
  );
};

export default ApprovalTools;
