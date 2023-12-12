import './dat-lich.css';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { datlich } from '../../actions/UserAction';

// import { useEffect } from 'react';

function Datlich(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        dispatch(datlich(userInfo._id, data));
    }

  return (
    <section className="datlich">
      <h1>Đặt lịch khám bệnh</h1>
      <form className="from_datlich" onSubmit={handleSubmit(onSubmit)}>
        <div className="input_date">
        <span>Chọn ngày khám bệnh:</span>
          <input 
          type="date"
          {...register('date')} 
          required />
        </div>

        <div className="input_date">
        <span>Chọn dịch vụ khám bệnh:</span>
        <select 
        className="service" 
        id="cars"
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
            {...register('note')} 
           />
        </div>

        <button type="submit" className="datlich__submit" value="Đăng nhập">
          <span className="button__text">Đặt lịch</span>
        </button>
        
      </form>
    </section>
  );
}

export default Datlich;
