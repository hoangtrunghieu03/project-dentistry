import React, { useEffect } from 'react';
import './nhavien.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllnhanvien, Xoamemnguoidung } from '../../actions/AdminthuAction';
import moment from 'moment';
// import { Link } from 'react-router-dom';


function Nhanvien(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllnhanvien());
    }, [dispatch ]);

    const nhanviens = useSelector((state) => state.nhanvien.allnhanvien);

    console.log(nhanviens)

      const formatDate = (date) => {
        return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
      };

      const handdeletemem = async (nhanvien_id) => {
        const shouldUpdate = window.confirm('Bạn có muốn xóa nhân viên không?');
        if (shouldUpdate) {
          dispatch(Xoamemnguoidung(nhanvien_id));
        }
      };

    
  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">Danh sách nhân viên</h2>
      </div>
      <div className="search_lich4">
        <div className="conditon4">
        </div>
      </div>
      <div>
        <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Mã nhân viên</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Chức vụ</th>
            </tr>
          </thead>
          <tbody>
            {nhanviens && nhanviens.length > 0 ? (
              nhanviens.map((nhanvien) => (
                <tr>
               <td>{nhanvien._id}</td>
               <td>{nhanvien.name}</td>
               <td>{nhanvien.phone}</td>
               <td>{nhanvien.email}</td>
               <td>{nhanvien.status}</td>
               <td> <Link to={`/sua-thong-tin-nhan-vien/${nhanvien._id}`}>
               <i className="ti-pencil-alt"></i>
                </Link></td>
               <td
               onClick={() => handdeletemem(nhanvien._id)}
               style={{ cursor: 'pointer' }}>
                <i className="ti-trash"></i></td>
               </tr>
            ))
            ) : (
                <span style={{ color: '#000', marginLeft: '40px' }}>Không có nhân viên</span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Nhanvien;
