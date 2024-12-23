import { AutoComplete, Spin } from "antd";
import React, { useRef, useState } from "react";
import api from "../../../../components/api";
import { LoadingOutlined } from "@ant-design/icons";

const OPsearch_box = ({ user }) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const getPanelValue = (searchText) => {
    if (!searchText) {
      setOptions([]);
      return;
    }
    api
      .get(`/search/?type=operator&q=${searchText}`, user?.token)
      .then((res) => {
        if (!res || res.length === 0) {
          setOptions([{ label: "Không có dữ liệu", value: "null" }]);
        } else {
          const formattedOptions = res.map((employee) => ({
            label: `${employee.ho_ten} (${employee.ma_nhanvien})`,
            value: `${employee.ho_ten} (${employee.ma_nhanvien})`,
          }));
          setOptions(formattedOptions);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setOptions([{ label: "Không có dữ liệu", value: "null" }]);
      });
  };
  const onChange = (data) => {
    console.log("onChange");
    setValue(data);
  };
  const onSearch = (searchText) => {
    setLoading(true);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      getPanelValue(searchText);
      setLoading(false);
    }, 500);
  };
  return (
    <div className="searchbox">
      {loading ? (
        <i>
          <Spin indicator={<LoadingOutlined spin />} size="small" />
        </i>
      ) : (
        <i className="fa-solid fa-magnifying-glass"></i>
      )}
      <AutoComplete
        options={options}
        style={{
          width: 220,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Nhập tên hoặc mã nhân viên..."
        value={value}
        onChange={onChange}
        variant="borderless"
      ></AutoComplete>
    </div>
  );
};

export default OPsearch_box;
