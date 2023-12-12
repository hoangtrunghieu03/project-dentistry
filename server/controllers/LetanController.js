import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { generateToken } from '../untils/until.js';
import expressAsyncHandler from 'express-async-handler';

import bcrypt from 'bcryptjs';  

export const tiepnhan = expressAsyncHandler(async (req, res) => {
    const status = req.params.status;
    // res.json(status)
    const appointments = await ScheduleModel.find({ status: status });
    res.status(201).send(appointments)
});

export const chitiettiepnhan = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    // res.json(status)
    const appoin = await ScheduleModel.findById(appoinId);
    res.status(201).send(appoin)
});

export const addtiepnhan = expressAsyncHandler(async (req, res) => {
    const {name, phone, birthday, sex, date, service, note} = req.body;
    const password = 'abc123';

    const existingUser = await UserModel.findOne({ phone });

    if(existingUser) {
        const schedule = await new ScheduleModel({
            user_Id: existingUser._id,
            name: existingUser.name,
            phone: existingUser.phone,
            birthday: birthday,
            sex: sex,
            date,
            service,
            note,
            status: 'le-tan',
        });

        existingUser.birthday = birthday
        existingUser.sex = sex
        existingUser.save()

        const aschedule = await schedule.save();
        res.status(201).send(aschedule)
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email: '',
            password: hashedPassword,
            address: '',
            birthday: birthday,
            sex: sex,
            phone,
            status: 'nguoi-dung',
            isAdmin: false,
        });

        const createUser = await user.save();

        const schedule = await new ScheduleModel({
            user_Id: createUser._id,
            name: createUser.name,
            phone: createUser.phone,
            birthday: birthday,
            sex: sex,
            date,
            service,
            note,
            status: 'le-tan',
        });

        const aschedule = await schedule.save();
        res.status(201).send(aschedule)
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
    const {name, phone,sex, birthday, date, service, note} = req.body;

    try {
        const appoin = await ScheduleModel.findById(appoinId);

        if (!appoin) {
            return res.status(404).json({ message: 'Không tồn tại lịch hẹn' });
        }
        appoin.name = name
        appoin.phone = phone
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

