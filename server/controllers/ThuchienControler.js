import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { MedicalRecord } from '../models/ChuandoanModel.js';
import { generateToken } from '../untils/until.js';
import expressAsyncHandler from 'express-async-handler';

import bcrypt from 'bcryptjs';  

export const tiepnhan = expressAsyncHandler(async (req, res) => {
    const status = req.params.status;
    console.log(status);
    const medicalrecord= await MedicalRecord.find({ status: status });
    res.status(201).send(medicalrecord)
});

export const tiepnhanthuchien = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    try {
        const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

        if (!medicalrecord) {
            return res.status(404).json({ message: 'Không tồn tại hồ sơ bệnh án' });
        }

        medicalrecord.status = 'dang-thuc-hien';

        await medicalrecord.save();

        res.status(201).send('Đã chuyển thông tin.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const trahoso = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    try {
        const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

        if (!medicalrecord) {
            return res.status(404).json({ message: 'Không tồn tại hồ sơ bệnh án' });
        }

        medicalrecord.status = 'chuan-doan';

        await medicalrecord.save();

        res.status(201).send('Đã chuyển thông tin.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const tiepnhanthuchiendetail = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);
    res.status(201).send(medicalrecord)
});

export const dangthuchien = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const {tools} = req.body
    try {
        const medical= await MedicalRecord.findById(medicalrecord_Id);

        if (!medical) {
            return res.status(404).json({ message: 'Không tồn tại hồ sơ' });
        }

        medical.tools = tools

        await medical.save();

        res.status(201).send('Cập nhật hồ sơ thành công.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const chuyentiepnhan = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    try {
        const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);

        if (!medicalrecord) {
            return res.status(404).json({ message: 'Không tồn tại hồ sơ bệnh án' });
        }

        medicalrecord.status = 'thanh-toan';

        await medicalrecord.save();

        res.status(201).send('Đã chuyển thông tin.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

