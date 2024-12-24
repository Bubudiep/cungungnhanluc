import { Button, message, Modal, Popconfirm } from "antd";
import React, { useState } from "react";
import api from "../../../../../components/api";

const ListPossition = ({
  open,
  onCancel,
  setOpenPosition,
  jobtitle,
  token,
  onEdit,
  onDelete,
}) => {
  const [editingKey, setEditingKey] = useState(null);
  const isEditing = (record) => record.id === editingKey;
  const handleEdit = (record) => {
    setEditingKey(record.id);
  };
  const handleSaveEdit = (record) => {
    api
      .patch(
        `/jobtitle/${record.id}/`,
        {
          name: record.name,
          description: record.description,
        },
        token
      )
      .then((res) => {
        onEdit(res);
        message.success("Cập nhật chức vụ thành công!");
        setEditingKey(null); // Tắt chế độ chỉnh sửa
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
  return (
    <Modal
      title="Danh sách các chức vụ"
      open={open}
      onCancel={onCancel}
      footer={
        <Button
          type="primary"
          icon={<i className="fa-solid fa-plus"></i>}
          onClick={() => setOpenPosition(true)}
        >
          Thêm chức vụ
        </Button>
      }
      className="custom-modal"
    >
      <div className="modal-view">
        <table className="deparment">
          <thead>
            <tr>
              <th>Tên chức vụ</th>
              <th>Mô tả công việc</th>
            </tr>
          </thead>
          <tbody>
            {jobtitle.map((jt) => {
              const editable = isEditing(jt);
              return (
                <tr key={jt.id}>
                  <td>
                    <div
                      contentEditable={editable}
                      suppressContentEditableWarning
                      onInput={(e) => handleContentChange(e, "name", jt)}
                      onPaste={handlePaste} // Xử lý dán nội dung
                      className={editable ? "editable-cell" : ""}
                    >
                      {jt.name}
                    </div>
                  </td>
                  <td>
                    <div
                      contentEditable={editable}
                      suppressContentEditableWarning
                      onInput={(e) => handleContentChange(e, "description", jt)}
                      onPaste={handlePaste} // Xử lý dán nội dung
                      className={editable ? "editable-cell" : ""}
                    >
                      {jt.description}
                    </div>
                  </td>
                  <td className="w-20 fixed-w">
                    {editable ? (
                      <div className="flex gap-2">
                        <Button type="link" onClick={() => handleSaveEdit(jt)}>
                          <i className="fa-solid fa-check"></i>
                        </Button>
                        <Button
                          type="link"
                          danger
                          onClick={() => setEditingKey(null)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button type="link" onClick={() => handleEdit(jt)}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </Button>
                        <Popconfirm
                          title="Xác nhận xóa chức vụ?"
                          okText="Xóa"
                          cancelText="Hủy"
                          onConfirm={() => {
                            api
                              .delete(`/jobtitle/${jt.id}/`, token)
                              .then((res) => {
                                message.success("Xóa chức vụ thành công!");
                                onDelete(jt);
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
  );
};

export default ListPossition;
