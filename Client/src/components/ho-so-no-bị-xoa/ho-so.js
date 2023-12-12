import React, { useEffect } from 'react';
import './ho-so.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getallhosonoxoamem, xoahosobenhan, khoiphucmemhosobenhan } from '../../actions/AdminthuAction';
import moment from 'moment';
// import { Link } from 'react-router-dom';


function Hoso(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getallhosonoxoamem());
    }, [dispatch ]);

    const hosos = useSelector((state) => state.hosoxoamems.hosoxoamem);

    console.log(hosos)

      const formatDate = (date) => {
        return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
      };

      const handkhoiphuc = async (medicalrecord_Id) => {
        const shouldUpdate = window.confirm('Bạn có muốn khôi phục hồ sơ không?');
        if (shouldUpdate) {
          dispatch(khoiphucmemhosobenhan(medicalrecord_Id));
        }
      };

      const handdeletemem = async (medicalrecord_Id) => {
        const shouldUpdate = window.confirm('Bạn có muốn xóa hồ sơ không?');
        if (shouldUpdate) {
          dispatch(xoahosobenhan(medicalrecord_Id));
        }
      };

    
  return (
    <div>
      <div className="more4">
        <h2 className="h2ds">Danh sách hồ sơ bị xóa</h2>
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
              <th>Ngày khám</th>
              <th>Dịch vụ</th>
            </tr>
          </thead>
          <tbody>
            {hosos && hosos.length > 0 ? (
              hosos.map((hoso) => (
                <tr>
               <td>{hoso._id}</td>
               <td>{hoso.name}</td>
               <td>{ formatDate(hoso.date)}</td>
               <td>{hoso.service}</td>
               <td
               onClick={() => handkhoiphuc(hoso._id)}
               style={{ cursor: 'pointer' }}>
               <i className="ti-reload"></i></td>
               <td
               onClick={() => handdeletemem(hoso._id)}
               style={{ cursor: 'pointer' }}>
                <i className="ti-trash"></i></td>
               </tr>
            ))
            ) : (
                <span style={{ color: '#000', marginLeft: '40px' }}>Không có hồ sơ bị xóa</span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Hoso;
