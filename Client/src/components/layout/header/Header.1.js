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
                    <img src="./logo-1.png" alt="" />
                </div>

                <div className="left-menu-trigger" onClick={toggleLeftMenu}>
                    <a><span className="material-symbols-outlined" style={{ color: 'rgb(9, 9, 9)' }}></span></a>
                </div>
                <div className="right-menu">
                    <div className="notification">
                        <ul>
                            <div><li><a href="#">{userInfo.name}</a></li></div>
                            
                        </ul>
                    </div>

                    <a><span className="material-symbols-outlined" style={{ color: 'rgb(9, 9, 9)' }}><i className="ti-user"></i></span></a>
                    {/* <span className="notification-count">.</span> */}
                </div>
            </div>
        </div>
    );
}
