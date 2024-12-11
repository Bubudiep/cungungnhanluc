import React from "react";
import { Form, Input, Select, DatePicker, Row, Col } from "antd";
const { TextArea } = Input;

const NewOPForm = ({
  form,
  trangThaiOptions,
  nguoiTuyenOptions,
  congTyOptions,
  nganHangOptions,
  nhaChinhOptions,
  loaiTaiKhoanOptions,
}) => {
  return (
    <Form
      form={form}
      layout="horizontal"
      initialValues={{
        trang_thai: "di_lam",
      }}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 16 }}
    >
      <div className="flex flex-col list-input list-input">
        <Row gutter={16} className="add_Operator">
          <Col span={8}>
            <Form.Item
              name="ho_va_ten"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>
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
            <Form.Item name="que_quan" label="Quên quán">
              <Input placeholder="Nhập quê quán" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ngay_sinh" label="Ngày sinh">
              <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className="h3">Thông tin đi làm</div>
      <div className="flex flex-col list-input">
        <Row gutter={16} className="add_Operator">
          <Col span={8}>
            <Form.Item
              name="trang_thai"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select
                placeholder="Chọn trạng thái"
                options={trangThaiOptions}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="nguoi_tuyen" label="Người tuyển">
              <Select
                placeholder="Chọn người tuyển"
                options={nguoiTuyenOptions}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ma_nv" label="Mã NV">
              <Input placeholder="Nhập mã nhân viên" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="add_Operator">
          <Col span={8}>
            <Form.Item name="ten_goc" label="Tên chính xác">
              <Input placeholder="Nhập tên chính xác" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="cong_ty" label="Công ty">
              <Select placeholder="Chọn công ty" options={congTyOptions} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ngay_vao_lam" label="Ngày vào làm">
              <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày" />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className="h3">Thông tin thanh toán</div>
      <div className="flex flex-col list-input">
        <Row gutter={16} className="add_Operator">
          <Col span={8}>
            <Form.Item name="ngan_hang" label="Ngân hàng">
              <Select placeholder="Chọn ngân hàng" options={nganHangOptions} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="so_tai_khoan" label="Số tài khoản">
              <Input placeholder="Nhập số tài khoản" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="chu_tai_khoan" label="Chủ tài khoản">
              <Input placeholder="Nhập chủ tài khoản" />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className="h3">Thông tin khác</div>
      <div className="flex flex-col list-input">
        <Row gutter={16} className="add_Operator">
          <Col span={8}>
            <Form.Item name="loai_tai_khoan" label="Loại tài khoản">
              <Select
                placeholder="Chọn loại tài khoản"
                options={loaiTaiKhoanOptions}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="nha_chinh" label="Nhà chính">
              <Select placeholder="Chọn nhà chính" options={nhaChinhOptions} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ghi_chu" label="Ghi chú">
              <TextArea rows={2} placeholder="Nhập ghi chú" />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default NewOPForm;
