import React, { useEffect } from 'react';
import './tai-kham.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Receiveback, Receiveup} from '../../actions/ChuandoanAction';
import { getMedicalrecord, getMedicalrecordup, getMedicalrecordback , seachphone} from '../../actions/ThuchienAction';
import moment from 'moment';
import { useForm } from 'react-hook-form';

function Tiepnhan(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const userSignin = useSelector((state) => state.userSignin);
  
  const { userInfo } = userSignin;
  console.log(userInfo)

  let status = '';
  
  if (userInfo.status === 'le-tan') {
    status = 'le-tan';
  } else if (userInfo.status === 'chuan-doan') {
    status = 'chuan-doan';
  }
  

  console.log(status);
  console.log(userInfo.status);

  const medicalrecords = useSelector((state) => state.thuchiens.medicalrecordtiepnhans);
  const medicals = medicalrecords;

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };
  
  const onSubmit = (phone) => {
      dispatch(seachphone(phone));
      console.log(phone)
  };

  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">Danh sách hồ sơ tái khám</h2>
      </div>
      <div className="search_lich4">
        <div className="conditon4">
            <form className="from_datlich"  onSubmit={handleSubmit(onSubmit)}>
            <strong>Nhập số điện thoại: </strong>
            <input className='seach_phone' type="text" {...register('phone')}/>
            <button type="submit" className="seachphone" value="Chuấn đoán">
                Tìm kiếm
            </button>
            </form>
        </div>
      </div>
      <div>
        <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Mã bệnh nhân</th>
              <th>Tên</th>
              <th>Dịch vụ</th>
              <th>Ngày tái khám</th>
              <th>Ghi chú</th>
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
                  <td>{formatDate(medical.re_examination)}</td>
                  <td>{medical.note}</td>
                  <Link to={`/ho-so-tai-kham-chi-tiet/${medical._id}`} className="">
                    <i className="ti-pencil-alt " style={{ paddingTop: '10px' }}></i>
                    </Link>
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
