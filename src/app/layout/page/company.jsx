import { Button } from "antd";
import React from "react";

const Company = () => {
  return (
    <div className="company-page">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full">
        <div className="white-table">
          <div className="h3">
            <div className="text">Danh sách nhà công ty cấp người</div>
            <div className="tools">
              <Button>Thêm công ty</Button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tên gọi</th>
                <th>Tên doanh nghiệp</th>
                <th>Số liên hệ</th>
                <th>Địa chỉ</th>
                <th>Trang web</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="white-table">
          <div className="h3">
            <div className="text">Danh sách nhà công ty cấp người</div>
            <div className="tools">
              <Button>Thêm công ty</Button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tên gọi</th>
                <th>Tên doanh nghiệp</th>
                <th>Số liên hệ</th>
                <th>Địa chỉ</th>
                <th>Trang web</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="white-table">
          <div className="h3">
            <div className="text">Danh sách nhà công ty cấp người</div>
            <div className="tools">
              <Button>Thêm công ty</Button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tên gọi</th>
                <th>Tên doanh nghiệp</th>
                <th>Số liên hệ</th>
                <th>Địa chỉ</th>
                <th>Trang web</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="white-table"></div>
        <div className="white-table"></div>
      </div>
    </div>
  );
};

export default Company;
