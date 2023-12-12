/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SignoutUser } from "../../../actions/UserAction";
import { useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";

export function Header(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const [isLeftMenuActive, setLeftMenuActive] = useState(false);

    const toggleLeftMenu = () => {
        setLeftMenuActive(!isLeftMenuActive);
    };

    const handleSignout = () => {
        console.log("dang xuat");
        dispatch(SignoutUser());
    };

    return (
        <div className="main">
            <div className={`headerr ${isLeftMenuActive ? 'left-menu-active' : ''}`}>
                <div className="logo">
                    <img src="http://157.245.51.171:202/wp-content/uploads/2023/11/logo.png" alt="Logo" />
                </div>

                <div className="left-menu-trigger" onClick={toggleLeftMenu}>
                    <a><span className="material-symbols-outlined" style={{ color: 'rgb(9, 9, 9)' }}><i className="ti-bell"></i></span></a>
                    <span className="notification-count">2</span>
                </div>

                <ul className={`left-menu ${isLeftMenuActive ? 'active' : ''}`}>
                    <div className="notification-list">
                        <div>
                            <h1>Thông Báo</h1>
                        </div>
                        <div><li><a href="#">2 - Nguyễn văn Khang</a><br />06:21 Tổng quát</li></div>
                        <div><li><a href="#">2 - Nguyễn văn khang</a><br />06:21 Niềng răng</li></div>
                        <div><li><a href="#">2 - Nguyễn văn khang</a><br />06:21 Tiếp tân</li></div>
                    </div>
                </ul>

                <div className="right-menu">
                    <div className="notification">
                        <ul>
                            <div><li><a href="#">{userInfo.name}</a></li></div>
                            <div><li><a href="/" onClick={() => handleSignout()}>
                                {<LogoutOutlined
                                    style={{ fontSize: "14px", padding: "0 5px" }} />}{" "}
                                Đăng xuất
                            </a></li></div>
                        </ul>
                    </div>

                    <a><span className="material-symbols-outlined" style={{ color: 'rgb(9, 9, 9)' }}><i className="ti-user"></i></span></a>
                    {/* <span className="notification-count">.</span> */}
                </div>
            </div>
        </div>
    );
}
