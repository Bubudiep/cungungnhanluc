import React, { useState } from "react";

const ApprovalList = () => {
  const [allrequests, setAllrequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  return (
    <div className="approve-page">
      <div className="db-card">
        <div className="items">
          <div className="name text-green-600">Đã phê duyệt</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="content">Đơn đã duyệt trong tháng này</div>
        </div>
        <div className="items">
          <div className="name text-yellow-600">Đang chờ phê duyệt</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="content">Tất cả đơn đang chờ duyệt</div>
        </div>
        <div className="items">
          <div className="name">Cập nhập thông tin</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="sub-value font-medium">0 người</div>
          <div className="content !mt-0">Số lần cập nhập thông tin</div>
        </div>
        <div className="items">
          <div className="name">Ứng lương</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="sub-value font-medium">0 vnđ</div>
          <div className="content !mt-0">Đã ứng trong tháng</div>
        </div>
        <div className="items">
          <div className="name">Chi tiêu</div>
          <div className="value flex flex-1 items-center justify-center">
            00
          </div>
          <div className="sub-value font-medium">0 vnđ</div>
          <div className="content !mt-0">Đơn chi tiêu trong tháng</div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalList;
