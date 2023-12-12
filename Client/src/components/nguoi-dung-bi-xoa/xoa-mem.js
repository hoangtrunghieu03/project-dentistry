import React, { useEffect } from 'react';
import './xoa-mem.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getnguoidungxoamem, xoanguoidung, khoiphucnguoidung } from '../../actions/AdminthuAction';
import moment from 'moment';
// import { Link } from 'react-router-dom';


function Nhanvien(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getnguoidungxoamem());
    }, [dispatch ]);

    const nhanviens = useSelector((state) => state.nguoidungs.nguoidung);

    console.log(nhanviens)

      const formatDate = (date) => {
        return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
      };

      const handkhoiphuc = async (nhanvien_id) => {
        const shouldUpdate = window.confirm('Bạn có muốn khôi phục người dùng không?');
        if (shouldUpdate) {
          dispatch(khoiphucnguoidung(nhanvien_id));
        }
      };

      const handdeletemem = async (nhanvien_id) => {
        const shouldUpdate = window.confirm('Bạn có muốn xóa người dùng không?');
        if (shouldUpdate) {
          dispatch(xoanguoidung(nhanvien_id));
        }
      };

    
  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">Danh sách người dùng</h2>
      </div>
      <div className="search_lich4">
        <div className="conditon4">
        </div>
      </div>
      <div>
        <table className="table_class4" border="1" style={{ marginTop: '1%' }}>
          <thead className="table_thead4">
            <tr>
              <th>Mã người dùng</th>
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
               <td
               onClick={() => handkhoiphuc(nhanvien._id)}
               style={{ cursor: 'pointer' }}>
               <i className="ti-reload"></i></td>
               <td
               onClick={() => handdeletemem(nhanvien._id)}
               style={{ cursor: 'pointer' }}>
                <i className="ti-trash"></i></td>
               </tr>
            ))
            ) : (
                <span style={{ color: '#000', marginLeft: '40px' }}>Không có người dùng</span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Nhanvien;
