import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { MedicalRecord } from '../models/ChuandoanModel.js';
import { LichhenModel } from '../models/LichhenModel.js';
import { generateToken } from '../untils/until.js';
import expressAsyncHandler from 'express-async-handler'; 

import bcrypt from 'bcryptjs'; 

export const getlichhen = expressAsyncHandler(async (req, res) => {
    const {phone} = req.body
    const alllichen= await LichhenModel.find({ phone: phone });

    res.status(200).send(alllichen);
});

function formatNumber(value) {
    return value < 10 ? `0${value}` : value;
}

function calculateTotal(records, field) {
    return records.reduce((accumulator, record) => {
        return accumulator + record[field];
    }, 0);
}

export const danhthumotngay = expressAsyncHandler(async (req, res) => {
    const currentDate = new Date();
    const day = formatNumber(currentDate.getDate());
    const month = formatNumber(currentDate.getMonth() + 1); 
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    const medicalrecords = await MedicalRecord.find({ date: formattedDate });

    const totalDebt = calculateTotal(medicalrecords, 'debt');
    const totalPayment = calculateTotal(medicalrecords, 'payment');
    const totalTotalmoney = calculateTotal(medicalrecords, 'totalmoney');

    res.status(200).send({ formattedDate, totalPayment, totalDebt, totalTotalmoney });
});

