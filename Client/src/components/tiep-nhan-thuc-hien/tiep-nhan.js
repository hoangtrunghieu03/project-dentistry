import React, { useEffect } from 'react';
import './tiep-nhan.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Receiveback, Receiveup} from '../../actions/ChuandoanAction';
import { getMedicalrecord, getMedicalrecordup, getMedicalrecordback } from '../../actions/ThuchienAction';
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
    dispatch(getMedicalrecord('thuc-hien'));
  }, [dispatch]);

  console.log(status);
  console.log(userInfo.status);

  const medicalrecords = useSelector((state) => state.thuchiens.medicalrecordtiepnhans);
  const medicals = medicalrecords;

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };

  const handleupdatereceiveback = async (medicalrecord_Id) => {
    const shouldUpdate = window.confirm('Bạn có muốn chuyển hồ sơ về chuẩn đoán không?');
    if (shouldUpdate) {
      dispatch(getMedicalrecordback(medicalrecord_Id));
    }
  };

  const handleupdatereceiveup = async (medicalrecord_Id) => {
    const shouldUpdate = window.confirm('Bạn có muốn tiếp nhận hồ sơ không?');
    if (shouldUpdate) {
      dispatch(getMedicalrecordup(medicalrecord_Id));
    }
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
            {medicals && medicals.length > 0 ? (
              medicals.map((medical) => (
                <tr className="frame" key={medical._id}>
                  <td>{medical.user_Id}</td>
                  <td>{medical.name}</td>
                  <td>{medical.service}</td>
                  <td>{formatDate(medical.date)}</td>
                  <td>{medical.note}</td>
                  <td
                    onClick={() => handleupdatereceiveback(medical._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti-back-right"></i>
                  </td>

                  <td
                    onClick={() => handleupdatereceiveup(medical._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="ti-back-left"></i>
                  </td>
                </tr>
              ))
            ) : (
              <span style={{ color: '#000', marginLeft: '40px' }}>Không có hồ sơ</span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tiepnhan;
