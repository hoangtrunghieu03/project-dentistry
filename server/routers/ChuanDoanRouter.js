import express from 'express'
import {tiepnhanback, tiepnhanup, chuandoan, uppdatehoso, hosoup, chuandoandetail, chuyenhoso, updatehosochuandoan} from '../controllers/ChuandoanControler.js'

const Chuandoan = express.Router()
// import {isAuth, isAdmin} from '../untils/until.js'

Chuandoan.put('/tiep-nhan-back/:medicalrecord_Id', tiepnhanback)
Chuandoan.put('/chuyen-ho-so/:medicalrecord_Id', chuyenhoso)
Chuandoan.put('/update-ho-so/:medicalrecord', uppdatehoso)
Chuandoan.put('/ho-so-up/:medicalrecord_Id', hosoup)
Chuandoan.post('/tiep-nhan-up/:appoinId', tiepnhanup)
Chuandoan.get('/ho-so/:status', chuandoan)
Chuandoan.get('/ho-so-detail/:medicalrecord_Id', chuandoandetail)
Chuandoan.put('/cap-nhat-ho-so-chuan-doan/:medicalrecord_Id', updatehosochuandoan)

export default Chuandoan