import "./Sidebar.css";

import Menu from "./Menu";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img alt="" src="https://res.cloudinary.com/deuyfvhdr/image/upload/v1684434740/logo-cellphone_ytjhca.png"></img>
      </div>
      {/* <div className="sidebar-list">
        <Link to="/admin" className={'sidebar-list-item'}>
          <span>
            <AppstoreOutlined></AppstoreOutlined>
          </span>
          <p>Thống kê</p>
        </Link>
        <Link to="/admin/customer" className={'sidebar-list-item'}>
          <span>
            <UsergroupAddOutlined></UsergroupAddOutlined>
          </span>
          <p>Khách hàng</p>
        </Link>
        <Link to="/admin/product" className={'sidebar-list-item'}>
          <span>
            <ShopOutlined></ShopOutlined>
          </span>
          <p>Sản phẩm</p>
        </Link>
        <Link to="/admin/order" className={'sidebar-list-item'}>
          <span>
            <OrderedListOutlined></OrderedListOutlined>
          </span>
          <p>
            Đơn hàng
            <span className="admin-order-new">
                {totalNewOrder}
              </span>
          </p>
        </Link>
        <Link to="/admin/chat" className={location.pathname === '/admin/chat' ? 'sidebar-list-item active': 'sidebar-list-item'}>
          <span>
            <WechatOutlined></WechatOutlined>
          </span>
          <p>Trò chuyện</p>
        </Link>
      </div> */}
      <Menu/>
    </div>
  );
}

export default Sidebar;
