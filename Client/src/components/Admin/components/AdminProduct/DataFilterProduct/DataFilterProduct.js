import React from "react";
import "./DataFilterProduct.css";
import CreateInfoFilter from "./CreateInfoFilter";
import CreateNewType from "./CreateNewType";
import FilterMenu from "./FilterMenu";
import AllTypeProduct from "./AllTypeProduct";
import { Collapse } from "antd";
const { Panel } = Collapse;

export default function DataFilterProduct() {
  return (
    <div className="update-filter">
      <div className="update-filter-title">
        <span>Cập nhật loại sản phẩm</span>
      </div>

      <Collapse bordered accordion >
        <FilterMenu/>
        <Panel header="Tạo loại sản phẩm mới">
          <CreateInfoFilter/>
        </Panel>
      </Collapse>
      <Collapse >
        <AllTypeProduct/>
        <Panel header="Thêm nhãn sản phẩm mới">
          <CreateNewType/>
        </Panel>
      </Collapse>
    </div>
  );
}
