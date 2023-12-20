
import React, { useEffect } from "react";
import "./email.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { sendotp } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  PhoneOutlined,
  MailOutlined,
  CaretRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function Forgot(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit =  (email) => {
    dispatch(sendotp(email));
  };
  return (
    <div className="container">
      <div className="screen-login">
        <div className="form__back">
          <Link to="/login">
            <ArrowLeftOutlined className="button-back"></ArrowLeftOutlined>
          </Link>
        </div>  
        <div className="screen__content-login">
          <h2 className="title"> Email </h2>
          <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <div className="signup__field">
              <MailOutlined />
              <input
                className="signup__input"
                type="email"
                {...register("email")}
                required
                placeholder="Email "
              />
            </div>
            <button type="submit" className=" login__submit" value="Đăng nhập">
              <span className="button__text">Gửi ngay</span>
              <CaretRightOutlined className="social-icons" />
            </button>
          </form>
        </div>
        {/* Background */}
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape1" />
        </div>
      </div>
    </div>
  );
}

export default Forgot;
