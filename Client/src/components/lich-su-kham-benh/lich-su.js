import React, { useEffect } from 'react';
import moment from 'moment'; // Import thư viện moment
import './lich-su.css';
import { useSelector, useDispatch } from 'react-redux';
import { getHistoryappointment , Deleteappoin} from '../../actions/UserAction';

function Lichsu(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const appointments = useSelector((state) => state.hitoryhoso.historyappoint);
  const appoins = appointments;
  console.log(appoins);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getHistoryappointment(userInfo._id));
  }, [dispatch, userInfo._id]);

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };

  const handleDeleteappoin = async (appoin_id) => {
    dispatch(Deleteappoin(userInfo._id, appoin_id));
  }

  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">THÔNG TIN CỦA BẠN</h2>
      </div>
      <div className="search_lich4">
        <div className="conditon4"></div>
      </div>
      <div>
        <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Dịch vụ</th>
              <th>Ngày khám</th>
              <th>Khi chú</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appoins && appoins.length > 0 ? (
              appoins.map((appoin) => (
                <tr className="frame">
                  <td>{appoin.service}</td>
                  <td>{formatDate(appoin.date)}</td>
                  <td>{appoin.note}</td>
                  <td onClick={() => handleDeleteappoin(appoin._id)}><i className="ti-trash" style={{ cursor: 'pointer' }}></i></td>
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

export default Lichsu;
