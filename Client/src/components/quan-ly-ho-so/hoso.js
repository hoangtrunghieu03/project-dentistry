import React, { useEffect } from 'react';
import './hoso.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllhoadon, deletememhosobenhan } from '../../actions/AdminthuAction';
import moment from 'moment';


function Hoso(props) {
    const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  useEffect(() => {
    dispatch(getAllhoadon());
  }, [dispatch]);

  console.log(userInfo.status);
  

  const medicalrecords = useSelector((state) => state.quanlyhoadons.quanlyhoadons);

  console.log(medicalrecords)

  const formatDate = (date) => {
    return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
  };

  const handdeletemem = async (medicalrecord_id) => {
    const shouldUpdate = window.confirm('Bạn có muốn xóa hồ sơ không?');
    if (shouldUpdate) {
      dispatch(deletememhosobenhan(medicalrecord_id));
    }
  };
  
  return (
    <div>
    <div className="more4">
      <h2 className="h2ds">Danh sách hồ sơ</h2>
    </div>
    <div className="search_lich4">
      <div className="conditon4">
      </div>
    </div>
    <div>
      <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
        <thead className="table_thead4">
          <tr>
            <th>Mã hồ sơ</th>
            <th>Tên người khám</th>
            <th>Ngày Khám</th>
            <th>Dịch vụ</th>
          </tr>
        </thead>
        <tbody>
          {medicalrecords && medicalrecords.length > 0 ? (
            medicalrecords.map((medicalrecord) => (
              <tr>
             <td>{medicalrecord._id}</td>
             <td>{medicalrecord.name}</td>
             <td>{ formatDate(medicalrecord.date) }</td>
             <td>{medicalrecord.service}</td>
             <td> <Link to={`/ho-so-chi-tiet-quan-ly/${medicalrecord._id}`}>
             <i className="ti-pencil-alt"></i>
              </Link>
              </td>
             <td onClick={() => handdeletemem(medicalrecord._id)}
             style={{ cursor: 'pointer' }}><i className="ti-trash"></i></td>
             </tr>
          ))
          ) : (
              <span style={{ color: '#000', marginLeft: '40px' }}>Không có người dùng</span>
          )}
        </tbody>
      </table>
    </div>
  </div>
    // <div className='chuandoan'>
    //     <div class="staff">
    //         <h2>Danh sách hồ sơ bệnh án</h2>
    //     </div>
    //     <div class="content-wrapper">
    //         {medicalrecords && medicalrecords.length > 0 ? (
    //           medicalrecords.map((medicalrecord) => (
    //         <div class="frame">
    //         <h2>{medicalrecord.name}</h2>
    //         <br />
    //         <strong>Dịch vụ:</strong> {medicalrecord.service}
    //         <br />
    //         <br />
    //         <strong>Ngày:</strong> {formatDate(medicalrecord.date)}
    //         <br />
    //         <br />
    //         <Link to={`/ho-so-nguoi-dung-chi-tiet/${medicalrecord._id}`} className="">
    //             Xem chi tiết
    //             <i className="ti-pencil-alt" style={{ marginLeft: '6px' }}></i>
    //         </Link>
    //         </div>
    //         ))
    //         ) : (
    //             <span style={{ color: '#000', marginLeft: '40px' }}>Không có hồ sơ</span>
    //         )}
    //     </div>
    // </div>
  );
}

export default Hoso;
