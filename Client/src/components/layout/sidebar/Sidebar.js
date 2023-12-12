/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import './Sidebar.css';

function Sidebar(props) {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log('jojoj')
  console.log(userInfo)
  console.log('kkk')

  const toggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };

  const nguoi_dung = (
    <div>
      <li className="list">
        <a href="/thong-tin-nguoi-dung">
          <i className="ti-user"></i>
          <span className="link_name">Thông tin</span>
        </a>
      </li>

      <li className="list">
        <a href="/lich-hen-nguoi-dung">
          <i className="ti-announcement"></i>
          <span className="link_name">Lịch hẹn</span>
        </a>
      </li>

      <li className="list">
        <a href="/lich-su-kham-benh">
          <i className="ti-announcement"></i>
          <span className="link_name">Lịch sử</span>
        </a>
      </li>

      <li className="list">
        <a href="/dat-lich-nguoi-dung">
          <i className="ti-calendar"></i>
          <span className="link_name">Đặt lịch</span>
        </a>
      </li>

      <li className="list">
        <a href="/ho-so-nguoi-dung">
          <i className="ti-files"></i>
          <span className="link_name">Hồ sơ bệnh án</span>
        </a>
      </li>
    </div>
  );

  const le_tan = (
    <div>
      <li className="list">
        <a href="/tiep-nhan-le-tan">
          <i className="ti-stamp"></i>
          <span className="link_name">Tiếp nhận</span>
        </a>
      </li>

      <li className="list">
        <a href="/le-tan-lich-hen">
          <i className="ti-announcement"></i>
          <span className="link_name">Lịch hẹn</span>
        </a>
      </li>

      <li className="list">
        <a href="/quan-ly-kho">
          <i className="ti-package"></i>
          <span className="link_name">Quản Lý kho</span>
        </a>
      </li>

      <li className="list">
        <a href="/thong-tin-le-tan">
          <i className="ti-user"></i>
          <span className="link_name">Thông tin</span>
        </a>
      </li>
    </div> 
  );

  const chuan_doan = (
    <div>
      <li className="list">
        <a href="/tiep-nhan-chuan-doan">
          <i className="ti-stamp"></i>
          <span className="link_name">Tiếp nhận</span>
        </a>
      </li>

      <li className="list">
        <a href="/chuan-doan">
          <i className="ti-files"></i>
          <span className="link_name">Chuẩn đoán</span>
        </a>
      </li>

      <li className="list">
        <a href="/thong-tin-chuan-doan">
          <i className="ti-user"></i>
          <span className="link_name">Thông tin</span>
        </a>
      </li>
    </div> 
  );

  const thuc_hien = (
    <div>
      <li className="list">
        <a href="/tiep-nhan-thuc-hien">
          <i className="ti-stamp"></i>
          <span className="link_name">Tiếp nhận</span>
        </a>
      </li>

      <li className="list">
        <a href="/thong-tin-thuc-hien">
          <i className="ti-files"></i>
          <span className="link_name">Thực hiện</span>
        </a>
      </li>
      <li className="list">
        <a href="/thong-tin-nguoi-thuc-hien">
          <i className="ti-user"></i>
          <span className="link_name">Thông tin</span>
        </a>
      </li>
    </div> 
  );

  const thu_ngan = (
    <div>
      <li className="list">
        <a href="/ho-so-thanh-toan">
          <i className="ti-files"></i>
          <span className="link_name">Thực hiện</span>
        </a>
      </li>

      <li className="list">
        <a href="/ho-so-no">
          <i className="ti-package"></i>
          <span className="link_name">Hồ sơ nợ</span>
        </a>
      </li>

      <li className="list">
        <a href="/thong-tin-nguoi-thu-ngan">
          <i className="ti-user"></i>
          <span className="link_name">Thông tin</span>
        </a>
      </li>
    </div> 
  );

  const admin = (
    <div>
      <li className="list">
        <a href="/doanh-thu-trong-trong-ngay">
          <i className=""></i>
          <span className="link_name">Doanh thu</span>
        </a>
      </li>

      <li className="list">
        <a href="/quan-ly-nhan-vien">
          <i className=""></i>
          <span className="link_name">Nhân viên</span>
        </a>
      </li>

      <li className="list">
        <a href="/quan-ly-nguoi-dung">
          <i className=""></i>
          <span className="link_name">Người dùng</span>
        </a>
      </li>

      <li className="list">
        <a href="/quan-ly-ho-so">
          <i className=""></i>
          <span className="link_name">Hồ sơ</span>
        </a>
      </li>

      <li className="list">
        <a href="/quan-ly-ho-so-no">
          <i className=""></i>
          <span className="link_name">Hồ sơ nợ</span>
        </a>
      </li>

      <li className="list">
        <div className="iocn-link" onClick={toggleSubMenu}>
          <a href="#">
            <i className="bx bx-headphone"></i>
            <span className="link_name">Thùng rác</span>
          </a>
          <i
            className={`bx bxs-chevron-right arrow ${
              isSubMenuVisible ? 'active' : ''
            }`}
          ></i>
        </div>
        <ul className={`sub-menu ${isSubMenuVisible ? 'show' : ''}`}>
          <li>
            <a className="link_name" href="#">
              Thùng rác
            </a>
          </li>
          <li>
            <a href="/nhan-vien-bi-xoa">Nhân viên bị xóa</a>
          </li>
          <li>
            <a href="/nguoi-dung-bi-xoa">Người dùng bị xóa</a>
          </li>
          <li>
            <a href="/ho-so-bi-xoa">Hồ sơ bị xóa</a>
          </li>
          <li>
            <a href="/ho-so-no-bi-xoa">Hồ sơ nợ bị xóa</a>
          </li>
        </ul>
      </li>

    </div> 
  );

  const loggedOutLinks = (
    <li className="list">
    </li>
  )
  
  return (
    <ul className="nav-links">
      {userInfo ? (
        userInfo.status === 'nguoi-dung' ? (
          nguoi_dung
        ) : userInfo.status === 'le-tan' ? (
          le_tan
        ) : userInfo.status === 'chuan-doan' ? (
          chuan_doan
        ) :  userInfo.status === 'thuc-hien' ? (
          thuc_hien
        ) : userInfo.status === 'thu-ngan' ? (
          thu_ngan
        ) : userInfo.status === 'admin' ? (
          admin
        ) : (
          loggedOutLinks
        )
      ) : (
        loggedOutLinks
      )}
    </ul>
  );
}

export default Sidebar;
