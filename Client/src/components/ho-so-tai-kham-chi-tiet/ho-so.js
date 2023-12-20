import React, { useEffect } from 'react';
import './ho-so.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getMedicalRecorddetail, updateMedicalRecorddetail, MedicalRecorddetailup } from '../../actions/ThuchienAction';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';


function Thuchien(props) {
  const dispatch = useDispatch();
  const { medicalrecord_Id } = useParams();
  const { register, handleSubmit } = useForm();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    dispatch(getMedicalRecorddetail(medicalrecord_Id));
  }, [dispatch, medicalrecord_Id]);

  const medicalrecord = useSelector((state) => state.dangthuchien.medicalrecordetail);

  if (!medicalrecord) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };

  const onSubmit = (data) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    
    const selectedDate = moment(data.re_examination, 'YYYY-MM-DD').toDate();
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate.getTime() < currentDate.getTime()) {
      alert('Ngày tái khám không phù hợp');
      return;
    }
    
  
    const shouldUpdate = window.confirm('Bạn có muốn cập nhật hồ sơ không?');
    if (shouldUpdate) {
      dispatch(updateMedicalRecorddetail(medicalrecord_Id, data));
    }
  };
  const handleupdatereceiveup = async (medicalrecord_Id) => {
    const shouldUpdate = window.confirm('Bạn có muốn chuyển hồ sơ không?');
    if (shouldUpdate) {
      dispatch(MedicalRecorddetailup(medicalrecord_Id));
    }
  };
  
  return (
    <div className='chuandoan'>
        <div class="staff">
            <h1>Thực hiện tái khám</h1>
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
            <strong>Ngày tái khám: </strong>
            <input 
              defaultValue={moment(medicalrecord.re_examination).format('YYYY-MM-DD')}
              type="date" 
              {...register('re_examination')} 
              required
            />
            <br />
            <br />
            <strong>Thông tin thực hiện: </strong>
            <br />
            <textarea 
                defaultValue={medicalrecord.tools}
              {...register('tools')}
              required
            ></textarea>
        <button type="submit" className="datlich__submits" value="Chuấn đoán">
          Thực hiện
        </button>
        </div>
        </form>
    </div>
  );
}

export default Thuchien;
