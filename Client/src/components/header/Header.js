import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";

import {
  DownOutlined,
  SearchOutlined,
  HomeFilled,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  ShoppingOutlined,
  FormOutlined,
} from "@ant-design/icons";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userInfo);
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const [menu, setMenu] = useState(true);

  const handleSignout = () => {
    console.log("dang xuat");
    dispatch(SignoutUser());
  };

  const SearchProduct = async (e) => {
    e.preventDefault();
    await history.push("/search");
    dispatch(searchProduct(search));
    setSearch("");
  };

  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/"> CELLPHONE </Link>
          </span>
        </div>
        <div className="search">
          <form onSubmit={(e) => SearchProduct(e)}>
            <input
              type="text"
              name="search"
              placeholder="Bạn cần tìm gì?"
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <SearchOutlined onClick={(e) => SearchProduct(e)}></SearchOutlined>
            {/* <button type="submit" onClick={(e) => SearchProduct(e)}>Search</button> */}
          </form>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="active">
            <Link to="">
              {" "}
              {
                <HomeFilled
                  style={{
                    fontSize: "14px",
                    padding: "2px",
                    marginBottom: "2px",
                  }}
                />
              }
              Trang Chủ{" "}
            </Link>
          </li>
          <li>
            <Link to="/product"> Sản Phẩm </Link>
          </li>
          {userInfo ? (
            <li onClick={() => setShowAccount2(!showAccount2)}>
              <Link to="">
                {userInfo.name}
                <DownOutlined style={{ fontSize: "14px" }} />
              </Link>
              {showAccount2 ? (
                <div className="menu-drop" style={{ width: "150px" }}>
                  {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
                  <Link to="/myOrder">
                    {
                      <ShoppingOutlined
                        style={{ fontSize: "14px", padding: "0 5px" }}
                      />
                    }
                    Đơn hàng
                  </Link>
                  <a href="/" onClick={() => handleSignout()}>
                    {
                      <LogoutOutlined
                        style={{ fontSize: "14px", padding: "0 5px" }}
                      />
                    }{" "}
                    Đăng xuất
                  </a>
                </div>
              ) : (
                ""
              )}
            </li>
          ) : (
            <li onClick={() => setShowAccount(!showAccount)}>
              <Link to="">
                {
                  <UserOutlined
                    style={{
                      fontSize: "15px",
                      padding: "2px",
                      marginBottom: "2px",
                    }}
                  />
                }
                Tài khoản
                {/* <DownOutlined style={{ fontSize: "14px" }} /> */}
              </Link>

              {showAccount ? (
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
              ) : (
                ""
              )}
            </li>
          )}
          <li className="shop-cart">
            <Link to="/cart" className="shop-cart">
              <ShoppingOutlined style={{ fontSize: "30px" }} />
              <span className="count"> {amount} </span>
            </Link>
          </li>
        </ul>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Header;
