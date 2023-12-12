
import React, { useEffect } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  PhoneOutlined,
  LockOutlined,
  CaretRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const user = useSelector((state) => state.userSignin);
  const { userInfo, error } = user;
  
  const onSubmit =  (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.status === 'admin') {
        history.push("/doanh-thu-trong-trong-ngay");
      } else if (userInfo.status === 'nguoi-dung') {
        history.push("/thong-tin-nguoi-dung");
      } else if (userInfo.status === 'le-tan') {
        history.push("/tiep-nhan-le-tan");
      } else if (userInfo.status === 'chuan-doan') {
        history.push("/tiep-nhan-chuan-doan");
      } else if (userInfo.status === 'thuc-hien') {
        history.push("/tiep-nhan-thuc-hien");
      } else if (userInfo.status === 'thu-ngan') {
        history.push("/ho-so-thanh-toan");
      } else {
        history.push("/");
        console.log( userInfo.status)
      }
    }
  }, [userInfo, history]);


  return (
    <div className="container">
      <div className="screen-login">
        <div className="form__back">
          <Link to="/">
            <ArrowLeftOutlined className="button-back"></ArrowLeftOutlined>
          </Link>
        </div>  
        <div className="screen__content-login">
          <h2 className="title"> Login </h2>
          <form className="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="signup__field">
                <PhoneOutlined />
                <input
                    className="signup__input"
                    type="tel"  // Sử dụng kiểu "tel" cho số điện thoại
                    {...register("phone")}
                    required
                    placeholder="Số điện thoại"
                />
            </div>
            <div className="login__field">
              <LockOutlined />
              <input
                className="login__input"
                type="password"
                {...register("password")}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className=" login__submit" value="Đăng nhập">
              <span className="button__text">Log In Now</span>
              <CaretRightOutlined className="social-icons" />
            </button>
            {error ? <span className="error" style={{position:"absolute", top:'52%', right:'35px', fontWeight:'400'}}>{(error) }</span> : <></>}
          </form>
          <div className="register">
            <span>
              Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
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

export default Login;
