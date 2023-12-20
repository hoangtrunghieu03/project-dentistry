import express from 'express'
import {hoadoandetail, thanhtoan, hoadonno, thanhtoantienno} from '../controllers/ThanhtoanController.js'
const Thanhtoan = express.Router()
// import {isAuth, isAdmin} from '../untils/until.js'

Thanhtoan.get('/hoa-don-chi-tiet/:medicalrecord_Id', hoadoandetail)
Thanhtoan.put('/hoa-don/:medicalrecord_Id', thanhtoan)
Thanhtoan.get('/hoa-don-no/:status', hoadonno)
Thanhtoan.put('/hoa-don-tien-no/:medicalrecord_Id', thanhtoantienno)


export default Thanhtoan