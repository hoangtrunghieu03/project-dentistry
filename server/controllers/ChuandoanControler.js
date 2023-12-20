import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { MedicalRecord } from '../models/ChuandoanModel.js';
import { generateToken } from '../untils/until.js';
import expressAsyncHandler from 'express-async-handler';

import bcrypt from 'bcryptjs';  

export const chuandoan = expressAsyncHandler(async (req, res) => {
    const status = req.params.status;
    // res.json(status)
    const medicalrecord= await MedicalRecord.find({ status: status });
    res.status(201).send(medicalrecord)
});

export const chuandoanhoantat = expressAsyncHandler(async (req, res) => {
    // res.json(status)
    const medicalrecord= await MedicalRecord.find({ status: 'hoan-tat', soft_delete: false });
    res.status(201).send(medicalrecord)
});

export const chuandoandetail = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    const medicalrecord = await MedicalRecord.findById(medicalrecord_Id);
    res.status(201).send(medicalrecord)
});

export const tiepnhanback = expressAsyncHandler(async (req, res) => {
    const medicalrecord_Id = req.params.medicalrecord_Id;
    try {
        const medical= await ScheduleModel.findById(medicalrecord_Id);

        if (!medical) {
            return res.status(404).json({ message: 'Không tồn tại hồ sơ' });
        }

        medical.status = 'le-tan'

        await medical.save();

        res.status(201).send('Chuyển phòng thành công.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const uppdatehoso = expressAsyncHandler(async (req, res) => {
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

export const hosoup = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    try {
        const appoin = await ScheduleModel.findById(appoinId);

        if (!appoin) {
            return res.status(404).json({ message: 'Không tồn tại lịch hẹn' });
        }

        appoin.status = 'thuc-hien';

        await appoin.save();

        res.status(201).send('Đã chuyển thông tin.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const tiepnhanup = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.appoinId;
    try {
        const appoin = await ScheduleModel.findById(appoinId);

        if (!appoin) {
            return res.status(404).json({ message: 'Không tồn tại lịch hẹn' });
        }

        appoin.status = 'lich-su';
        
        await appoin.save();

        const medicalrecord = new MedicalRecord({
            user_Id: appoin.user_Id,
            name: appoin.name,
            phone: appoin.phone,
            birthday: appoin.birthday,
            sex: appoin.sex,
            date: appoin.date,
            service: appoin.service,
            note: appoin.note,
            Diagnostic: '',
            tools: '',
            status: 'chuan-doan',
        })

        await medicalrecord.save();

        res.status(201).send('Đã chuyển thông tin.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const updatehosochuandoan = expressAsyncHandler(async (req, res) => {
    const appoinId = req.params.medicalrecord_Id;
    const {service, note, diagnostic} = req.body

    try {

        const medical = await MedicalRecord.findById(appoinId);

        
        if (!medical) {
            return res.status(404).json({ message: 'Không tồn tại lịch hẹn' });
        }

        medical.service = service
        medical.note = note
        medical.diagnostic = diagnostic

        await medical.save();

        res.status(201).send('Cập nhật hồ sơ thành công.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});

export const chuyenhoso = expressAsyncHandler(async (req, res) => {
    const medicalrecordId = req.params.medicalrecord_Id;
    try {
        const medicalrecord = await MedicalRecord.findById(medicalrecordId);

        res.json(medicalrecord)

        if (!medicalrecord) {
            return res.status(404).json({ message: 'Không tồn tại hồ sơ bệnh án' });
        }

        medicalrecord.status = 'thuc-hien';

        await medicalrecord.save();

        res.status(201).send('Đã chuyển thông tin.',);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Đã có lỗi xảy ra.' });
    }
});
