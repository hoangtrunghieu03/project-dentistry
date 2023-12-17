import express from 'express'
import {danhthumotngay, getallnguoidung, getallnhanvien, getallhoadon, getlichhen, xoamemnguoidung, getnguoidungxoamem, xoanguoidung, getnhanvienxoamem, khoiphucnguoidung,
    getnguoidungdetail, updatenguoidungdetail, updatehoso, deletememhosobenhan, khoiphucmemhosobenhan, getallhosoxoamem, xoahosobenhan, getallhosonoxoamem, danhthumotthang, danhthumotnam} from '../controllers/AdminController.js'
const Admin = express.Router()
// import {isAuth, isAdmin} from '../untils/until.js'

Admin.post('/lay-lich-hen', getlichhen)


Admin.get('/danh-thu-mot-ngay', danhthumotngay)
Admin.get('/danh-thu-mot-thang', danhthumotthang)
Admin.get('/danh-thu-mot-nam', danhthumotnam)

Admin.get('/lay-het-nguoi-dung', getallnguoidung)
Admin.put('/xoa-mem-nguoi-dung/:user_id', xoamemnguoidung)
Admin.get('/lay-nguoi-dung-xoa-mem', getnguoidungxoamem)
Admin.delete('/xoa-nguoi-dung/:user_id', xoanguoidung)

Admin.get('/lay-nguoi-dung-chi-tiet/:user_id', getnguoidungdetail)
Admin.put('/sua-thong-tin-nhan-vien/:user_id', updatenguoidungdetail)

Admin.put('/khoi-phuc-nguoi-dung/:user_id', khoiphucnguoidung)

Admin.get('/lay-het-nhan-vien', getallnhanvien)
Admin.get('/lay-nhan-vien-xoa-mem', getnhanvienxoamem)

Admin.get('/lay-het-hoa-don', getallhoadon)
Admin.get('/lay-ho-so-xoa-mem', getallhosoxoamem)
Admin.get('/lay-ho-so-no-xoa-mem', getallhosonoxoamem)
Admin.put('/cap-nhat-ho-so/:medicalrecord_Id', updatehoso)
Admin.put('/xoa-mem-ho-so-benh-an/:medicalrecord_Id', deletememhosobenhan)
Admin.put('/khoi-phuc-ho-so-benh-an/:medicalrecord_Id', khoiphucmemhosobenhan)
Admin.delete('/xoa-ho-so-benh-an/:medicalrecord_Id', xoahosobenhan)

export default Admin