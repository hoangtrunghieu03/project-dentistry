import {
  AppstoreOutlined,
  OrderedListOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { GetAllOrderPendding } from "../../../../actions/OrderAction";

function Menu(props) {
  const dispatch = useDispatch();
  const location = useLocation();
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
    <>
      <div className="sidebar-list">
        <Link to="/admin" className={"sidebar-list-item"}>
          <span>
            <AppstoreOutlined/>
          </span>
          <p>Thống kê</p>
        </Link>
        <Link to="/admin/customer" className={"sidebar-list-item"}>
          <span>
            <UsergroupAddOutlined/>
          </span>
          <p>Khách hàng</p>
        </Link>
        <Link to="/admin/product" className={"sidebar-list-item"}>
          <span>
            <ShopOutlined/>
          </span>
          <p>Sản phẩm</p>
        </Link>
        <Link to="/admin/order" className={"sidebar-list-item"}>
          <span>
            <OrderedListOutlined/>
          </span>
          <p>
            Đơn hàng
            <span className="admin-order-new">{totalNewOrder}</span>
          </p>
        </Link>
        <Link
          to="/admin/chat"
          className={
            location.pathname === "/admin/chat"
              ? "sidebar-list-item active"
              : "sidebar-list-item"
          }
        >
          <span>
            <WechatOutlined/>
          </span>
          <p>Trò chuyện</p>
        </Link>
      </div>
    </>
  );
}
export default Menu;
