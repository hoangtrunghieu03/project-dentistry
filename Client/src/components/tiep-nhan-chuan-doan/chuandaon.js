import React, { useEffect } from "react";
import "./chuandoan.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getMedicalRecorddetail,
  updateMedicalRecorddetail,
  MedicalRecorddetailup,
} from "../../actions/ChuandoanAction";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

function Chuandoan(props) {
  const dispatch = useDispatch();
  const { medicalrecord_Id } = useParams();
  const { register, handleSubmit } = useForm();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  let link = "";

  if (userInfo.status === "chuan-doan") {
    link = "/chuan-doan-thuc-hien";
  } else if (userInfo.status === "le-tan") {
    link = "/sua-le-tan/";
  } else {
    link = "/default-link";
  }

  useEffect(() => {
    dispatch(getMedicalRecorddetail(medicalrecord_Id));
  }, [dispatch, medicalrecord_Id]);

  const medicalrecord = useSelector(
    (state) => state.hosodetail.medicalrecordetail
  );

  if (!medicalrecord) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    return moment(date, "YYYY/MM/DD").format("DD/MM/YYYY");
  };

  const onSubmit = (data) => {
    const shouldUpdate = window.confirm("Bạn có muốn cập nhật hồ sơ không?");
    if (shouldUpdate) {
      dispatch(updateMedicalRecorddetail(medicalrecord_Id, data));
    }
  };

  const handleChuyenPhong = (medicalrecord_Id) => {
    const shouldUpdate = window.confirm("Bạn có muốn chuyển hồ sơ không?");
    if (shouldUpdate) {
      dispatch(MedicalRecorddetailup(medicalrecord_Id));
    }
  };

  return (
    <div className="chuandoan">
      <div className="staff">
        <h1>Chuẩn đoán hồ sơ</h1>
      </div>
      <form className="from_datlich" onSubmit={handleSubmit(onSubmit)}>
        <div class="content-wrappers">
          <h1>Hồ sơ bệnh án</h1>
          <br />
          <br />
          <strong>Tên bệnh nhân: </strong> {medicalrecord.name}
          <br />
          <br />
          <strong>Ngày sinh: </strong> {formatDate(medicalrecord.birthday)}
          <br />
          <br />
          <strong>Giới tính: </strong> {medicalrecord.sex}
          <br />
          <strong>Dịch vụ: </strong>
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
          <br />
          <strong>Ngày khám: </strong> {formatDate(medicalrecord.date)}
          <br />
          <br />
          <strong>Ghi chú: </strong>
          <br />
          <textarea
            defaultValue={medicalrecord.note}
            {...register("note")}
          ></textarea>
          <br />
          <br />
          <strong>Chuẩn đoán của bác sĩ: </strong>
          <br />
          <textarea
            defaultValue={medicalrecord.diagnostic}
            {...register("diagnostic")}
            required
          ></textarea>
          <button type="submit" className="datlich__submits" value="Chuấn đoán">
            Chuẩn đoán
          </button>
          {medicalrecord.diagnostic && (
            <button
              style={{ marginLeft: "50px" }}
              className="datlich__submits"
              type="button"
              onClick={() => handleChuyenPhong(medicalrecord._id)}
            >
              Chuyển phòng
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Chuandoan;
