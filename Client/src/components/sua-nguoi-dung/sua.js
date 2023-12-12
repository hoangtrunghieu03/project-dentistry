import './sua.css';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { sua } from '../../actions/UserAction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Sua(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  console.log(userInfo)

  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    const shouldDelete = window.confirm('Bạn có chắc muốn cập nhật thông tin không?');
    if (shouldDelete) {
      dispatch(sua(userInfo._id, data, userInfo));
    }
  };


  // Reset the form fields when user info changes
  useEffect(() => {
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);
    setValue('phone', userInfo.phone);
    setValue('birthday', userInfo.birthday);
    setValue('sex', userInfo.sex);
  }, [userInfo, setValue]);

  const {userid } = useParams();
  console.log(userid);
  

  return (
    <section className="sua">
      <h1>Sửa thông tin người dùng</h1>
      <form className="from_sua" onSubmit={handleSubmit(onSubmit)}>
        <span>Tên người dùng</span>
        <div className="input_sua">
          <input type="name" {...register('name')} required />
        </div>

        <span>Email</span>
        <div className="input_sua">
          <input type="email" {...register('email')} required />
        </div>

        <span>Số điện thoại</span>
        <div className="input_sua">
          <input type="phone" {...register('phone')} required />
        </div>

        <span>Ngày sinh</span>
        <div className="input_sua">
          <input type="date" {...register('birthday')} required />
        </div>

        <span>Giới tính</span>
        <div className="input_sua">
          <select 
                className="service" 
                {...register('sex')}
                required
                >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
        </div>

        <span>Mật khẩu(nhập nếu như bạn muốn đổi mới mật khẩu)</span>
        <div className="input_sua">
          <input type="tel" {...register('password')} />
        </div>

        <button type="submit" className="sua__submit" value="Đăng nhập">
          <span className="button__text">Cập nhật</span>
        </button>
        
      </form>
    </section>
  );
}

export default Sua;
