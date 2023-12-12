import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateNewTypeProduct, getAllTypeProduct } from "../../../../../actions/ListTypeProductAction";
import { message,Input } from "antd";

export default function CreateNewType() {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [image, setImage] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm loại thành công!",
      className: 'custom-class',
      style: {
        float: 'right',
        marginTop: '20px'
      },
    });
  };
  const onSubmit = async (data, e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);
    
    e.target.reset();
    success();
    await dispatch(CreateNewTypeProduct(formData));
    dispatch(getAllTypeProduct())
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="create-type">
      {contextHolder}
      <span>Tạo loại sản phẩm mới</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} size="small" style={{width: '50%'}} placeholder="Tên loại ..."/>

        <input type="file" onChange={(e) => handleChangeImage(e)}></input>

        <button type="submit">Thêm mới</button>
      </form>
    </div>
  );
}
