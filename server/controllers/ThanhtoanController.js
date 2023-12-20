import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { MedicalRecord } from '../models/ChuandoanModel.js';
// import { PaybillModel } from '../models/PaybillModel.js';
import { generateToken } from '../untils/until.js';
import { sendEmailMedicalRecord } from '../untils/authUtils.js';
import expressAsyncHandler from 'express-async-handler';

import schedule  from 'node-schedule';

import bcrypt from 'bcryptjs'; 

export const hoadoandetail = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);
    res.status(201).send(medicalrecord)
});

export const thanhtoan = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const { totalmoney, payment, debt } = req.body;

    try {
        const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

        if (!medicalrecord) {
            res.status(404).send('Không tìm thấy hồ sơ y tế.');
            return;
        }

        medicalrecord.totalmoney = totalmoney;
        medicalrecord.payment = payment;
        medicalrecord.debt = debt;
        medicalrecord.status = 'hoan-tat';
        medicalrecord.soft_delete = false;

        await medicalrecord.save();
        const originalBirthday = medicalrecord.birthday;

        const birthdayDate = new Date(originalBirthday);

        const day = birthdayDate.getDate();
        const month = birthdayDate.getMonth() + 1;
        const year = birthdayDate.getFullYear();

        const formattedBirthday = `${day}/${month}/${year}`;
                
        const user = await UserModel.findById(medicalrecord.user_Id);
        const email = user.email;
        const subject = 'Thông tin hôm nay tại phòng khám';
        const text = `Họ và tên: ${medicalrecord.name} \nNgày sinh: ${formattedBirthday} \nDịch vụ: ${medicalrecord.service} \nChuẩn đoán: ${medicalrecord.diagnostic} \nSố tiền trả: ${medicalrecord.payment}\nSố tiền nợ: ${medicalrecord.debt} \nTổng tiền: ${medicalrecord.totalmoney}`;

        await sendEmailMedicalRecord(email, subject, text);

        console.log('Tin nhắn khám bệnh đã được gửi');

        res.status(201).send('Thực hiện thành công.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã xảy ra lỗi khi xử lý yêu cầu.');
    }
});


export const hoadonno = expressAsyncHandler(async (req, res) => {
    const status = req.params.status;
    console.log(status);

    const medicalrecords = await MedicalRecord.find({ status: status, soft_delete: false });


    const hoadonno = medicalrecords.filter(record => record.debt > 0);

    res.status(200).send(hoadonno);
});


export const thanhtoantienno = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const { payment, debt } = req.body;

    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

    medicalrecord.payment = payment,
    medicalrecord.debt = debt

    medicalrecord.save();

    res.status(201).send('Thực hiện thành công.');
});
