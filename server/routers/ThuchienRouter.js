import express from 'express'
import {tiepnhan, tiepnhanthuchien, tiepnhanthuchiendetail, dangthuchien, chuyentiepnhan, trahoso} from '../controllers/ThuchienControler.js'
const Thuchien = express.Router()
// import {isAuth, isAdmin} from '../untils/until.js'

Thuchien.get('/tiep-nhan/:status', tiepnhan)
Thuchien.put('/tiep-nhan-thuc-hien/:medicalrecord_Id', tiepnhanthuchien)
Thuchien.put('/tra-ho-so/:medicalrecord_Id', trahoso)
Thuchien.get('/tiep-nhan-thuc-hien-detail/:medicalrecord_Id', tiepnhanthuchiendetail)
Thuchien.put('/dang-tuc-hien/:medicalrecord_Id', dangthuchien)
Thuchien.put('/chuyen-tiep-nhan/:medicalrecord_Id', chuyentiepnhan)

export default Thuchien