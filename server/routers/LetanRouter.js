import express from 'express'
import {addtiepnhan, tiepnhan, deletetiepnhan, receive, chitiettiepnhan, updatetiepnhan, updatelichhen} from '../controllers/LetanController.js'
const Letan = express.Router()
// import {isAuth, isAdmin} from '../untils/until.js'

Letan.get('/tiep-nhan/:status', tiepnhan)
Letan.get('/tiep-nhan-chi-tiet/:appoinId', chitiettiepnhan)
Letan.post('/them-tiep-nhan', addtiepnhan)
Letan.delete('/xoa-tiep-nhan/:appoinId', deletetiepnhan)
Letan.put('/chuyen-phong/:appoinId', receive)
Letan.put('/cap-nhat-tiep-nhan/:appoinId', updatetiepnhan)
Letan.put('/cap-nhat-lich-hen/:appoinId', updatelichhen)

export default Letan