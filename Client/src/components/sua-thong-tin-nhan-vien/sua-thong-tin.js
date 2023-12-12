import './sua-thong-tin.css';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getnguoidungdetail, updatenguoidungdetail} from '../../actions/AdminthuAction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function Suathongtinhanvien(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();


    const { user_id } = useParams();
    console.log(user_id);


    useEffect(() => {
        dispatch(getnguoidungdetail(user_id));
    }, [dispatch, user_id]);

    const user = useSelector((state) => state.userdetail.user);

    if (!user) {
    return <div>Loading...</div>;
    }

    const formatDate = (date) => {
        return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
    };

    const onSubmit = (data) => {
        const shouldDelete = window.confirm('Bạn có chắc muốn cập nhật thông tin không?');
        if (shouldDelete) {
          dispatch(updatenguoidungdetail(user._id, data));
        console.log(data)
        }
      };

  return (
    <section className="sua">
      <h1>Sửa thông tin nhân viên</h1>
      <form className="from_sua" onSubmit={handleSubmit(onSubmit)}>
        <span>Tên nhân viên</span>
        <div className="input_sua">
          <input type="name" 
          defaultValue={user.name}
          {...register('name')}
          required />
        </div>

        <span>Email</span>
        <div className="input_sua">
          <input type="email"
          defaultValue={user.email}
          {...register('email')}
          required />
        </div>

        <span>Số điện thoại</span>
        <div className="input_sua">
          <input type="phone" 
          defaultValue={user.phone}
          {...register('phone')}
          required />
        </div>

        <div className="input_sua">
        <span>Chọn giới tính:</span>
        <select 
        className="service" 
        id="cars" 
        defaultValue={user.sex}
          {...register('sex')}
          required
        >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
        </select>
        </div>

        {user.status !== 'nguoi-dung' && (
          <div className="input_sua">
            <span>Chức vụ:</span>
              <select
                className="service"
                id="cars"
                defaultValue={user.status}
                {...register('status')}
                required
              >
                <option value="">Chọn chức vụ</option>
                <option value="le-tan">Lễ tân</option>
                <option value="chuan-doan">Chuẩn đoán</option>
                <option value="thuc-hien">Thực hiện</option>
                <option value="thu-ngan">Thu ngân</option>
              </select>
          </div>
        )}


        <span>Mật khẩu(Nếu như bạn muốn đổi mới mật khẩu)</span>
        <div className="input_sua">
          <input type="tel" 
          {...register('password')}
          />
        </div>

        <button type="submit" className="sua__submit" value="Đăng nhập">
          <span className="button__text">Cập nhật</span>
        </button>
        
      </form>
    </section>
  );
}

export default Suathongtinhanvien;
