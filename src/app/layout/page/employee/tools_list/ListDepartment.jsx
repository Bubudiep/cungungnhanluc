import { Button, Modal, Input, Form, message, Popconfirm } from "antd";
import React, { useState } from "react";
import api from "../../../../../components/api";

const ListDepartment = ({
  open,
  onCancel,
  setOpenDepartment,
  department,
  onEdit,
  token,
  onDelete,
}) => {
  const [editingKey, setEditingKey] = useState(null);
  const isEditing = (record) => record.id === editingKey;
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState({});
  const handleEdit = (record) => {
    setEditingKey(record.id);
    setEditedDepartment({ ...record });
  };
  const handleSaveEdit = () => {
    api
      .patch(
        `/department/${editedDepartment.id}/`,
        {
          name: editedDepartment.name,
          description: editedDepartment.description,
        },
        token
      )
      .then((res) => {
        onEdit(res);
        message.success("Cập nhật bộ phận thành công!");
        handleEdit(false);
      })
      .catch((e) => {
        message.error(e?.response?.data?.detail ?? "Phát sinh lỗi!");
      });
  };
  const handleContentChange = (e, field, record) => {
    record[field] = e.target.innerText; // Cập nhật nội dung trực tiếp
  };
  const handlePaste = (e) => {
    e.preventDefault(); // Ngăn dán nội dung gốc
    const text = e.clipboardData.getData("text/plain"); // Lấy nội dung dạng text
    document.execCommand("insertText", false, text); // Chèn nội dung text vào
  };
  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditedDepartment({});
  };
  return (
    <>
      <Modal
        title="Danh sách các bộ phận"
        open={open}
        onCancel={onCancel}
        footer={
          <Button
            type="primary"
            icon={<i className="fa-solid fa-plus"></i>}
            onClick={() => setOpenDepartment(true)}
          >
            Thêm bộ phận
          </Button>
        }
        className="custom-modal"
      >
        <div className="modal-view">
          <table className="deparment">
            <thead>
              <tr>
                <th>Tên bộ phận</th>
                <th>Mô tả chức năng</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="input-edit">
              {department.map((dp) => {
                const editable = isEditing(dp);
                return (
                  <tr key={dp.id}>
                    <td>
                      <div
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onInput={(e) => handleContentChange(e, "name", dp)}
                        onPaste={handlePaste} // Xử lý dán nội dung
                        className={editable ? "editable-cell" : ""}
                      >
                        {dp.name}
                      </div>
                    </td>
                    <td>
                      <div
                        contentEditable={editable}
                        suppressContentEditableWarning
                        onInput={(e) =>
                          handleContentChange(e, "description", dp)
                        }
                        onPaste={handlePaste} // Xử lý dán nội dung
                        className={editable ? "editable-cell" : ""}
                      >
                        {dp.description}
                      </div>
                    </td>
                    <td className="w-20 fixed-w">
                      {editable ? (
                        <div className="flex gap-2">
                          <Button type="link" onClick={handleSaveEdit}>
                            <i className="fa-solid fa-check"></i>
                          </Button>
                          <Button
                            type="link"
                            danger
                            onClick={() => handleEdit(false)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button type="link" onClick={() => handleEdit(dp)}>
                            <i className="fa-regular fa-pen-to-square"></i>
                          </Button>
                          <Popconfirm
                            title="Xác nhận xóa bộ phận?"
                            okText="Xóa"
                            cancelText="Hủy"
                            onConfirm={() => {
                              api
                                .delete(`/department/${dp.id}/`, token)
                                .then((res) => {
                                  message.success("Xóa bộ phận thành công!");
                                  onDelete(dp);
                                })
                                .catch((e) => {
                                  message.error(
                                    e?.response?.data?.Error ?? "Phát sinh lỗi!"
                                  );
                                });
                            }}
                          >
                            <Button type="link" danger>
                              <i className="fa-solid fa-trash-can"></i>
                            </Button>
                          </Popconfirm>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default ListDepartment;
