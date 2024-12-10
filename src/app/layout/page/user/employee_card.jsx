import React, { useEffect, useRef, useState } from "react";
import { message, Select } from "antd";
import avatar from "../../../../assets/image/avatar.png";
import wallbg from "../../../../assets/image/wall-bg.png";
import fb_icon from "../../../../assets/image/mxh/fb.png";
import tt_icon from "../../../../assets/image/mxh/tt.png";
import is_icon from "../../../../assets/image/mxh/insta.png";
import zalo_icon from "../../../../assets/image/mxh/zalo.png";
import bank_icon from "../../../../assets/image/mxh/bank.png";
import api from "../../../../components/api";
const Employee_card = ({ myData, setMyData, user, setUser }) => {
  const max_length = 38;
  const user_des_ref = useRef();
  const [banks, setBanks] = useState([]);
  const [edit_des, setEdit_des] = useState(true);
  const fields = [
    {
      key: "full_name",
      label: "Họ tên",
      type: "text",
      placeholder: "họ và tên...",
    },
    {
      key: "birthday",
      label: "Ngày sinh",
      type: "date",
      placeholder: "",
    },
    {
      key: "phone",
      label: "Điện thoại",
      type: "text",
      placeholder: "+84...",
    },
    {
      key: "email",
      label: "Email",
      type: "text",
      placeholder: "...@gmail.com",
    },
    {
      key: "bank",
      label: "Ngân hàng",
      type: "select",
      placeholder: "chọn ngân hàng...",
    },
    {
      key: "bank_number",
      icon_width: myData?.bank
        ? banks?.find((bank) => bank.bin == myData?.bank)?.logo ?? 100
        : 22,
      icon: myData?.bank
        ? banks?.find((bank) => bank.bin == myData?.bank)?.logo ?? // Lấy `logo` nếu tìm thấy
          "https://api.vietqr.io/img/ICB.png" // Ảnh mặc định
        : bank_icon, // Icon mặc định nếu `myData?.bank` không có giá trị
      text: "",
      type: "text",
      placeholder: "số tài khoản...",
    },
    {
      key: "zalo_number",
      icon: zalo_icon,
      placeholder: "+84...",
      text: "Zalo",
    },
    {
      key: "facebook",
      icon: fb_icon,
      placeholder: "https://facebook.com/...",
      text: "Facebook",
    },
    {
      key: "tiktok",
      icon: tt_icon,
      placeholder: "https://tiktok.com/@...",
      text: "Tiktok",
    },
    {
      key: "instagram",
      icon: is_icon,
      placeholder: "https://instagram.com/...",
      text: "Instagram",
    },
  ];
  // Hàm xử lý upload ảnh
  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    const name = file.name; // Tên tệp
    const size = file.size; // Kích thước tệp (byte)
    const typeFile = file.type; // Loại tệp (ví dụ: image/jpeg, image/png)
    if (!file) return;
    let base64 = await api.convertToBase64(file);
    const img = new Image();
    img.src = base64;
    img.onload = async () => {
      const resizedBase64 = await api.resizeImage(
        img,
        type === "avatar" ? 200 : 500
      );
      const width = img.width; // Chiều rộng ảnh
      const height = img.height; // Chiều cao ảnh
      setMyData((old) => ({
        ...old,
        [type]: resizedBase64,
        updated_at: new Date(),
      }));
      handleUpdate(type, {
        data: resizedBase64,
        name: name,
        size: size,
        typeFile: typeFile,
        width: width,
        height: height,
      });
      if (type === "avatar") {
        setUser((old) => ({
          ...old,
          profile: {
            ...old.profile,
            avatar: resizedBase64,
          },
        }));
      }
    };
  };
  const handleUpdate = (key, value) => {
    api
      .patch(
        "/my-info/?key=" + user.key,
        {
          [key]: value,
        },
        user.token
      )
      .then((res) => {
        setUser((old) => ({
          ...old,
          myData: (old) => ({
            ...old,
            [key]: value,
          }),
        }));
        message.success("Đã cập nhập thông tin mới!");
      })
      .catch((er) => {
        message.error(er?.response?.detail ?? "Lỗi khi cập nhập!");
      });
  };
  const handleChange = (key, value) => {
    if (value.length <= max_length) {
      setMyData((old) => ({
        ...old,
        [key]: value,
      }));
    } else {
      message.error("Quá ký tự cho phép!");
    }
  };
  useEffect(() => {
    const loadbank = async () => {
      const bank_list = await api.banks();
      console.log(bank_list.data);
      setBanks(bank_list.data);
    };
    loadbank();
  }, []);
  return (
    <div className="fadeIn">
      <div className="wall-box">
        <div
          className="background"
          style={{
            backgroundImage: `url(${myData?.background ?? wallbg})`,
          }}
        >
          <div className="upload-wall">
            <label htmlFor="upload_wall">
              <i className="fa-solid fa-camera"></i>
              <div className="text">Ảnh mới</div>
            </label>
            <input
              type="file"
              id="upload_wall"
              onChange={(e) => handleUpload(e, "background")}
            />
          </div>
        </div>
        <div className="user-info">
          <div className="avatar">
            <div className="image-box">
              <img
                src={myData?.avatar ?? avatar}
                onChange={(e) => handleUpload(e, "avatar")}
              />
            </div>
            <div className="upload">
              <label htmlFor="upload_avatar">
                <i className="fa-solid fa-camera"></i>
                <div className="text">Ảnh mới</div>
              </label>
              <input
                type="file"
                id="upload_avatar"
                onChange={(e) => handleUpload(e, "avatar")}
              />
            </div>
          </div>
          <div className="infor">
            <div className="name">
              <input
                type="text"
                placeholder="nick name..."
                value={myData?.nick_name ?? ""}
                onChange={(e) => {
                  if (e.target.value.length <= max_length) {
                    setMyData((old) => ({
                      ...old,
                      nick_name: e.target.value,
                    }));
                  } else {
                    message.error("Quá ký tự cho phép!");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.target.blur();
                    handleUpdate("nick_name", e.target.value);
                  }
                }}
              />
            </div>
            <div className="description">
              <input
                type="text"
                ref={user_des_ref}
                value={myData?.sologan ?? ""}
                disabled={edit_des}
                onChange={(e) => {
                  if (e.target.value.length <= max_length) {
                    setMyData((old) => ({
                      ...old,
                      sologan: e.target.value,
                    }));
                  } else {
                    message.error("Quá ký tự cho phép!");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleUpdate("sologan", e.target.value);
                    setEdit_des(true);
                  }
                }}
              />
              {!edit_des ? (
                (myData?.sologan?.length ?? 0) + "/" + max_length
              ) : (
                <button
                  className="none"
                  onClick={async () => {
                    await setEdit_des(false);
                    user_des_ref.current.focus();
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="user-infos">
        <div className="list-item">
          <div className="item">
            <div className="name">Mã nhân viên</div>
            <div className="value">{myData?.name ?? "-"}</div>
          </div>
          <div className="item">
            <div className="name">Bộ phận</div>
            <div className="value">
              {myData?.possition ?? <div className="null">Không có</div>} -{" "}
              {myData?.department ?? <div className="null">Không có</div>}
            </div>
          </div>
          {fields.map((field) => (
            <div className="item" key={field.key}>
              {field.icon ? (
                <>
                  <div className="name">
                    <div
                      className="icon"
                      style={
                        field.icon_width && {
                          width: field.icon_width,
                          marginLeft: field.icon_width == 100 ? -13 : 0,
                        }
                      }
                    >
                      <img src={field.icon} alt={`${field.text} icon`} />
                    </div>
                    <div className="text">{field.text}</div>
                  </div>
                  <div className="value">
                    <i className="fa-solid fa-link"></i>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={myData?.[field.key] ?? ""}
                      onChange={(e) => {
                        handleChange(field.key, e.target.value);
                        if (field.type == "date") {
                          handleUpdate(field.key, e.target.value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          handleUpdate(field.key, e.target.value);
                          e.target.blur();
                        }
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="name">{field.label}</div>
                  <div className="value">
                    {field.type == "select" ? (
                      <Select
                        value={myData?.[field.key] ?? ""}
                        onChange={(value) => {
                          handleChange(field.key, value);
                          handleUpdate(field.key, value);
                        }}
                        placeholder="Chọn ngân hàng"
                        style={{ width: "150px" }} // Căn chỉnh rộng cho Select
                        showSearch // Bật tính năng tìm kiếm
                        filterOption={(input, option) => {
                          const children = option.children?.toString() ?? "";
                          return children
                            .toLowerCase()
                            .includes(input.toLowerCase());
                        }}
                      >
                        {banks?.map((bank) => (
                          <Option key={bank.code} value={bank.bin}>
                            {bank.shortName} - {bank.name}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={myData?.[field.key] ?? ""}
                        onChange={(e) => {
                          handleChange(field.key, e.target.value);
                          if (field.type == "date") {
                            handleUpdate(field.key, e.target.value);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key == "Enter") {
                            handleUpdate(field.key, e.target.value);
                            e.target.blur();
                          }
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="item last_update">
            <div className="name"></div>
            <div className="value">
              {myData?.updated_at
                ? `Cập nhập lần cuối : ` +
                  api.timeSinceOrder(myData?.updated_at)
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee_card;
