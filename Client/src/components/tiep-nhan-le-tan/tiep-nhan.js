import React, { useEffect } from 'react';
import './tiep-nhan.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppointments, Deleteappoin, Updatereceive } from '../../actions/LetanAction';
import { Receiveback, Receiveup} from '../../actions/ChuandoanAction';
import moment from 'moment';

function Tiepnhan(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  
  const { userInfo } = userSignin;
  console.log(userInfo)

  let status = '';
  
  if (userInfo.status === 'le-tan') {
    status = 'le-tan';
  } else if (userInfo.status === 'chuan-doan') {
    status = 'chuan-doan';
  }
  

  useEffect(() => {
    dispatch(getAppointments(status));
  }, [dispatch]);

  console.log(status);
  console.log(userInfo.status);

  const appointments = useSelector((state) => state.letans.appointments);
  const appoins = appointments;

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };

  const handleDeleteappoin = async (appoin_id) => {
    const shouldDelete = window.confirm('Bạn có chắc muốn tiếp nhận này không?');
    if (shouldDelete) {
      dispatch(Deleteappoin(appoin_id));
    }
  };

  const handleupdatereceive = async (appoin_id) => {
    const shouldUpdate = window.confirm('Bạn có muốn chuyển qua chuẩn đoán không?');
    if (shouldUpdate) {
      dispatch(Updatereceive(appoin_id));
    }
  };

  const handleupdatereceiveback = async (appoin_id) => {
    const shouldUpdate = window.confirm('Bạn có muốn chuyển về lễ tân không?');
    if (shouldUpdate) {
      dispatch(Receiveback(appoin_id));
    }
  };

  const handleupdatereceiveup = async (appoin_id) => {
    const shouldUpdate = window.confirm('Bạn có muốn tiếp nhận không?');
    if (shouldUpdate) {
      dispatch(Receiveup(appoin_id));
    }
  };

  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">DANH SÁCH TIẾP NHẬN</h2>
        {userInfo.status === 'le-tan' && (
        <Link to={`/them-tiep-nhan`} className="add-button4">
          Thêm tiếp nhận
        </Link>
        )}
      </div>
      <div className="search_lich4">
        <div className="conditon4"></div>
      </div>
      <div>
        <table className="table_class4" >
          <thead className="table_thead4">
            <tr>
              <th>Mã bệnh nhân</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Dịch vụ</th>
              <th>Ngày khám</th>
              <th>Ghi chú</th>
              {userInfo.status === 'le-tan' && (
                <th></th>,
                <th></th>
              )}
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
                  {userInfo.status === 'le-tan' && (
                  <td style={{ cursor: 'pointer' }} >
                  <Link to={`/sua-tiep-nhan-le-tan/${appoin._id}`}>
                    <i className="ti-pencil-alt"></i>
                  </Link>
                  </td>
                  )}

                  {userInfo.status === 'le-tan' && (
                  <td
                    onClick={() => handleDeleteappoin(appoin._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti-trash"></i>
                  </td>
                  )}
                  {userInfo.status === 'le-tan' && (
                  <td
                    onClick={() => handleupdatereceive(appoin._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti-export"></i>
                  </td>
                  )}

                  {userInfo.status === 'chuan-doan' && (
                  <td
                    onClick={() => handleupdatereceiveback(appoin._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti-export"></i>
                  </td>
                  )}

                  {userInfo.status === 'chuan-doan' && (
                  <td
                    onClick={() => handleupdatereceiveup(appoin._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti-import"></i>
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

export default Tiepnhan;
