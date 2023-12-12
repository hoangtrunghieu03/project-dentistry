import React from "react";
import "./News.css";
import { Divider } from "antd";

export const News = () => {
  return (
    <>
      <Divider />
      <div className="form-news">
        <a href="/" className="news-title">
          TIN CÔNG NGHỆ
        </a>
        <div className="container-news">
          <div className="news">
            <a
              href="https://cellphones.com.vn/sforum/discord-nitro-la-gi"
              className="news-items"
            >
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/discord-nitro-la-gi.jpg"
                alt="Discord Nitro là gì? Có nên nâng cấp Nitro Discord không?"
                className=""
              />{" "}
              <p className="">
                Discord Nitro là gì? Có nên nâng cấp Nitro Discord không?
              </p>
            </a>
            <a
              href="https://cellphones.com.vn/sforum/tren-tay-tecno-phantom-v-fold"
              className="news-items"
            >
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/cover-phantom-v.jpg"
                alt="Trên tay Tecno Phantom V Fold tại Việt Nam: Điện thoại gập dạng ngang rẻ nhất thế giới, giá từ 25 triệu đồng"
                class="p-1"
              />
              <p className="">
                Trên tay Tecno Phantom V Fold tại Việt Nam: Điện thoại gập dạng
                ngang rẻ nhất thế giới, giá từ 25 triệu đồng
              </p>
            </a>
          </div>
          <div className="news">
            <a
              href="https://cellphones.com.vn/sforum/iqoo-tws-air-pro-ra-mat-thiet-ke-giong-airpods-khu-tieng-on-chu-dong-gia-1-trieu-dong"
              className="news-items"
            >
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/iQOO-TWS-Air-Pro-1024x507-1.jpeg"
                alt="iQOO TWS Air Pro ra mắt: Thiết kế giống AirPods, khử tiếng ồn chủ động, giá 1 triệu đồng"
                class=""
              />
              <p className="">
                iQOO TWS Air Pro ra mắt: Thiết kế giống AirPods, khử tiếng ồn
                chủ động, giá 1 triệu đồng
              </p>
            </a>
            <a
              href="https://cellphones.com.vn/sforum/apple-cap-nhat-final-cut-pro-va-logic-pro-cho-mac-de-ho-tro-cac-ung-dung-ipad-moi"
              className="news-items"
            >
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/General-Final-Cut-Pro-Feature.jpeg"
                alt="Apple cập nhật Final Cut Pro và Logic Pro cho Mac để hỗ trợ các ứng dụng iPad mới"
                class="p-1"
              />
              <p className="">
                Apple cập nhật Final Cut Pro và Logic Pro cho Mac để hỗ trợ các
                ứng dụng iPad mới
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
