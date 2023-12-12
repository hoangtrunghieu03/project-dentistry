import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { MedicalRecord } from '../models/ChuandoanModel.js';
import { PaybillModel } from '../models/PaybillModel.js';
import { generateToken } from '../untils/until.js';
import expressAsyncHandler from 'express-async-handler';

import bcrypt from 'bcryptjs'; 

export const hoadoandetail = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);
    res.status(201).send(medicalrecord)
});

export const thanhtoan = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const { totalmoney, payment, debt } = req.body;

    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

    medicalrecord.totalmoney = totalmoney,
    medicalrecord.payment = payment,
    medicalrecord.debt = debt
    medicalrecord.status = 'hoan-tat'
    medicalrecord.soft_delete = false

    medicalrecord.save();

    res.status(201).send('Thực hiện thành công.');
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
