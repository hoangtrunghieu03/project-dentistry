import React from "react";
import "./lienhe.css";

function Lienhe(props) {
  return (
    <div className="contents">
      <div className="contact-1">
        <div className="section-header text-center">
          <p>Liên Hệ</p>
          <h1>Liên hệ với chúng tôi</h1>
          <div className="row align-items-center contact-information">
            <div className="col-md-6 col-lg-3">
              <div className="contact-info">
                <div className="contact-icon">
                  <i className="fa fa-map-marker-alt" />
                </div>
                <div className="contact-text">
                  <h3>Địa chỉ</h3>
                  <p>170 Nguyễn Hữu Thọ, Q. Hải Châu, Tp. Đà Nẵng</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="contact-info">
                <div className="contact-icon">
                  <i className="fa fa-phone-alt" />
                </div>
                <div className="contact-text">
                  <h3>Số điện thoại</h3>
                  <p>0236. 3811.899 </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="contact-info">
                <div className="contact-icon">
                  <i className="fa fa-envelope" />
                </div>
                <div className="contact-text">
                  <h3>Email </h3>
                  <p>tienrhm2008@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="contact-info">
                <div className="contact-icon">
                  <i className="fa fa-share" />
                </div>
                <div className="contact-text">
                  <h3>Theo dõi</h3>
                  <div className="contact-social">
                    <a href="">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="">
                      <i className="fab fa-youtube" />
                    </a>
                    <a href="">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-2">
        <div className="row contact-form">
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.4254544539067!2d108.20736707489411!3d16.043397140129436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b79657dacf%3A0x5611fb292cb007e7!2sNha%20Khoa%20A%26T!5e0!3m2!1svi!2s!4v1701178720060!5m2!1svi!2s"
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="col-md-6">
            <div id="success" />
            <form name="sentMessage" id="contactForm" noValidate="novalidate">
              <div className="control-group">
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Your Name"
                  required="required"
                  data-validation-required-message="Please enter your name"
                />
                <p className="help-block text-danger" />
              </div>
              <div className="control-group">
                <input
                  type="email"
                  className="form-control"
                  id=""
                  placeholder="Your Email"
                  required="required"
                  data-validation-required-message="Please enter your email"
                />
                <p className="help-block text-danger" />
              </div>
              <div className="control-group">
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Subject"
                  required="required"
                  data-validation-required-message="Please enter a subject"
                />
                <p className="help-block text-danger" />
              </div>
              <div className="control-group">
                <textarea
                  className="form-control"
                  id=""
                  placeholder="Message"
                  required="required"
                  data-validation-required-message="Please enter your message"
                  defaultValue={""}
                />
                <p className="help-block text-danger" />
              </div>
              <div>
                <button className="btn custom-btn" type="submit" id="">
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lienhe;
