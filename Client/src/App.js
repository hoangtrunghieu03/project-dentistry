import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Header from './components/layout/header/Header';
import Sidebar from './components/layout/sidebar/Sidebar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import ResetScroll from './components/ResetScroll/ResetScroll';
import MyOrderPage from './pages/MyOrderPage';
import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

import Thongtinuser from './pages/thong-tin-nguoi-dung';
import Suanguoidung from './pages/sua-nguoi-dung';
import Datlichnguoidung from './pages/dat-lich-nguoi-dung';
import Lichhennguoidung from './pages/lich-hen-nguoi-dung';
import Lichsukhambenh from './pages/lich-su-kham-benh';
import Hosonguoidung from './pages/ho-so-nguoi-dung';
import Hosonguoidungdetail from './pages/ho-do-nguoi-dung-detail';

import Tiepnhanletan from './pages/tiep-nhan-le-tan';
import Themtiepnhan from './pages/them-tiep-nhan';
import Suatiepnhana from './pages/sua-tiep-nhan-le-tan';
import Lichhenletan from './pages/le-tan-lich-hen';
import Quanlykho from './pages/quanlykho';
import Thongtinletan from './pages/thong-tin-le-tan';
import Sualetan from './pages/sua-thong-tin-le-tan';

import Tiepnhanchuandoan from './pages/tiep-nhan-chuan-doan';
import Thongtinchandoan from './pages/thong-tin-chuan-doan';
import Suachuandoan from './pages/sua-thong-tin-chuan-doan';
import Chuandoan from './pages/chuan-doan';
import Chuandoanthuchien from './pages/thuc-hien-chuan-doan';

import Tiepnhanthuchien from './pages/tiep-nhan-thuc-hien';
import Thongtinthuchien from './pages/thong-tin-thuc-hien';
import Dangthuchien from './pages/dang-thuc-hien';
import Thongtinguoithuchien from './pages/thong-tin-nguoi-thuc-hien';
import Suathuchien from './pages/sua-thuc-hien';

import Thanhtoan from './pages/ho-so-thanh-toan';
import Thuchienthanhtoan from './pages/thuc-hien-thanh-toan';
import Hosono from './pages/ho-so-no';
import Hosonodetail from './pages/ho-so-no-detail';

import Danhthumotngay from './pages/Doanh-thu-mot-ngay';
import Quanlynhanvien from './pages/quan-ly-nhan-vien';
import Quanlynguoidung from './pages/quan-ly-nguoi-dung';
import Quanlyhoso from './pages/quan-ly-ho-so';
import Suathongtinhanvien from './pages/sua-thong-tin-nhan-vien';
import Nhanvienbixoa from './pages/nhan-vien-bi-xoa';
import Nguoidungbixoa from './pages/nguoi-dung-bi-xoa';
import Hosonodetailquanly from './pages/ho-so-chi-tiet-quan-ly';
import Hoadonbixoa from './pages/hoa-don-bi-xoa';
import Hosonobixoa from './pages/ho-so-no-bị-xoa';




