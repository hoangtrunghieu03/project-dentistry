import React, { useEffect } from 'react';
import './chuandoan.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllMedicalRecords } from '../../actions/ChuandoanAction';
import moment from 'moment';


function Chuandoans(props) {
    const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  let link = '';
  let status = '';

  if (userInfo.status === 'chuan-doan') {
    link = '/chuan-doan-thuc-hien';
    status = 'chuan-doan';
  } else if (userInfo.status === 'thuc-hien') {
    link = '/dang-thuc-hien';
    status = 'dang-thuc-hien'
  } else if (userInfo.status === 'thu-ngan') {
    link = '/thuc-hien-thanh-toan';
    status = 'thanh-toan'
  } else {
    link = '/default-link';
  }
  
  useEffect(() => {
    dispatch(getAllMedicalRecords(status));
  }, [dispatch]);

  console.log(userInfo.status);
  console.log(link);
  

  const medicalrecords = useSelector((state) => state.hosos.medicalrecords);

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
            <Link to={`${link}/${medicalrecord._id}`} className="">
                Thực hiện
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

export default Chuandoans;
