import React from "react";
import { formatPrice } from "../../untils";
import "./ShoppingCart.css";
import ListProduct from "./ListProduct";
import {  useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DoubleLeftOutlined } from "@ant-design/icons";

function Cart(props) {
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.cartItems);
  var userInfo = useSelector((state) => state.userSignin.userInfo);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.salePrice,
    0
  );

  const Order = () => {
    if (userInfo) {
      history.push("/order");
    } else {
      alert("Bạn phải đăng nhập trước khi thanh toán!");
      history.push("/login");
    }
  };

  return (
    <section id="shopping-cart">
      <div className="shopping-cart">
        <div className="shopping-cart-header">
          <Link to="/" className="back">
            <DoubleLeftOutlined />
            <span>Tiếp tục mua hàng</span>
          </Link>
          <h2 className="shopping-cart-title">Giỏ hàng</h2>
        </div>

        {cartItems ? <ListProduct products={cartItems}></ListProduct> : ""}

        <div className="total-price">
          <span className="left">Tổng tiền  :</span>
          <span className="right">{formatPrice(totalPrice) + " đ"}</span>
        </div>
        {totalPrice <= 0 ? (
          ""
        ) : (
          <div className="order">
            <a  onClick={() => Order()}> Đặt Hàng </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
