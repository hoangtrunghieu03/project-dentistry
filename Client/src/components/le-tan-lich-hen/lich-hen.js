import React, { useEffect } from 'react';
import './lich-hen.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppointments, Deletelichhen, Updatelichhen } from '../../actions/LetanAction';
import moment from 'moment';

function Lichen(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointments('nguoi-dung'));
  }, [dispatch]);

  const appointments = useSelector((state) => state.letans.appointments);
  const appoins = appointments;

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };

  const handleDeleteappoin = async (appoin_id) => {
    const shouldDelete = window.confirm('Bạn có chắc muốn xóa lịch hẹn này không?');
    if (shouldDelete) {
      dispatch(Deletelichhen(appoin_id));
    }
  };

  const handleupdatereceive = async (appoin_id) => {
    const shouldUpdate = window.confirm('Bạn có muốn chuyển lịch hẹn không?');
    if (shouldUpdate) {
      dispatch(Updatelichhen(appoin_id));
    }
  };

  const isSameDate = (date) => {
    const currentDate = new Date();
    const appoinDate = new Date(date);
    return currentDate.toDateString() === appoinDate.toDateString();
  };
  

  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">DANH SÁCH TIẾP NHẬN</h2>
      </div>
      <div className="search_lich4">
        <div className="conditon4"></div>
      </div>
      <div>
        <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Mã bệnh nhân</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Dịch vụ</th>
              <th>Ngày khám</th>
              <th>Ghi chú</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {appoins && appoins.length > 0 ? (
            appoins.map((appoin) => (
              <tr className="frame" key={appoin._id}>
                <td>{appoin.user_Id}</td>
                <td>{appoin.name}</td>
                <td>{appoin.phone}</td>
                <td>{appoin.service}</td>
                <td>{formatDate(appoin.date)}</td>
                <td>{appoin.note}</td>
                <td
                  onClick={() => handleDeleteappoin(appoin._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="ti-trash"></i>
                </td>
                {isSameDate(appoin.date) && (
                  <td
                    onClick={() => handleupdatereceive(appoin._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti-back-right"></i>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <span style={{ color: '#000', marginLeft: '40px' }}>Không có lịch hẹn</span>
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lichen;