export const danhthumotthang = expressAsyncHandler(async (req, res) => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}`;
    
    const medicalrecords = await MedicalRecord.find({
        date: {
            $regex: new RegExp(`^${formattedDate}`)
        },
        status: 'hoan-tat'
    });

    const totalDebt = medicalrecords.reduce((accumulator, record) => {
        return accumulator + record.debt;
    }, 0);

    const totalPayment = medicalrecords.reduce((accumulator, record) => {
        return accumulator + record.payment;
    }, 0);

    const totalTotalmoney = medicalrecords.reduce((accumulator, record) => {
        return accumulator + record.totalmoney;
    }, 0);

    res.status(200).send({
        formattedDate: formattedDate,
        totalPayment: totalPayment,
        totalDebt: totalDebt,
        totalTotalmoney: totalTotalmoney
    });
});

export const danhthumotnam = expressAsyncHandler(async (req, res) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const formattedDate = `${year}`;
    
    const medicalrecords = await MedicalRecord.find({
        date: {
            $regex: new RegExp(`^${formattedDate}`)
        },
        status: 'hoan-tat'
    });

    const totalDebt = medicalrecords.reduce((accumulator, record) => {
        return accumulator + record.debt;
    }, 0);

    const totalPayment = medicalrecords.reduce((accumulator, record) => {
        return accumulator + record.payment;
    }, 0);

    const totalTotalmoney = medicalrecords.reduce((accumulator, record) => {
        return accumulator + record.totalmoney;
    }, 0);

    res.status(200).send({
        formattedDate: formattedDate,
        totalPayment: totalPayment,
        totalDebt: totalDebt,
        totalTotalmoney: totalTotalmoney
    });
});



export const getallnguoidung = expressAsyncHandler(async (req, res) => {
    const alluser = await UserModel.find({ status : 'nguoi-dung', soft_delete: false})
    res.status(200).send(alluser)
});

export const getallnhanvien = expressAsyncHandler(async (req, res) => {
    const excludedStatus = ['nguoi-dung', 'admin'];

    const alluser = await UserModel.find({ status: { $nin: excludedStatus }, soft_delete: false });

    res.status(200).send(alluser);
});

export const getallhoadon = expressAsyncHandler(async (req, res) => {

    const hoadons = await MedicalRecord.find({ status: 'hoan-tat', soft_delete: false });
    
    const allhoadon = hoadons.filter(record => record.debt === 0);

    res.status(200).send(allhoadon);
});

export const getallhosoxoamem = expressAsyncHandler(async (req, res) => {

    const hoadons = await MedicalRecord.find({ status: 'hoan-tat', soft_delete: true });
    
    const allhoadon = hoadons.filter(record => record.debt === 0);

    res.status(200).send(allhoadon);
});


export const xoamemnguoidung = expressAsyncHandler(async (req, res) => {
    const user_id = req.params.user_id

    const user = await UserModel.findById({_id: user_id})

    user.soft_delete = true,

    await user.save();

    res.status(200).send('Xóa mềm thanh công');
});

export const khoiphucnguoidung = expressAsyncHandler(async (req, res) => {
    const user_id = req.params.user_id

    const user = await UserModel.findById({_id: user_id})

    user.soft_delete = false,

    await user.save();

    res.status(200).send('Xóa mềm thanh công');
});

export const getnguoidungxoamem = expressAsyncHandler(async (req, res) => {
    try {
        const users = await UserModel.find({ status: 'nguoi-dung', soft_delete: true });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách người dùng.' });
    }
});

export const getnhanvienxoamem = expressAsyncHandler(async (req, res) => {
    try {
        const users = await UserModel.find({ status: { $nin: ['admin', 'nguoi-dung'] }, soft_delete: true });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách người dùng.' });
    }
});

export const xoanguoidung = expressAsyncHandler(async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const user = await UserModel.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }

        await user.remove();

        res.status(200).json({ message: 'Người dùng đã được xóa thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa người dùng.' });
    }
});

export const getnguoidungdetail = expressAsyncHandler(async (req, res) => {
    const user_id = req.params.user_id

    const user = await UserModel.findById({_id: user_id})

    res.status(200).send(user);
});

export const updatenguoidungdetail = expressAsyncHandler(async (req, res) => {
    const user_id = req.params.user_id;
    const { name, email, phone, birthday, sex, status, password } = req.body;

    const existingUserWithPhone = await UserModel.findOne({ phone: phone, _id: { $ne: user_id } });
    if (existingUserWithPhone) {
        return res.status(400).send('Số điện thoại đã tồn tại.');
    }

    const user = await UserModel.findById(user_id);

    if (!user) {
        return res.status(404).send('Người dùng không tồn tại');
    }

    // Kiểm tra xem status có tồn tại hay không
    const statusnew = status ? status : 'nguoi-dung';

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.birthday = birthday;
    user.sex = sex;
    user.status = statusnew;

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    await user.save();

    res.status(200).send('Update thành công');
});


export const updatehoso = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const { name, phone, birthday, sex, service, date, note, diagnostic, tools, payment, debt, totalmoney } = req.body;

    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

    medicalrecord.name = name;
    medicalrecord.birthday = birthday;
    medicalrecord.phone = phone;
    medicalrecord.sex = sex;
    medicalrecord.service = service;
    medicalrecord.date = date;
    medicalrecord.note = note;
    medicalrecord.diagnostic = diagnostic;
    medicalrecord.tools = tools;
    medicalrecord.payment = payment;
    medicalrecord.debt = debt;
    medicalrecord.totalmoney = totalmoney;
    
    await medicalrecord.save();

    res.status(200).send('Update thành công');
});

export const deletememhosobenhan = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id

    const medicalrecord = await MedicalRecord.findById({_id: medicalrecord_Id})

    medicalrecord.soft_delete = true,

    await medicalrecord.save();

    res.status(200).send('Xóa mềm thanh công');
});

export const khoiphucmemhosobenhan = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id

    const medicalrecord = await MedicalRecord.findById({_id: medicalrecord_Id})

    medicalrecord.soft_delete = false,

    await medicalrecord.save();

    res.status(200).send('Khôi phục thanh công');
});

export const xoahosobenhan = expressAsyncHandler(async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const medicalrecord = await MedicalRecord.findById(user_id);

        if (!medicalrecord) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ.' });
        }

        await medicalrecord.remove();

        res.status(200).json({ message: 'Hồ sơ đã được xóa thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa hồ sơ.' });
    }
});

export const getallhosonoxoamem = expressAsyncHandler(async (req, res) => {

    const medicalrecords = await MedicalRecord.find({ status: 'hoan-tat', soft_delete: true });

    const hoadonno = medicalrecords.filter(record => record.debt > 0);

    res.status(200).send(hoadonno);
});
