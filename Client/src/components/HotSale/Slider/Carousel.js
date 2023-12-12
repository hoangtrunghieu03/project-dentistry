import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let {  slider1, slider2 } = props;
  const [nav, setNav] = useState({ nav1: null, nav2: null });
  
  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const next = () => {
    console.log(slider1);
    slider1.slickNext();
  };
  const previous = () => {
    slider2.slickPrev();
  };

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider
              asNavFor={nav.nav2}
              ref={(slider) => (slider1 = slider)}
              {...settings}
            >
              <div key={1}>
                <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/redmi-note12s-004-sliding.png"></img>
              </div>
              <div key={2}>
                <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/nord-ce-3-lite-sliding.png"></img>
              </div>
              <div key={3}>
                <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/x5-pro-sliding.png"></img>
              </div>
              <div key={4}>
                <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/fold-right-th5-new.png"></img>
              </div>
              <div key={5}>
                <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/vivo-v27e-sliding-moban.png"></img>
              </div>
            </Slider>
            <div className="carousel-left-move" onClick={() => previous()}>
              <div className="prev">
                <LeftOutlined></LeftOutlined>
              </div>
              <div className="next" onClick={() => next()}>
                <RightOutlined></RightOutlined>
              </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider
              asNavFor={nav.nav1}
              ref={(slider) => (slider2 = slider)}
              slidesToShow={5}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              <div>
                REDMI NOTE 12 SERIES <br></br> Mở bán deal hời
              </div>
              <div>
                NORD CE 3 LITE <br></br> Trải nghiệm vượt trội
              </div>
              <div>
                POCO X5 | X5 PRO <br></br> Giá chỉ 5.45 triệu
              </div>
              <div>
                GALAXY FOLD4<br></br> Giá rẻ bất ngờ
              </div>
              <div>
                VIVO V27E <br></br> Mở bán giá sốc
              </div>
            </Slider>
          </div>
        </div>
        <div className="carousel-right">
          <div className="carousel-right-item">
            <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/fold-right-th5-new.png"></img>
          </div>
          <div className="carousel-right-item">
            <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-banner-th5-newww1.jpg"></img>
          </div>
          <div className="carousel-right-item">
            <img alt="" src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-banner-ideapad-3.jpg"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
