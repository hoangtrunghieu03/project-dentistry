import express from 'express'
import {getAllUser, registerUser, login, DeleteUser, updateUser, schedules, appointment, deleteappoin, allhoadon, hoadondetail, historyappointment, forgotpassword, resetpassword} from '../controllers/UserController.js'
const UserRouter = express.Router()
import {isAuth, isAdmin} from '../untils/until.js'

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)
UserRouter.put('/sua-nguoi-dung/:userId', updateUser)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)

UserRouter.post('/dat-lich/:userId', schedules)
UserRouter.get('/lich-hen/:userId', appointment )
UserRouter.get('/lich-su/:userId', historyappointment )
UserRouter.delete('/xoa-lich-hen/:appoinId', deleteappoin )

UserRouter.get('/hoa-don/:userId', allhoadon )
UserRouter.get('/hoa-don-chi-tiet/:medicalrecord_Id', hoadondetail )


UserRouter.post('/forgot-password', forgotpassword)
UserRouter.post('/reset-password/:token', resetpassword)


export default UserRouter
