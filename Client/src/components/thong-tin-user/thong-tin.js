import React, { useState } from 'react';
import './thong-tin.css';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


function ThongTin(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  let link = '';
  
  if (userInfo.status === 'nguoi-dung') {
    link = '/sua-nguoi-dung/';
  } else if (userInfo.status === 'le-tan') {
    link = '/sua-le-tan/';
  } else if (userInfo.status === 'chuan-doan') {
    link = '/sua-chuan-doan/';
  } else if (userInfo.status === 'thuc-hien') {
    link = '/sua-thuc-hien/';
  } else if (userInfo.status === 'thu-ngan') {
    link = '/sua-thu-ngan/';
  }
  
  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">THÔNG TIN CỦA BẠN</h2>
        <Link to={`${link}${userInfo._id}`} className="add-button4">
          Sửa thông tin
        </Link>
      </div>
      <div className="search_lich4">
        <div className="conditon4">
        </div>
      </div>
      <div>
        <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Mã người dùng</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i style={{ color: 'rgb(240, 129, 9)' }}>{ userInfo._id }</i>
              </td>
              <td>{ userInfo.name }</td>
              <td>{ userInfo.email }</td>
              <td>{ userInfo.phone }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ThongTin;
