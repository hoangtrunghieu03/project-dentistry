import React, { useState } from 'react';
import './dat-lich.css';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { datlich } from '../../actions/UserAction';
import moment from 'moment';
import 'moment/locale/vi'; // Chọn locale cho tiếng Việt nếu cần thiết

function Datlich(props) {
  const [selectedDate, setSelectedDate] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (!selectedDate) {
      alert('Vui lòng chọn ngày khám bệnh.');
      return;
    }

    const currentDate = moment();
    const selectedMoment = moment(selectedDate, 'YYYY-MM-DD');

    if (selectedMoment.isBefore(currentDate, 'day')) {
      alert('Ngày khám không hợp lệ!');
      return;
    }

    console.log(data);
    dispatch(datlich(userInfo._id, { ...data, date: selectedDate }));
  };

  return (
    <section className="datlich">
      <div className="row align-items-center">
        <div className="col-lg-7">
          <h1>Đặt lịch khám bệnh</h1>
          <div className="booking-content">
            <div className="about-text">
              <p>
                Với cơ sở vật chất, máy móc thiết bị hiện đại cùng đội ngũ bác
                sĩ tay nghề cao, giàu kinh nghiệm, Nha khoa Bốn Răng tại Đà Nẵng
                mang đến các dịch vụ nha khoa kỹ thuật cao, chất lượng nhằm chăm
                sóc sức khỏe răng miệng tốt nhất cho khách hàng.
              </p>
              <hr />
              <p>
                Phòng khám nha khoa Bốn Răng có địa điểm rất thuận lợi cho việc
                đi lại, đậu, đổ xe ô tô, gần Trạm xe buýt và đặc biệt rất dễ tìm
                gần trường Tiểu học Lý Công Uẩn và gần nhà thờ Hòa Cường Đối
                diện đường Tiểu La - Nguyễn Hữu Thọ
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input_date">
              <span>Chọn ngày khám bệnh:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>

            <div className="input_date">
              <span>Chọn dịch vụ khám bệnh:</span>
              <select
                className="service"
                id="cars"
                {...register('service', { required: 'Vui lòng chọn dịch vụ.' })}
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
              <textarea rows="4" {...register('note')} />
            </div>

            <button
              type="submit"
              className="datlich__submit"
              value="Đặt lịch"
            >
              <span className="button__text">Đặt lịch</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Datlich;
