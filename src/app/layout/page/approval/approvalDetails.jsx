import { Modal, Button, Descriptions, message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaCheck, FaCopy, FaXmark } from "react-icons/fa6";
import OPpayCard from "../../../../components/payCard";
import api from "../../../../components/api";
import { useUser } from "../../../../components/userContext";
import { QRCode } from "react-qrcode-logo";
import { TbSpace } from "react-icons/tb";

const ApprovalDetails = ({ item, setItem, update }) => {
  const { user } = useUser();
  const [itemDetails, setItemDetails] = useState({});
  const [bankInfo, setBankInfo] = useState({});
  const handleCancel = () => {
    setItem(false);
  };
  const handleApproval = (status) => {
    message.success(
      `Đã ${status === "approved" ? "phê duyệt" : "không duyệt"} đơn này.`
    );
    api
      .post(
        `/pheduyet/${item.id}/${status}/`,
        {
          comment: "",
        },
        user.token
      )
      .then((res) => {
        setItemDetails(res);
        setItem(res);
      });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(item.request_code);
    message.success("Đã sao chép Mã yêu cầu!");
  };
  useEffect(() => {
    const fetchBanks = async () => {
      const nht = await api.banks();
      setBankInfo(nht.data);
    };
    fetchBanks();
  }, []);
  useEffect(() => {
    if (item.id) {
      api
        .get(`/pheduyet/${item.id}/`, user.token)
        .then((res) => {
          setItemDetails(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, [item]);
  return (
    <Modal
      title="Thông tin chi tiết"
      open={!!item} // Đảm bảo Modal không lỗi khi item = null
      onCancel={handleCancel}
      className="!w-[900px]"
      footer={[
        <div className="items-center mr-auto text-[#999]">
          Bấm "phím cách" để duyệt và sang phê duyệt tiếp theo
        </div>,
        item.status == "pending" && (
          <Button
            key="approve"
            type="primary"
            icon={<FaCheck />}
            onClick={() => handleApproval("approved")}
          >
            Duyệt
          </Button>
        ),
        item.status == "pending" && (
          <Button
            key="reject"
            classNames="reject"
            icon={<FaXmark />}
            type="reject"
            onClick={() => handleApproval("rejected")}
          >
            Hủy
          </Button>
        ),
        <Button key="close" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      {item && itemDetails ? (
        <div className="flex approver-details gap-4">
          <Descriptions bordered column={1} className="w-[450px]">
            <Descriptions.Item label="Mã yêu cầu">
              <span style={{ marginRight: 8 }}>{item.request_code}</span>
              <Tooltip title="Sao chép mã">
                <Button
                  type="coppy_text"
                  icon={<FaCopy />}
                  onClick={handleCopy}
                />
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" className={`${item.status}`}>
              {item.status_display}
            </Descriptions.Item>
            <Descriptions.Item label="Người yêu cầu">
              {item.requester.profile.full_name}
            </Descriptions.Item>
            <Descriptions.Item label="Lý do">
              {item.reason || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày yêu cầu">
              {item.request_date}
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú">
              {item.comment || "Không có ghi chú"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái thanh toán">
              {item.payment_status_display && "Đã thanh toán"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái hoàn trả">
              {item.retrieve_status_display}
            </Descriptions.Item>
            <Descriptions.Item label="Người duyệt">
              {item.approver ? item.approver.full_name : "Chưa có"}
            </Descriptions.Item>
          </Descriptions>
          <div className="flex flex-col details-info flex-1">
            <div className="card">
              <div className="item">
                <div className="name">Số tiền</div>
                <div className="value flex flex-col">
                  <div>{parseInt(item.amount).toLocaleString()} VND</div>
                  <div className="flex flex-1 justify-center">
                    {item.status == "pending" &&
                      itemDetails?.operator?.so_taikhoan &&
                      itemDetails?.operator?.nganhang &&
                      itemDetails?.hinhthucThanhtoan === "bank" && (
                        <QRCode
                          value={
                            item.nguoiThuhuong === "opertor"
                              ? api.taoMaQR(
                                  itemDetails?.operator?.so_taikhoan,
                                  itemDetails?.operator?.nganhang,
                                  parseInt(item.amount),
                                  "TT_Baoung_" + item.request_code
                                )
                              : item.nguoiThuhuong === "staff"
                              ? api.taoMaQR(
                                  itemDetails?.requester?.profile?.bank_number,
                                  itemDetails?.requester?.profile?.bank,
                                  parseInt(item.amount),
                                  "TT_Baoung_" + item.request_code
                                )
                              : ""
                          }
                          size={175}
                          fgColor="#3e5c7e"
                          eyeColor="#202f41"
                          eyeRadius={10}
                          qrStyle="dots"
                          removeQrCodeBehindLogo={true}
                          logoPadding={2}
                          bgColor="transparent"
                        />
                      )}
                  </div>
                </div>
              </div>
              <div className="items flex p-2">
                <div className="name">Người thụ hưởng</div>
                <div className="value">{item.nguoiThuhuong_display}</div>
              </div>
              <div className="items flex p-2">
                <div className="name">Hình thức</div>
                <div className="value">{item.hinhthucThanhtoan_display}</div>
              </div>
              {item.nguoiThuhuong === "opertor" ? (
                <>
                  <div className="items flex p-2">
                    <div className="name">Người lao động</div>
                    <div className="value">{itemDetails?.operator?.ho_ten}</div>
                  </div>
                  <div className="items flex p-2">
                    <div className="name">Mã nhân viên</div>
                    <div className="value">
                      {itemDetails?.operator?.ma_nhanvien}
                    </div>
                  </div>
                  <div className="items flex p-2">
                    <div className="name">Số tài khoản</div>
                    <div className="value">
                      {itemDetails?.operator?.so_taikhoan}
                    </div>
                  </div>
                  <div className="items flex p-2">
                    <div className="name">Chủ tài khoản</div>
                    <div className="value">
                      {itemDetails?.operator?.chu_taikhoan}
                    </div>
                  </div>
                  <div className="items flex p-2">
                    <div className="name">Ngân hàng</div>
                    <div className="value">
                      {itemDetails?.operator?.nganhang &&
                        bankInfo &&
                        bankInfo.find(
                          (item) => item.bin === itemDetails.operator.nganhang
                        ).name}
                    </div>
                  </div>
                </>
              ) : (
                item.nguoiThuhuong === "staff" && (
                  <>
                    <div className="items flex p-2">
                      <div className="name">Họ và tên</div>
                      <div className="value">
                        {itemDetails?.requester?.profile?.full_name}
                      </div>
                    </div>
                    <div className="items flex p-2">
                      <div className="name">Số tài khoản</div>
                      <div className="value">
                        {itemDetails?.requester?.profile?.bank_number}
                      </div>
                    </div>
                    <div className="items flex p-2">
                      <div className="name">Ngân hàng</div>
                      <div className="value">
                        {itemDetails?.requester?.profile?.bank &&
                          bankInfo &&
                          bankInfo.find(
                            (item) =>
                              item.bin === itemDetails?.requester?.profile?.bank
                          ).name}
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Modal>
  );
};

export default ApprovalDetails;
