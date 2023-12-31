import React, { useEffect } from 'react';
import './hoso.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getMedicalRecorddetail, updateMedicalRecorddetail } from '../../actions/ThanhtoanAction';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';


function Hoso(props) {
    const dispatch = useDispatch();
    const {medicalrecord_Id } = useParams();
    console.log(medicalrecord_Id);
    const { register, handleSubmit } = useForm(); 

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  
  useEffect(() => {
    dispatch(getMedicalRecorddetail(medicalrecord_Id));
  }, [dispatch, medicalrecord_Id]);

  

  const medicalrecord = useSelector((state) => state.hoadon.hoadondetail);

  console.log(medicalrecord)

  if (!medicalrecord) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };

  const onSubmit = (data) => {
    const shouldUpdate = window.confirm('Bạn có muốn xác nhận thanh toán');
    if (shouldUpdate) {
      dispatch(updateMedicalRecorddetail(medicalrecord_Id, data, medicalrecord.status));
    }
  };

  // const handleupdatereceiveup = async (medicalrecord_Id) => {
  //   const shouldUpdate = window.confirm('Bạn có muốn chuyển hồ sơ không?');
  //   if (shouldUpdate) {
  //     dispatch(MedicalRecorddetailup(medicalrecord_Id));
  //   }
  // };
  
  return (
    <div className='chuandoan'>
        <div class="staff">
            <h1>Chi tiết hồ sơ</h1>
        </div>
        <form className="from_datlich" onSubmit={handleSubmit(onSubmit)}>
        <div class="content-wrappers">
            <h1>Hồ sơ bệnh án</h1>
            <br />
            <br />
            <strong>Tên bệnh nhân: </strong> {medicalrecord.name}
            <br />
            <br />
            <strong>Ngày sinh: </strong> {formatDate(medicalrecord.birthday)}
            <br />
            <br />
            <strong>Giới tính: </strong> {medicalrecord.sex}
            <br />
            <br />
            <strong>Dịch vụ: </strong> {medicalrecord.service}
            <br />
            <br />
            <strong>Ngày khám: </strong> {formatDate(medicalrecord.date)}
            <br />
            <br />
            <strong>Ghi chú: </strong> 
            <br />
            {medicalrecord.service}
            <br />
            <br />
            <strong>Chuẩn đoán của bác sĩ: </strong>
            <br />
            {medicalrecord.diagnostic}
            <br />
            <br />
            <strong>Thông tin thực hiện: </strong>
            <br />
            {medicalrecord.tools}
            <br />
            <br />
            <strong>Số Tiền trả: </strong> {medicalrecord.payment} VND
            <br />
            <br />
            <strong>Số tiền nợ: </strong> {medicalrecord.debt} VND
            <br />
            <br />
            <strong>Tổng hóa đơn: </strong> {medicalrecord.totalmoney} VND
            <br />
            <br />
        {/* <button type="submit" className="datlich__submit" value="Chuấn đoán">
          <span className="button__text">xác nhận</span>
        </button> */}

        {/* {medicalrecord.totalmoney && (
          <span style={{marginLeft: '80px'}} className="button__text"onClick={() => handleupdatereceiveup(medicalrecord._id)}>Chuyển phòng</span>
        )} */}
        </div>
        </form>
    </div>
  );
}

export default Hoso;
