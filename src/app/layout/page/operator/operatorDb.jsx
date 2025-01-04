import React from "react";

const OperatorDb = () => {
  return (
    <div className="db-card">
      <div className="items">
        <div className="name">Dự kiến</div>
        <div className="value">00</div>
        <div className="content">Người dự kiến mai đi làm</div>
      </div>
      <div className="items">
        <div className="name">Hôm nay</div>
        <div className="value">00</div>
        <div className="content">Người mới thêm hôm nay</div>
      </div>
      <div className="items">
        <div className="name">Tháng này</div>
        <div className="value">00</div>
        <div className="content">Số người trong tháng này</div>
      </div>
      <div className="items">
        <div className="name">Đang đi làm</div>
        <div className="value">00</div>
        <div className="content">Danh sách đang đi làm</div>
      </div>
      <div className="items">
        <div className="name">Xin nghỉ</div>
        <div className="value">00</div>
        <div className="content">Những người xin nghỉ</div>
      </div>
      <div className="items">
        <div className="name">Không đi làm</div>
        <div className="value">00</div>
        <div className="content">Những người không đi làm</div>
      </div>
      <div className="items">
        <div className="name">Đã nghỉ việc</div>
        <div className="value">00</div>
        <div className="content">Những người đã nghỉ việc</div>
      </div>
    </div>
  );
};

export default OperatorDb;
