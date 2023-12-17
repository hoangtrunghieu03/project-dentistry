import React, { useEffect } from 'react';
import './sua-tiep-nhan.css';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Updatetiepnhan, getAppointment } from '../../actions/LetanAction';
import { useParams } from 'react-router-dom';

function Suatiepnhan(props) {
  const { appoinId } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); 

  useEffect(() => {
    dispatch(getAppointment(appoinId));
  }, [dispatch, appoinId]);

  const appointment = useSelector((state) => state.letan.appointment);
  console.log(appointment)

  if (!appointment) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data) => {
    const shouldUpdate = window.confirm('Bạn có muốn cập nhật hồ sơ không?');
    if (shouldUpdate) {
      dispatch(Updatetiepnhan(appoinId, data));
    }
  };

  return (
    <section className="datlich">
      <h1>Sửa thông tin tiếp nhận</h1>
      <form className="from_datlich" onSubmit={handleSubmit(onSubmit)}>
        {appointment && (
          <>
            <div className="input_date">
              <span>Nhập tên bệnh nhân:</span>
              <input
                className="tell"
                type="text"
                defaultValue={appointment.name}
                {...register('name')}
                required
              />
            </div>

            <div className="input_date">
              <span>Số điện thoại bệnh nhân:</span>
              <input
                className="tell"
                type="tel"
                defaultValue={appointment.phone}
                {...register('phone')}
                required
              />
            </div>

            <div className="input_date">
              <span>Email bệnh nhân:</span>
              <input
                className="tell"
                type="email"
                defaultValue={appointment.email}
                {...register('email')}
                required
              />
            </div>

            <div className="input_date">
              <span>Chọn giới tính:</span>
              <select 
              className="service" 
              id="cars"
              defaultValue={appointment.sex}
              {...register('sex')} 
              required
              >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>  
              </select>
            </div>

            <div className="input_date"> 
              <span>Ngày sinh:</span>
              <input 
                type="date"
                defaultValue={appointment.birthday}
                {...register('birthday')} 
                required 
              />
            </div>

            <div className="input_date">
              <span>Ngày khám bệnh:</span>
              <input
                type="date"
                {...register('date')}
                defaultValue={appointment.date}
                required
              />
            </div>

            <div className="input_date">
              <span>Chọn dịch vụ khám bệnh:</span>
              <select
                className="service"
                id="cars"
                defaultValue={appointment.service}
                {...register('service')}
                required
              >
                <option value="">Chọn dịch vụ</option>
                <option value="Niềng răng">Niềng răng</option>
                <option value="Cấy IMPLANT">Cấy IMPLANT</option>
                <option value="Lấy cao răng">Lấy cao răng</option>
              </select>
            </div>

            <div className="input_date">
              <span>Ghi chú:</span>
              <textarea
                rows="4"
                defaultValue={appointment.note}
                {...register('note')}
              />
            </div>

            <button
              type="submit"
              className="datlich__submit"
              value="Đăng nhập"
            >
              <span className="button__text">Cập nhật</span>
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export default Suatiepnhan;
