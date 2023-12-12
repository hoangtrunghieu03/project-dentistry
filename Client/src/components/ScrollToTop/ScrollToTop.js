import React, { useEffect, useState } from 'react';
import './ScrollToTop.css'
import { ToTopOutlined} from '@ant-design/icons';
import { BackTop } from "antd";


function ScrollToTop(props) {
  const [heightPage, setHeightPage] = useState(0);
  const handleScroll = () => {
    setHeightPage(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="scroll">
      {heightPage > 1000 ? (
        <div>
          <BackTop
            className="scrolltotop animate__heartBeat"
            style={{ color: "white", right: "85px" }}
          >
           <ToTopOutlined />
            <p>Lên đầu</p>
          </BackTop>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default ScrollToTop;