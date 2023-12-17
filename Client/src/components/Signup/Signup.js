import React, { useState } from "react";
import "./Signup.css";
import { useForm, useWatch  } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { SignupUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  CaretRightOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { message } from "antd";

function Signup(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  // const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit =  (data) => {
    if (password === confirmPassword) { 
     dispatch(SignupUser(data));

     const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Kiểm tra status và chuyển hướng
    if (userInfo) {
      if (userInfo.status === 'admin') {
        history.push("/admin");
      } else if (userInfo.status === 'nguoi-dung') {
        
        history.push("/thong-tin-nguoi-dung");
      } else {
        history.push("/");
      }
    }
    } else {
      alert("Wrong repeat password!");
    }
  };

  return (
    <div className="container">
      <div className="screen-signup">
        <div className="screen__content-signup">
          <h2 className="title"> SignUp </h2>
          <form className="signup" onSubmit={handleSubmit(onSubmit)}>
            <div className="signup__field">
              <UserOutlined />{" "}
              <input
                className="signup__input"
                {...register("name")}
                placeholder="User name "
                required
              />
            </div>
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

            <div className="signup__field">
              <PhoneOutlined />
              <input
                className={`signup__input ${errors.phone ? "error" : ""}`}
                type="tel"
                {...register("phone", {
                  required: "Số điện thoại là bắt buộc",
                  pattern: {
                    value: /^(\+?\d{1,4}[\s-]?)?\d{10}$/,
                    message: "Số điện thoại không đúng định dạng",
                  },
                })}
                required
                placeholder="Số điện thoại"
              />
              {errors.phone && <p className="error-message">{errors.phone.message}</p>}
            </div>



            <div className="signup__field">
              <i className="ti-calendar"></i>
              <input
                className="signup__input"
                type="date"
                {...register("birthday")}
                required
                placeholder="Giới tính"

              />
            </div>

            <div className="signup__field">
              <i className="ti-flag"></i>
              <select 
                className="signup__input" 
                {...register('sex')}
                required
                >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>

            <div className="signup__field">
              <LockOutlined />
              <input
                className="signup__input"
                type="password"
                {...register("password")}
                placeholder="Password "
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="signup__field">
              <LockOutlined />{" "}
              <input
                className="signup__input"
                type="password"
                {...register("repeat password")}
                placeholder=" Repeat password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" value="Đăng kí" className="button signup__submit" >
              <span className="button__text">Register</span>
              <CaretRightOutlined />
            </button>
            <div className="social-signup">
              <span>
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay!  </Link>
              </span>
            </div>
          </form>
        </div>
        {/* Background */}
        <div className="screen__background">
          {/* <span className="screen__background__shape screen__background__shape4" />
          <span className="screen__background__shape screen__background__shape3" />
          <span className="screen__background__shape screen__background__shape2" /> */}
          <span className="screen__background__shape screen__background__shape1" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
