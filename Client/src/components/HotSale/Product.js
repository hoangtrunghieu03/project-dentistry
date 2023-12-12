import React from "react";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../actions/CartAction";
import { Link } from "react-router-dom";
import { formatPrice } from "../../untils/index";
import { message } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function Product(props) {
  const { product } = props;
  const dispatch = useDispatch();

  const success = () => {
    message.success({
      content: "Thêm vào giỏ hàng thành công",
      duration: 1,
      className: "custom-class",
      style: {
        position: "absolute",
        right: "2rem",
        top: "2rem",
        margin: "1rem 0",
      },
    });
  };

  function handleAddProduct(product) {
    const action = AddToCart(product);
    dispatch(action);
  }
  const AddProductToCart = async (product) => {
    const action = AddToCart(product);
    await dispatch(action);
    success();
  };

  return (
    <div className="hotsale-listproduct-product">
      <Link to={"/detail/" + product._id}>
        <img alt="" src={product.image}></img>
        <p className="hotsale-listproduct-product-name">{product.name}</p>
        <div className="price">
          <span className="price1">{formatPrice(product.salePrice)}đ</span>
          <span className="price2">{formatPrice(product.price)}đ</span>
        </div>
        <div className="wish-list">
          <span >Yêu thích</span>
          <HeartOutlined  className="icon-heart"/>
        </div>
        <div className="free-ship-tag">Giao nhanh miễn phí</div>
       
      </Link>
      {product.percentDiscount >= 5 ? (
        <div className="discount" >
          <p>{product.percentDiscount}%</p>
        </div>
      ) : (
        ""
      )}
      <div className="buy">
        <Link
          to="/cart"
          onClick={() => {
            handleAddProduct(product);
          }}
        > 
          {" "}
          Mua Ngay
        </Link>
        <ShoppingCartOutlined
          onClick={(e) => {
            AddProductToCart(product);
          }}
          className="add-cart"
        />{" "}
      </div>
    </div>
  );
}

export default Product;
