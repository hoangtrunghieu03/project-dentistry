import React, { useEffect } from 'react';
import './quanlykho.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppointments, Deleteappoin, Updatereceive } from '../../actions/LetanAction';
import moment from 'moment';

function Tiepnhan(props) {
  return (
    <secsion>
            <div className="staff4">
      <h2 className="h2nv">TRANG THIẾT BỊ</h2>
    </div>
    <div className="more4">
      <h2 className="h2ds">Danh sách thiết bị</h2>
    </div>
    <div className="search_lich4">
      <div className="conditon4">
      </div>
      <div className="but4">
        <span className="icon4"><i className="fa fa-search"></i></span>
      </div>
    </div>
    <div>
      <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
        <thead className="table_thead4">
          <tr>
            <th>Tên trang thiết bị</th>
            <th>Đơn vị</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Nguồn gốc</th>
            <th>Ngày nhập</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY CHỤP HÌNH CT</i></td>
                <td>CÁI</td>
                <td>...</td>
                <td>2.000.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY CHỤP PHIM NỘI NHA</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY HẬP VÔ TRÙNG</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY HẤP ƯỚC</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY HẤP KHÔ</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY KIT</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY RUNG RỮA DỤNG CỤ</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY THỔI CÁT</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY RUNG ĐỒ MẪU</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            <tr>
                <td><i style={{ color: 'rgb(240, 129, 9)' }}>MÁY MÀI CẦM TAY</i></td>
                <td>CÁI</td>
                <td>1</td>
                <td>30.000.000đ</td>
                <td>OSTEM</td>
                <td>25.02.2023</td>
            </tr>
            </tbody>

      </table>
    </div>
    </secsion>
  );
}

export default Tiepnhan;
