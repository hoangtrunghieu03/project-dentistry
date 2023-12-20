import React, { useEffect } from "react";
import "./ho-so.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMedicalRecorddetail } from "../../actions/ThanhtoanAction";
import { updatehoso } from "../../actions/AdminthuAction";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

function Thuchien(props) {
  const dispatch = useDispatch();
  const { medicalrecord_Id } = useParams();
  console.log(medicalrecord_Id);
  const { register, handleSubmit } = useForm();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    dispatch(getMedicalRecorddetail(medicalrecord_Id));
  }, [dispatch, medicalrecord_Id]);

  const medicalrecord = useSelector((state) => state.hoadon.hoadondetail);

  console.log(medicalrecord);

  if (!medicalrecord) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    return moment(date, "YYYY/MM/DD").format("DD/MM/YYYY");
  };

  const onSubmit = (data) => {
    const shouldUpdate = window.confirm("Bạn có muốn cập nhật hồ sơ không");
    if (shouldUpdate) {
      dispatch(updatehoso(medicalrecord_Id, data));
    }
  };

  return (
    <div className="suahosobenhan">
      <div className="chuandoans">
        <div className="staff">
          <h1>Thực hiện hồ sơ</h1>
        </div>
        <form className="from_datlichs" onSubmit={handleSubmit(onSubmit)}>
          <div className="content-wrapperss">
            <h1>Hồ sơ bệnh án</h1>
            <strong>Tên bệnh nhân: </strong>
            <input
              defaultValue={medicalrecord.name}
              {...register("name")}
              required
            ></input>
            <br></br>
            <strong>Số điện thoại: </strong>
            <input
              defaultValue={medicalrecord.phone}
              {...register("phone")}
              required
            ></input>
            <strong>Ngày sinh: </strong>
            <input
              type="date"
              defaultValue={medicalrecord.birthday}
              {...register("birthday")}
              required
            ></input>
            <strong>Giới tính: </strong>
            <select
              className="service"
              id="cars"
              defaultValue={medicalrecord.sex}
              {...register("sex")}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            <br></br>
            <strong>
              {" "}
              Dịch vụ:
              <select
                className="service"
                id="cars"
                defaultValue={medicalrecord.service}
                {...register("service")}
                required
              >
                <option value="">Chọn dịch vụ</option>
                <option value="Niềng răng">Niềng răng</option>
                <option value="Cấy IMPLANT">Cấy IMPLANT</option>
                <option value="Lấy cao răng">Lấy cao răng</option>
              </select>
            </strong>
            <br></br>
            <strong>
              Ngày khám:
              <input
                type="date"
                defaultValue={medicalrecord.date}
                {...register("date")}
                required
              ></input>
            </strong>
            <strong>Ghi chú: </strong>

            <textarea
              defaultValue={medicalrecord.note}
              {...register("note")}
            ></textarea>

            <strong>Chuẩn đoán của bác sĩ: </strong>

            <textarea
              defaultValue={medicalrecord.diagnostic}
              {...register("diagnostic")}
            ></textarea>

            <strong>Thông tin thực hiện: </strong>

            <textarea
              defaultValue={medicalrecord.tools}
              {...register("tools")}
            ></textarea>
            <br></br>
            <strong>Số Tiền trả: </strong>

            <input
              defaultValue={medicalrecord.payment}
              {...register("payment")}
              required
            ></input>
            <br></br>
            <strong>Số tiền nợ: </strong>

            <input
              defaultValue={medicalrecord.debt}
              {...register("debt")}
              required
            ></input>

            <strong>Tổng hóa đơn: </strong>

            <input
              defaultValue={medicalrecord.totalmoney}
              {...register("totalmoney")}
              required
            ></input>
            <button type="submit" className="datlich__submits" value="Chuấn đoán">
          xác nhận
        </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Thuchien;
