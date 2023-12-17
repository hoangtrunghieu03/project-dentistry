import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  getAllUserReducer,
  UserSigninReducer,
  UserSignupReducer,
  getAppointmentsUser,
  getAllhosoNguoidung,
  getHistoryappointment
} from "./reducers/UserReducer";

import {
  getAppointmentsLetan,
  getAppointmentLetan,
} from "./reducers/LetanReducer";

import {
  getAllMedicalRecords,
  getMedicalRecordsDetail
} from "./reducers/ChuandoanReducer";

import {
  getAllmedicalrecordTiepnhan,
  getAllmedicalrecordthuchien,
  getAllmedicalrecordDetail
} from "./reducers/ThuchienReduct";

import {
  getmedicalrecordDetail,
  getAllhosono
} from "./reducers/ThanhtoanReducer";

import {
  getDanhthutrongngay,
  getdoanhthutrongthang,
  getdoanhthutrongnam,
  getAllnhanvien,
  getAllhoadon,
  getnguoidungdetail,
  getnguoidungxoamem,
  getnhanvienxoamem,
  gethoadonxoamem
} from "./reducers/AdminReducer"

import {
  getAllProductReducer,
  getProductByIdReducer,
  searchProductReducer,
} from "./reducers/ProductReducer";

import { CartReducer } from "./reducers/CartReducer";
import {
  addressReducer,
  getAllOrderReducer,
  getOrderByUserReducer,
  OrderInfoReducer,
  orderPayReducer,
} from "./reducers/OrderReducer";
import { ChatReducer } from "./reducers/ChatReducer";
import {
  SelectListReducer,
  UpdateSelectListReducer,
} from "./reducers/SelectListReducer";
import {
  ListTypeProductReducer,
  TypeProductReducer,
} from "./reducers/ListTypeProductReducer";
import { InfoGhnReducer } from "./reducers/GhnReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : undefined,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  //   shippingAddress: localStorage.getItem('shippingAddress')
  //   ? JSON.parse(localStorage.getItem('shippingAddress'))
  //   : {},
};

const reducer = combineReducers({
  users: getAllUserReducer,
  userSignin: UserSigninReducer,
  userSignup: UserSignupReducer,
  appointments: getAppointmentsUser,
  hosonguoidungs: getAllhosoNguoidung,
  hitoryhoso: getHistoryappointment,

  letan: getAppointmentLetan,
  letans: getAppointmentsLetan,

  hosos: getAllMedicalRecords,
  hosodetail :getMedicalRecordsDetail,

  thuchiens: getAllmedicalrecordTiepnhan,
  chuanbithuchien: getAllmedicalrecordthuchien,
  dangthuchien: getAllmedicalrecordDetail,

  hoadon : getmedicalrecordDetail,
  hoadons: getAllhosono,

  doanhthu: getDanhthutrongngay,
  doanhthus: getdoanhthutrongthang,
  doanhthuss: getdoanhthutrongnam,
  nhanvien: getAllnhanvien,
  quanlyhoadons: getAllhoadon,
  userdetail: getnguoidungdetail,
  nguoidungs: getnguoidungxoamem,
  nhanviens: getnhanvienxoamem,
  hosoxoamems: gethoadonxoamem,

  allProduct: getAllProductReducer,
  getProductById: getProductByIdReducer,

  searchProduct: searchProductReducer,

  cart: CartReducer,

  allOrder: getAllOrderReducer,
  address: addressReducer,
  orderByUser: getOrderByUserReducer,
  orderInfo: OrderInfoReducer,
  payOrder: orderPayReducer,

  orderGhn: InfoGhnReducer,

  chat: ChatReducer,

  selectList: SelectListReducer,
  updateSelect: UpdateSelectListReducer,

  allTypeProduct: ListTypeProductReducer,
  detailType: TypeProductReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
