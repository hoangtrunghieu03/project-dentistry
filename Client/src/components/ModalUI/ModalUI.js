import { Button, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    LoginOutlined,
    FormOutlined,
  } from "@ant-design/icons";
const ModalUI = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       {props.child}
       <div className="menu-drop">
                  <Link to="/register">
                    {
                      <FormOutlined
                        style={{ fontSize: "12px", padding: "0 5px" }}
                      />
                    }{" "}
                    Đăng kí
                  </Link>
                  <Link to="/login">
                    {
                      <LoginOutlined
                        style={{ fontSize: "12px", padding: "0 5px" }}
                      />
                    }{" "}
                    Đăng nhập
                  </Link>
                </div>
      </Modal>
    </>
  );
};
export default ModalUI;
