import React, { useState } from 'react';
import './addtiep-nhan.css';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { themnguoikham } from '../../actions/LetanAction';


function Addtiepnhan(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); 

  const onSubmit = (data) => {
    console.log(data);
    // const shouldUpdate = window.confirm('Bạn có tiếp nhận hồ sơ không?');
    // if (shouldUpdate) {
    //   dispatch(themnguoikham(data));
    // }
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  console.log(currentDate);

  return (
    <section className="datlich">
    <h1>Thêm người khám bệnh</h1>
    <form className="from_datlich" onSubmit={handleSubmit(onSubmit)}>
    <div className="input_date"> 
      <span>Nhập tên bệnh nhân:</span>
        <input 
        className='tell'
        type="text"
        {...register('name')} 
        required />
      </div>
      
    <div className="input_date"> 
      <span>Nhập số điện thoại bệnh nhân:</span>
        <input 
        className='tell'
        type="tel"
        {...register('phone')} 
        required />
      </div>

      <div className="input_date">
        <span>Email bệnh nhân:</span>
        <input
          className="tell"
          type="email"
          {...register('email')}
          required
        />
      </div>

      <div className="input_date"> 
        <span>Nhập ngày sinh:</span>
        <input 
          type="date"
          {...register('birthday')} 
          required 
        />
      </div>

      <div className="input_date">
      <span>Chọn giới tính:</span>
      <select 
      className="service" 
      id="cars"
      {...register('sex')} 
      required
      >
        <option value="">Chọn giới tính</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>  
      </select>
      </div>
      
      <div className="input_date"> 
        <span>Ngày khám bệnh:</span>
        <input 
          type="date"
          {...register('date')} 
          defaultValue={currentDate} 
          required 
          readOnly // Thêm thuộc tính readOnly ở đây
        />
      </div>


      {/* <div className="input_date">
        <span>Chọn dịch vụ khám bệnh:</span>
        <select 
          className="service" 
          id="services" 
          {...register('services', { required: true })}
          multiple // Thêm thuộc tính multiple ở đây
        >
          <option value="Niềng răng">Niềng răng</option>
          <option value="Cấy IMPLANT">Cấy IMPLANT</option>
          <option value="Lấy cao răng">Lấy cao răng</option>
        </select>
      </div> */}

<div className="input_date">
  <span>Chọn dịch vụ khám bệnh:</span>
  <div>
    <input
      type="checkbox"
      id="service1"
      name="services"
      value="Niềng răng"
      {...register('services')}
    />
    <label htmlFor="service1">Niềng răng</label>
  </div>

  <div>
    <input
      type="checkbox"
      id="service2"
      name="services"
      value="Cấy IMPLANT"
      {...register('services')}
    />
    <label htmlFor="service2">Cấy IMPLANT</label>
  </div>

  <div>
    <input
      type="checkbox"
      id="service3"
      name="services"
      value="Lấy cao răng"
      {...register('services')}
    />
    <label htmlFor="service3">Lấy cao răng</label>
  </div>
</div>



      <div className="input_date">
      <span>Ghi chú:</span>
        <textarea
          rows="4"
          {...register('note')} 
         />
      </div>

      <button type="submit" className="datlich__submit" value="Đăng nhập">
        <span className="button__text">Tiếp nhận</span>
      </button>

    </form>
  </section>
  );
}

export default Addtiepnhan;
