import { Modal } from "antd";
import React, { useEffect } from "react";

const ApprovalDetails = ({ item, setItem, list, update }) => {
  const handleCancel = () => {
    setItem(false);
  };
  useEffect(() => {}, [item]);
  return (
    <Modal
      title="Thông tin chi tiết"
      open={item}
      onCancel={handleCancel}
      footer={null}
    ></Modal>
  );
};

export default ApprovalDetails;
