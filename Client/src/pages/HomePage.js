import React from "react";
import Header from "../components/header/Header";
// import Header from "../components/layout/header/Header";
// import Sidebar from "../components/layout/sidebar/Sidebar";
// import Carousel from "../components/Slider/Carousel";
import IPhone from "../components/HotSale/components/Iphone";
import Samsung from "../components/HotSale/components/Samsung";
import Xiaomi from "../components/HotSale/components/Xiaomi";
import Footer from "../components/footer/Footer";
import AppChat from "../components/AppChat/AppChat";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { useSelector } from "react-redux";
import NewsPage from "./NewsPage";
import { Divider } from "antd";

function HomePage(props) {
  const { userInfo } = useSelector((state) => state.userSignin);
  console.log(userInfo);
  console.log('ffff');

  return (
    <div style={{ position: "relative" }}>
      <Header></Header>
      {/* <Sidebar></Sidebar> */}
      {/* <Carousel></Carousel> */}
      <Divider />
      <div>
        <h2
          style={{
            color: "rgb(53, 151, 231)",
            fontSize: "30px",
            fontWeight: "400",
            margin: "20px 50px 10px 50px",
          }}
        >
          SẢN PHẨM NỔI BẬT
        </h2>
        <IPhone></IPhone>
        <Samsung></Samsung>
        <Xiaomi></Xiaomi>
        <NewsPage></NewsPage>
      </div>
      <Footer></Footer>
      <ScrollToTop></ScrollToTop>
      {userInfo && userInfo.isAdmin === false ? <AppChat></AppChat> : ""}
    </div>
  );
}

export default HomePage;
