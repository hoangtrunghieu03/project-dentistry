import React, { useEffect } from 'react';
import './thanh-toan.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getMedicalRecorddetail, updateMedicalRecorddetail } from '../../actions/ThanhtoanAction';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';


function Thuchien(props) {
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
    const payments = parseFloat(data.payment) || 0;
    const debts = parseFloat(data.debt) || 0;
  
    const debtreal = parseFloat(medicalrecord.debt) || 0;
  
    const actualPayment = isNaN(payments) ? 0 : payments;
    const actualDebt = isNaN(debts) ? 0 : debts;
  
    let debt = 0;
    let payment = 0;
  
    if (debtreal >= actualDebt) {
      debt = debtreal - actualDebt;
      payment = actualPayment + debt;
      
      const totalMoney = payment + actualDebt;
  
      data.totalmoney = totalMoney;
      data.payment = payment;
      data.debt = actualDebt;
  
      alert(`Số tiền bạn còn nợ là: ${actualDebt} VND. Tổng số tiền đã thanh toán là: ${payment} VND. Tổng cộng: ${totalMoney} VND`);
    
      const shouldUpdate = window.confirm('Bạn có muốn xác nhận thanh toán');
      if (shouldUpdate) {
        dispatch(updateMedicalRecorddetail(medicalrecord_Id, data, medicalrecord.status));
      }
    } else {
      alert(`Số tiền nợ lớn hơn số tiền nợ cũ!`);
    }
  };
      


  
  return (
    <div className='chuandoan'>
        <div class="staff">
            <h1>Thanh toán hồ sơ</h1>
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
            <strong>Số Tiền trả: </strong>
            <input
                value={medicalrecord.payment}
                {...register('payment')}
                required
                readOnly
            ></input>
            <br />
            <br />
            <strong>Số tiền nợ: </strong>
            <input 
              defaultValue={medicalrecord.debt}
              {...register('debt')}
              required
            ></input>
            <br />
            <br />
            <strong>Tổng tiền cần trả: </strong>
            <input 
              defaultValue={medicalrecord.totalmoney}
              required
              disabled
            ></input>
            <br />
            <br />
            <br />
            <br />
        <button type="submit" className="datlich__submit" value="Chuấn đoán">
          xác nhận
        </button>

        {/* {medicalrecord.totalmoney && (
          <span style={{marginLeft: '80px'}} className="button__text"onClick={() => handleupdatereceiveup(medicalrecord._id)}>Chuyển phòng</span>
        )} */}
        </div>
        </form>
    </div>
  );
}

export default Thuchien;