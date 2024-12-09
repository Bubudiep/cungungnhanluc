import React, { useEffect, useRef, useState } from "react";
import avatar from "../../../assets/image/avatar.png";
import wallbg from "../../../assets/image/wall-bg.png";
import { message } from "antd";
import fb_icon from "../../../assets/image/mxh/fb.png";
import tt_icon from "../../../assets/image/mxh/tt.png";
import is_icon from "../../../assets/image/mxh/insta.png";
import mail_icon from "../../../assets/image/mxh/mail.png";
import zalo_icon from "../../../assets/image/mxh/zalo.png";
import api from "../../../components/api";
import { useUser } from "../../../components/userContext";

const User_profile = () => {
  const { user, setUser } = useUser();
  const [user_des, setUser_des] = useState("Tôi luôn luôn đẹp trai");
  const [edit_des, setEdit_des] = useState(true);
  const [loading, setLoading] = useState(false);
  const user_des_ref = useRef();
  const max_lenth = 32;
  useEffect(() => {
    api
      .get("/my-info/", user.token)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        message.error(er?.response?.detail ?? "Phát sinh lỗi khi tải dữ liệu!");
      })
      .finally();
  }, []);
  return (
    <div className="profile-page">
      <div className="profile-box">
        {loading ? (
          <></>
        ) : (
          <>
            <div
              className="wall-box"
              style={{ backgroundImage: `url(${wallbg})` }}
            >
              <div className="upload-wall">
                <label htmlFor="upload_wall">
                  <i className="fa-solid fa-camera"></i>
                  <div className="text">Ảnh mới</div>
                </label>
                <input type="file" id="upload_wall" />
              </div>
              <div className="user-info">
                <div className="avatar">
                  <div className="image-box">
                    <img src={avatar} />
                  </div>
                  <div className="upload">
                    <label htmlFor="upload_avatar">
                      <i className="fa-solid fa-camera"></i>
                      <div className="text">Ảnh mới</div>
                    </label>
                    <input type="file" id="upload_avatar" />
                  </div>
                </div>
                <div className="infor">
                  <div className="name">Diệp Văn Hùng</div>
                  <div className="description">
                    <input
                      type="text"
                      ref={user_des_ref}
                      value={user_des}
                      disabled={edit_des}
                      onChange={(e) => {
                        if (e.target.value.length <= max_lenth) {
                          setUser_des(e.target.value);
                        } else {
                          message.error("Quá ký tự cho phép!");
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          message.success("Đã lưu lại!");
                          setEdit_des(true);
                        }
                      }}
                    />
                    {!edit_des ? (
                      user_des.length + "/" + max_lenth
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
                  <div className="value">-</div>
                </div>
                <div className="item">
                  <div className="name">Bộ phận</div>
                  <div className="value">-</div>
                </div>
                <div className="item">
                  <div className="name">Chức vụ</div>
                  <div className="value">-</div>
                </div>
                <div className="item">
                  <div className="name">Họ tên</div>
                  <div className="value">
                    <input type="text" placeholder="họ và tên...." />
                  </div>
                </div>
                <div className="item">
                  <div className="name">Ngày sinh</div>
                  <div className="value">
                    <input type="date" />
                  </div>
                </div>
                <div className="item">
                  <div className="name">Điện thoại</div>
                  <div className="value">
                    <input type="text" placeholder="+84..." />
                  </div>
                </div>
                <div className="item">
                  <div className="name">Email</div>
                  <div className="value">
                    <input type="text" placeholder="...@gmail.com" />
                  </div>
                </div>
                <div className="item">
                  <div className="name">
                    <div className="icon">
                      <img src={zalo_icon} />
                    </div>
                    <div className="text">Zalo</div>
                  </div>
                  <div className="value">
                    <input type="text" placeholder="+84..." />
                  </div>
                </div>
                <div className="item">
                  <div className="name">
                    <div className="icon">
                      <img src={fb_icon} />
                    </div>
                    <div className="text">Facebook</div>
                  </div>
                  <div className="value">
                    <i class="fa-solid fa-link"></i>
                    <input type="text" placeholder="https://facebook.com/..." />
                  </div>
                </div>
                <div className="item">
                  <div className="name">
                    <div className="icon">
                      <img src={tt_icon} />
                    </div>
                    <div className="text">Tiktok</div>
                  </div>
                  <div className="value">
                    <i class="fa-solid fa-link"></i>
                    <input type="text" placeholder="https://tiktok.com/@..." />
                  </div>
                </div>
                <div className="item">
                  <div className="name">
                    <div className="icon">
                      <img src={is_icon} />
                    </div>
                    <div className="text">Instagram</div>
                  </div>
                  <div className="value">
                    <i class="fa-solid fa-link"></i>
                    <input
                      type="text"
                      placeholder="https://intargram.com/..."
                    />
                  </div>
                </div>
                <div className="item">
                  <div className="name">Ngày khởi tạo</div>
                  <div className="value">10 ngày trước</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User_profile;
