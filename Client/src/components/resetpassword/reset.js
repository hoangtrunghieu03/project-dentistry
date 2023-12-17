
import React, { useEffect } from "react";
import "./reset.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { resetpassword } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  PhoneOutlined,
  LockOutlined,
  CaretRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function Reset(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const { token } = useParams();
  console.log(token);

  const onSubmit = (newPassword) => {
    dispatch(resetpassword(token, newPassword));
  };
  return (
    <div className="container">
      <div className="screen-login">
        <div className="screen__content-login">
          <h2 className="title"> Reset </h2>
          <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <div className="signup__field">
                <LockOutlined />
              <input
                className="signup__input"
                type="text"
                {...register("newPassword")}
                required
                placeholder="Mật khẩu mới "
              />
            </div>
            <button type="submit" className=" login__submit" value="Đăng nhập">
              <span className="button__text">Đổi mật khẩu</span>
              <CaretRightOutlined className="social-icons" />
            </button>
          </form>
          <div className="register">
            <span>
              Đăng nhập? <Link to="/login">Đăng nhập ngay</Link>
            </span>
          </div>
        </div>
        {/* Background */}
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape1" />
        </div>
      </div>
    </div>
  );
}

export default Reset;
