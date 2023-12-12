import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllOrderPendding } from "../../../../../actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";

function AdminOrderMenu(props) {
  const dispatch = useDispatch();
  const { orderPendding } = useSelector((state) => state.allOrder);
  let totalNewOrder;

  if (orderPendding) {
    totalNewOrder = orderPendding.length;
  }

  useEffect(() => {
    console.log("get all order penddin");

    const getNewOrder = () => {
      dispatch(GetAllOrderPendding());
    };
    getNewOrder();
  }, [dispatch]);

  return (
    <div className="order-menu">
      {/* <Link to="/admin/order">All Orders</Link> */}
      <span className="admin-order-total" style={{}}>Tổng: <span>{totalNewOrder}</span> đơn hàng</span>
    </div>
  );
}

export default AdminOrderMenu;
