import {
  Button,
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

const ApprovalTools = () => {
  const { user, setUser } = useUser();
  const [form] = Form.useForm(); // Tạo instance của Form
  const [visible, setVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
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
      })
      .catch((e) => {
        console.log(e);
        message.error("Thiếu các trường yêu cầu!");
      });
  };
  useEffect(() => {
    setFileList([]);
    setnguoilaodongP({});
    setYcSelected({ need_operator: false });
    api
      .get("/pheduyet/config/", user.token)
      .then((res) => {
        if (res.phanloai) setLoaiYC(res.phanloai);
        if (res.lydo) setReasonType(res.lydo);
        if (res.nguoilaodong) setnguoilaodong(res.nguoilaodong);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {});
  }, [visible]);
  return (
    <div className="tools flex">
      <div className="left"></div>
      <div className="right ml-auto">
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
        loading={isAdd}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
        width={600}
      >
        <div className="flex flex-col gap-1">
          <Form
            form={form}
            initialValues={{
              trangthai: "di_lam",
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
                  <Option key={type.id} value={type.id}>
                    {type.typecode}
                  </Option>
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
                    <Option key={op.id} value={op.id}>
                      {op.ho_ten} ({op.ma_nhanvien})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            {ycSelected?.need_operator && nguoilaodongP?.id && (
              <OPpayCard data={nguoilaodongP} />
            )}
            <Form.Item
              label="Số tiền"
              name="amount"
              rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
            >
              <InputNumber
                min={200000}
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
                  <Option key={type.id} value={type.id}>
                    {type.typename}
                  </Option>
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
