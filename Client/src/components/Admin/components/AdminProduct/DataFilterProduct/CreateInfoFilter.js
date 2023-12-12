import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./DataFilterProduct.css";
import { useForm } from "react-hook-form";
import { CloseOutlined } from "@ant-design/icons";
import { CreateSelectListItem, getAllSelectList } from "../../../../../actions/SelectListAction";
import { message, Input } from "antd";

export default function CreateInfoFilter() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [addOption, setAddOption] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  
  const handleAddOption = () => {
    const newOption = {
      index: Math.random(),
      value: "",
    };
    setAddOption([...addOption, newOption]);
  };

  const handleRemoveOption = (option) => {
    let newListOption = [...addOption];
    newListOption = newListOption.filter((item) => item.index !== option.index);

    setAddOption(newListOption);
  };

  const handleChangeValueOption = (option, e) => {
    const newListOption = [...addOption];
    const index = newListOption.findIndex(
      (item) => item.index === option.index
    );

    newListOption[index].value = e.target.value;
    setAddOption(newListOption);
  };

  const createArrayOption = (arr) => {
    let options = [];
    arr = arr.map((item) => options.push(`${item.value}`));
    return options;
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Cập nhật thành công!",
      className: 'custom-class',
      style: {
        float: 'right',
        marginTop: '20px'
      },
    });
  };

  const onSubmit = async (data, e) => {
    const options = createArrayOption([...addOption]);
    const newData = { ...data, options };
    console.log(newData);
    await dispatch(CreateSelectListItem(newData));
    setAddOption([]);
    success()
    e.target.reset();
    dispatch(getAllSelectList())
  };

  return (
    
    <div className="update-filter-info">
      {contextHolder}
      <span>Thêm loại mới</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input {...register("name")} placeholder="Tên thuộc tính... " /> */}
          <Input {...register("name")} size="small"  placeholder="Tên thuộc tính... "  />
          {/* <input {...register("property")} placeholder="Mã thuộc tính ..." /> */}
          <Input {...register("property")} size="small"  placeholder="Mã thuộc tính... " />
          <div className="option-list">
            {addOption.map((option, index) => (
              <div className="option-list-item" key={index}>
                {/* <input value={option.value} placeholder="Thuộc tính mới..." onChange={(e) => {handleChangeValueOption(option, e)}} /> */}
                <Input value={option.value} placeholder="Thuộc tính mới..." onChange={(e) => {handleChangeValueOption(option, e)}} />
                <span onClick={() => handleRemoveOption(option)}>
                  <CloseOutlined />
                </span>
              </div>
            ))}
          </div>
          <span className="add-item" onClick={handleAddOption}>Thêm thuộc tính</span>
          <button type="submit">Cập nhật</button>
        </form>
      </div>
  );
}
