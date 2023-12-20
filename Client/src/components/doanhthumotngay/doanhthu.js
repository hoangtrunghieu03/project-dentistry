import React, { useEffect } from 'react';
import './doanhthu.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getdoanhthutrongngay, getdoanhthutrongthang, getdoanhthutrongnam } from '../../actions/AdminthuAction';
import moment from 'moment';


function Doanhthu(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getdoanhthutrongthang());
        dispatch(getdoanhthutrongngay());
        dispatch(getdoanhthutrongnam());
    }, [dispatch ]);

    const doanhthungay = useSelector((state) => state.doanhthu.doanhthungay);
    const doanhthuthang = useSelector((state) => state.doanhthus.doanhthuthang);
    const doanhthunam = useSelector((state) => state.doanhthuss.doanhthunam);

    console.log(doanhthunam)

    console.log(doanhthungay)
    if (!doanhthungay) {
        return <div>Loading...</div>;
      }

      if (!doanhthuthang) {
        return <div>Loading...</div>;
      }

      if (!doanhthunam) {
        return <div>Loading...</div>;
      }
      const formatDate = (date) => {
        return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
      };

      const formatMonth = (date) => {
        return moment(date, 'YYYY/MM').format('MM/YYYY');
      };
  return (
    <div className="doanhthu">
      <div className="more4">
        <h2 className="h2ds">Doanh thu trong ngày</h2>
      </div>
      <div className="search_lich4">
        <div className="conditon4">
        </div>
      </div>
      <div>
        <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Ngày</th>
              <th>Đã thanh toán</th>
              <th>Khách còn nợ</th>
              <th>Tổng hóa đơn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><strong>{ formatDate(doanhthungay.formattedDate) }</strong></td>
                <td><strong>{ doanhthungay.totalPayment }</strong></td>
                <td><strong>{ doanhthungay.totalDebt }</strong></td>
                <td><strong>{ doanhthungay.totalTotalmoney }</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="more4">
        <h2 className="h2ds">Doanh thu trong tháng</h2>
      </div>

      <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Ngày</th>
              <th>Đã thanh toán</th>
              <th>Khách còn nợ</th>
              <th>Tổng hóa đơn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><strong>{ formatMonth(doanhthuthang.formattedDate) }</strong></td>
                <td><strong>{ doanhthuthang.totalPayment }</strong></td>
                <td><strong>{ doanhthuthang.totalDebt }</strong></td>
                <td><strong>{ doanhthuthang.totalTotalmoney }</strong></td>
            </tr>
          </tbody>
        </table>

        <div className="more4">
        <h2 className="h2ds">Doanh thu trong năm</h2>
      </div>

      <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Năm</th>
              <th>Đã thanh toán</th>
              <th>Khách còn nợ</th>
              <th>Tổng hóa đơn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><strong>{ doanhthunam.formattedDate }</strong></td>
                <td><strong>{ doanhthunam.totalPayment }</strong></td>
                <td><strong>{ doanhthunam.totalDebt }</strong></td>
                <td><strong>{ doanhthunam.totalTotalmoney }</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
  );
}

export default Doanhthu;
