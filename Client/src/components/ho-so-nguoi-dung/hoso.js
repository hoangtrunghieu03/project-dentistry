import React, { useEffect } from 'react';
import './hoso.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllhoso } from '../../actions/UserAction';
import moment from 'moment';


function Hosono(props) {
    const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  
  useEffect(() => {
    dispatch(getAllhoso(userInfo._id));
  }, [dispatch]);

  console.log(userInfo.status);
  

  const medicalrecords = useSelector((state) => state.hosonguoidungs.hosonguoidung);

  console.log(medicalrecords)

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };
  
  return (
    <div className='chuandoan'>
        <div class="staff">
            <h2>Danh sách hồ sơ bệnh án</h2>
        </div>
        <div class="content-wrapper">
            {medicalrecords && medicalrecords.length > 0 ? (
              medicalrecords.map((medicalrecord) => (
            <div class="frame">
            <h2>{medicalrecord.name}</h2>
            <br />
            <strong>Dịch vụ:</strong> {medicalrecord.service}
            <br />
            <br />
            <strong>Ngày:</strong> {formatDate(medicalrecord.date)}
            <br />
            <br />
            <Link to={`/ho-so-nguoi-dung-chi-tiet/${medicalrecord._id}`} className="">
                Xem chi tiết
                <i className="ti-pencil-alt" style={{ marginLeft: '6px' }}></i>
            </Link>
            </div>
            ))
            ) : (
                <span style={{ color: '#000', marginLeft: '40px' }}>Không có hồ sơ</span>
            )}
        </div>
    </div>
  );
}

export default Hosono;
