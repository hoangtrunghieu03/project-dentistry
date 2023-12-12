import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { generateToken } from '../untils/until.js';
import { MedicalRecord } from '../models/ChuandoanModel.js';
import expressAsyncHandler from 'express-async-handler';

import bcrypt from 'bcryptjs';
// import moment from 'moment-timezone';

export const getAllUser = (req, res) => {
    UserModel.find({})
        .then(user => res.send(user))
        .catch(err => console.log(err));
}

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, phone, birthday, sex } = req.body;

    const existingUser = await UserModel.findOne({ phone });

    if (existingUser) {
        res.status(400).send({ message: 'Trùng số điện thoại' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
        name,
        email,
        password: hashedPassword,
        address: '',
        phone,
        birthday,
        sex,
        status: 'nguoi-dung',
        soft_delete: false,
        isAdmin: false,
    });

    const createUser = await user.save();

    res.status(201).send({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        birthday: createUser.birthday,
        sex: createUser.sex,
        password: createUser.password,
        address: createUser.address,
        phone: createUser.phone,
        status: createUser.status,
        soft_delete: createUser.soft_delete,
        token: generateToken(createUser),
    });
});


export const login = expressAsyncHandler(async (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        res.status(400).send({ message: 'Phone and password are required' });
        return;
    }

    const user = await UserModel.findOne({ phone, soft_delete: false });

    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                birthday: user.birthday,
                sex: user.sex,
                password: user.password, // Note: sending hashed password for demonstration, consider excluding it
                address: user.address,
                phone: user.phone,
                status: user.status,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
        } else {
            res.status(401).send({ message: 'Mật khẩu không đúng' });
        }
    } else {
        res.status(401).send({ message: 'Invalid phone or password' });
    }
});

export const updateUser = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { name, email, phone, password, birthday, sex } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        user.name = name;
        user.email = email;
        user.birthday = birthday,
        user.sex = sex,
        user.phone = phone;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(201).send({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                address: user.address,
                phone: user.phone,
                status: user.status,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            },
            message: 'Thông tin người dùng đã được cập nhật.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});


export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById({_id: req.params.id})

    if(user){
        await user.remove()
        res.send({message: 'user deleted'})
    }else{
        res.send({message: 'user not exists'})
    }
})

export const schedule = expressAsyncHandler(async (req, res) => {
    const user_Id = req.params.userId;
    const {date, service, note} = req.body;
    const user = await UserModel.findById({_id: user_Id})

    const schedule = await new ScheduleModel({
        user_Id,
        name: user.name,
        phone: user.phone,
        date,
        service,
        note,
        status: 'nguoi-dung',
    });

    const scheduleNew = await schedule.save();

    await res.status(201).send({
        user_Id: scheduleNew.user_Id,
        date: scheduleNew.date,
        service: scheduleNew.service,
        note: scheduleNew.note,
        satus: schedule.status
    });
    
});

export const appointment = expressAsyncHandler(async (req, res) => {
    const user_Id = req.params.userId;

    const appointments = await ScheduleModel.find({ user_Id: user_Id });

    // Trả về mảng bản ghi trực tiếp thay vì đặt chúng trong một đối tượng
    await res.status(201).send(appointments);
});

export const deleteappoin = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    res.json(appoinId)

    const appointment = await ScheduleModel.findById({_id: appoinId})

    if(appointment){
        await appointment.remove()
        res.send({message: 'appointment deleted'})
    }else{
        res.send({message: 'appointment not exists'})
    }
});

export const allhoadon = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);

    const medicalrecords = await MedicalRecord.find({ user_Id: userId });

    const hoadon = medicalrecords.filter(record => record.status === 'hoan-tat');

    res.status(200).send(hoadon);
});

export const hoadondetail = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;

    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

    res.status(201).send(medicalrecord);
});
