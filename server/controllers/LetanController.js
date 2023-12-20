import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { generateToken } from '../untils/until.js';
import expressAsyncHandler from 'express-async-handler';

import bcrypt from 'bcryptjs';  

export const tiepnhan = expressAsyncHandler(async (req, res) => {
    const status = req.params.status;

    try {
        const currentDate = new Date();

        const appointments = await ScheduleModel.find({
            status: status,
            date: { $gte: currentDate.toISOString().split('T')[0] } 
        }).sort({ date: 1 });

        res.status(201).send(appointments);
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server khi lấy danh sách tiếp nhận.', error });
    }
});


export const chitiettiepnhan = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    // res.json(status)
    const appoin = await ScheduleModel.findById(appoinId);
    res.status(201).send(appoin)
});

export const addtiepnhan = expressAsyncHandler(async (req, res) => {
    const { name, phone, email, service, birthday, sex, date, note } = req.body;

    const password = 'abc123';

    const existingUserByPhone = await UserModel.findOne({ phone });

    if(existingUserByPhone) {
        const schedule = await new ScheduleModel({
            user_Id: existingUserByPhone._id,
            name: existingUserByPhone.name,
            phone: existingUserByPhone.phone,
            email: existingUserByPhone.email,
            birthday: birthday,
            sex: sex,
            date,
            service,
            note,
            status: 'le-tan',
            soft_delete: false
        });

        existingUserByPhone.birthday = birthday
        existingUserByPhone.sex = sex
        existingUserByPhone.save()

        const aschedule = await schedule.save();
        res.status(200).json({ message: 'Tiếp nhận thành công' });
    } else {
        const existingUserByEmail = await UserModel.findOne({ email });

        if(existingUserByEmail) {
            res.status(200).json({ error: 'Email tồn tại' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email: email,
            password: hashedPassword,
            address: '',
            birthday: birthday,
            sex: sex,
            phone,
            status: 'nguoi-dung',
            isAdmin: false,
            soft_delete: false
        });

        const createUser = await user.save();

        const schedule = await new ScheduleModel({
            user_Id: createUser._id,
            name: createUser.name,
            phone: createUser.phone,
            email: createUser.email,
            birthday: birthday,
            sex: sex,
            date,
            service,
            note,
            status: 'le-tan',
        });

        const aschedule = await schedule.save();
        res.status(200).json({ message: 'Tiếp nhận thành công' });
    }
});


export const deletetiepnhan = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    const appointment = await ScheduleModel.findById({_id: appoinId})

    if(appointment){
        await appointment.remove()
        res.status(201).send({message: 'appointment deleted'})
    }else{
        res.status(401).send({message: 'appointment not exists'})
    }
});

export const receive = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    try {
        const appoin = await ScheduleModel.findById(appoinId);

        if (!appoin) {
            return res.status(404).json({ message: 'Không tồn tại lịch hẹn' });
        }

        appoin.status = 'chuan-doan';

        await appoin.save();

        res.status(201).send('Đã chuyển thông tin.');
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const updatelichhen = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    try {
        const appoin = await ScheduleModel.findById(appoinId);

        if (!appoin) {
            return res.status(404).json({ message: 'Không tồn tại lịch hẹn' });
        }

        appoin.status = 'le-tan';

        await appoin.save();

        res.status(201).send('Đã chuyển thông tin.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const updatetiepnhan = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    const {name, phone, email, sex, birthday, date, service, note} = req.body;

    try {
        const appoin = await ScheduleModel.findById(appoinId);

        if (!appoin) {
            return res.status(404).json({ message: 'Không tồn tại lịch hẹn' });
        }
        appoin.name = name
        appoin.phone = phone
        appoin.email = email
        appoin.sex = sex
        appoin.birthday = birthday
        appoin.date = date
        appoin.service = service
        appoin.note = note

        await appoin.save();

        res.status(201).send('Cập nhật thành công.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

