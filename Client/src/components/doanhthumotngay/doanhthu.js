import React, { useEffect } from 'react';
import './doanhthu.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getdoanhthutrongngay } from '../../actions/AdminthuAction';
import moment from 'moment';


function Doanhthu(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getdoanhthutrongngay());
    }, [dispatch ]);

    const doanhthu = useSelector((state) => state.doanhthu.doanhthudetail);

    console.log(doanhthu)
    if (!doanhthu) {
        return <div>Loading...</div>;
      }
      const formatDate = (date) => {
        return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
      };
  return (
    <div>
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
                <td><strong>{ formatDate(doanhthu.formattedDate) }</strong></td>
                <td><strong>{ doanhthu.totalPayment }</strong></td>
                <td><strong>{ doanhthu.totalDebt }</strong></td>
                <td><strong>{ doanhthu.totalTotalmoney }</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doanhthu;