function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const PrivateRoute = ({ component: Component, allowedStatus, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        if (!userInfo) {
          return <Redirect to="/login" />;
        }
  
        // Kiểm tra xem userInfo.status có nằm trong danh sách allowedStatus không
        if (allowedStatus.includes(userInfo.status)) {
          return (
            <div>
              {userInfo && (
                <>
                  <div className="header">
                    {userInfo && <Header />}
                  </div>
                  <div className="footer">
                    <div className="menu">
                      {userInfo && <Sidebar />}
                    </div>
                    <div className="content">
                      <Component {...props} />
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        } else {
          // Nếu không có quyền, có thể chuyển hướng hoặc hiển thị thông báo lỗi
          // return <Redirect to="/unauthorized" />;
        }
      }}
    />
  );
  

  return (
    <div className="App">
      <Router>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/register">
          <SignupPage />
        </Route>

        <ResetScroll />

        {/* <Route path="/" exact>
          <HomePage />
        </Route> */}
        {/* <PrivateRoute path="/" component={HomePage} /> */}

        <PrivateRoute
          path="/"
          component={HomePage}
          allowedStatus="chu"
        />

        <PrivateRoute
          path="/thong-tin-nguoi-dung"
          component={Thongtinuser}
          allowedStatus="nguoi-dung"
        />

        <PrivateRoute
          path="/sua-nguoi-dung/:userid"
          component={Suanguoidung}
          allowedStatus="nguoi-dung"
        />

        <PrivateRoute
          path="/dat-lich-nguoi-dung"
          component={Datlichnguoidung}
          allowedStatus="nguoi-dung"
        />

        <PrivateRoute
          path="/lich-hen-nguoi-dung"
          component={Lichhennguoidung}
          allowedStatus="nguoi-dung"
        />

        <PrivateRoute
          path="/lich-su-kham-benh"
          component={Lichsukhambenh}
          allowedStatus="nguoi-dung"
        />

        <PrivateRoute
          path="/ho-so-nguoi-dung"
          component={Hosonguoidung}
          allowedStatus="nguoi-dung"
        />

        <PrivateRoute
          path="/ho-so-nguoi-dung-chi-tiet/:medicalrecord_Id"
          component={Hosonguoidungdetail}
          allowedStatus="nguoi-dung"
        />

        <PrivateRoute
          path="/tiep-nhan-le-tan"
          component={Tiepnhanletan}
          allowedStatus="le-tan"
        />

        
        <PrivateRoute
          path="/them-tiep-nhan"
          component={Themtiepnhan}
          allowedStatus="le-tan"
        />

        <PrivateRoute
          path="/sua-tiep-nhan-le-tan/:appoinId"
          component={Suatiepnhana}
          allowedStatus="le-tan"
        />

        <PrivateRoute
          path="/le-tan-lich-hen"
          component={Lichhenletan}
          allowedStatus="le-tan"
        />

        <PrivateRoute
          path="/quan-ly-kho"
          component={Quanlykho}
          allowedStatus="le-tan"
        />

        <PrivateRoute
          path="/thong-tin-le-tan"
          component={Thongtinletan}
          allowedStatus="le-tan"
        />

        <PrivateRoute
          path="/sua-le-tan"
          component={Sualetan}
          allowedStatus="le-tan"
        />

        <PrivateRoute
          path="/tiep-nhan-chuan-doan"
          component={Tiepnhanchuandoan}
          allowedStatus="chuan-doan"
        />

        <PrivateRoute
          path="/thong-tin-chuan-doan"
          component={Thongtinchandoan}
          allowedStatus="chuan-doan"
        />  

        <PrivateRoute
          path="/sua-chuan-doan"
          component={Suachuandoan}
          allowedStatus="chuan-doan"
        />

        <PrivateRoute
          path="/chuan-doan"
          component={Chuandoan}
          allowedStatus="chuan-doan"
        />

        <PrivateRoute
          path="/chuan-doan-thuc-hien/:medicalrecord_Id"
          component={Chuandoanthuchien}
          allowedStatus="chuan-doan"
        />

        <PrivateRoute
          path="/tiep-nhan-thuc-hien"
          component={Tiepnhanthuchien}
          allowedStatus="thuc-hien"
        />

        <PrivateRoute
          path="/thong-tin-thuc-hien"
          component={Thongtinthuchien}
          allowedStatus="thuc-hien"
        />

        <PrivateRoute
          path="/thong-tin-nguoi-thuc-hien"
          component={Thongtinguoithuchien}
          allowedStatus="thuc-hien"
        />

        <PrivateRoute
          path="/dang-thuc-hien/:medicalrecord_Id"
          component={Dangthuchien}
          allowedStatus="thuc-hien"
        />

        <PrivateRoute
          path="/sua-thuc-hien/:userid"
          component={Suathuchien}
          allowedStatus="thuc-hien"
        />

        <PrivateRoute
          path="/ho-so-thanh-toan"
          component={Thanhtoan}
          allowedStatus="thu-ngan"
        />

        <PrivateRoute
          path="/thuc-hien-thanh-toan/:medicalrecord_Id"
          component={Thuchienthanhtoan}
          allowedStatus="thu-ngan"
        />
          <PrivateRoute
          path="/ho-so-no"
          component={Hosono}
          allowedStatus="thu-ngan"
        />

        <PrivateRoute
          path="/ho-so-no-chi-tiet/:medicalrecord_Id"
          component={Hosonodetail}
          allowedStatus="thu-ngan"
        />

        <PrivateRoute
          path="/thong-tin-nguoi-thu-ngan"
          component={Thongtinguoithuchien}
          allowedStatus="thu-ngan"
        />

        <PrivateRoute
          path="/sua-thu-ngan/:userid"
          component={Suathuchien}
          allowedStatus="thu-ngan"
        />

        <PrivateRoute
          path="/doanh-thu-trong-trong-ngay"
          component={Danhthumotngay}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/quan-ly-nhan-vien"
          component={Quanlynhanvien}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/quan-ly-nguoi-dung"
          component={Quanlynguoidung}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/quan-ly-ho-so"
          component={Quanlyhoso}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/quan-ly-ho-so-no"
          component={Hosono}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/sua-thong-tin-nhan-vien/:user_id"
          component={Suathongtinhanvien}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/nhan-vien-bi-xoa"
          component={Nhanvienbixoa}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/nguoi-dung-bi-xoa"
          component={Nguoidungbixoa}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/ho-so-chi-tiet-quan-ly/:medicalrecord_Id"
          component={Hosonodetailquanly}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/ho-so-no-chi-tiet-quan-ly/:medicalrecord_Id"
          component={Hosonodetailquanly}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/ho-so-bi-xoa"
          component={Hoadonbixoa}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/ho-so-no-bi-xoa"
          component={Hosonobixoa}
          allowedStatus="admin"
        />

        <PrivateRoute
          path="/product"
          component={ProductPage}
        />


        <Route path="/detail/:id">
          <DetailPage />
        </Route>

        <PrivateRoute path="/cart" component={CartPage} />

        <PrivateRoute path="/order" component={OrderPage} />

        <PrivateRoute path="/orderSuccess" component={OrderSuccessPage} />

        <PrivateRoute path="/payment" component={PaymentPage} />

        <PrivateRoute path="/MyOrder" component={MyOrderPage} />

        <PrivateRoute path="/search" component={SearchPage} />

        <PrivateRoute path="/chat" component={ChatPage} />

        <PrivateRoute path="/admin" component={AdminPage} />

      </Router>
    </div>
  );
}

export default App;
