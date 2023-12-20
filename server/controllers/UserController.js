import { UserModel } from '../models/UserModel.js';
import { ScheduleModel } from '../models/scheduleModel.js';
import { generateToken } from '../untils/until.js';
import { MedicalRecord } from '../models/ChuandoanModel.js';
import expressAsyncHandler from 'express-async-handler';
import schedule  from 'node-schedule';
import jwt from 'jsonwebtoken'
import { generateResetToken, sendResetEmail, sendEmailSchedule, sendEmailRegesteruser } from '../untils/authUtils.js';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';

// import moment from 'moment-timezone';

export const getAllUser = (req, res) => {
    UserModel.find({})
        .then(user => res.send(user))
        .catch(err => console.log(err));
}

export const sendotp = expressAsyncHandler(async (req, res) => {
        const email = req.body.email;

        const existingUser = await UserModel.findOne({ email });

        if(!existingUser) {
            const generatedOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

            const user = new UserModel({
                email: email,
                generatedOTP: generatedOTP,
                resetTokenExpires: new Date(Date.now() + 300000)
            });

            await user.save()

            const subject = 'Mã OTP';
            const text = `OTP có hạn sử dạng trong 5 phút: ${generatedOTP}`

            await sendEmailSchedule(email, subject, text);
    
            res.status(200).json({ message: 'OTP sent successfully' });
        } else if (existingUser.password == null)  {
            const generatedOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        
            existingUser.generatedOTP = generatedOTP;
            existingUser.resetTokenExpires = new Date(Date.now() + 300000);
        
            await existingUser.save();
        
            const subject = 'Mã OTP';
            const text = `OTP có hạn sử dạng trong 5 phút: ${generatedOTP}`
        
            await sendEmailSchedule(email, subject, text);
        
            res.status(200).json({ message: 'OTP sent successfully' });
        } else {
            res.status(500).json({ error: 'Email tồn tại' });
        }
})

export const verifyotp = expressAsyncHandler(async (req, res) => {
    const { name, password, generatedOTP, phone, birthday, sex } = req.body;
  
    try {
        const existingUser = await UserModel.findOne({ phone });

        if (existingUser) {
            res.status(400).send({ message: 'Trùng số điện thoại' });
            return;
        }

        const user = await UserModel.findOne({
        generatedOTP: generatedOTP,
        resetTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.name = name
        user.phone = phone
        user.password = hashedPassword
        user.birthday = birthday
        user.sex = sex
        user.address = ''
        user.status = 'nguoi-dung'
        user.soft_delete = false
        user.isAdmin = false
        user.generatedOTP = null;
        user.resetTokenExpires = null;

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
    } catch (error) {
        console.error(error);
        if (error.name === 'OTPExpiredError') {
        res.status(400).json({ message: 'OTP expired' });
        } else {
        res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, password, phone, birthday, sex } = req.body;

    const existingUser = await UserModel.findOne({ phone });

    if (existingUser) {
        res.status(400).send({ message: 'Trùng số điện thoại' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
        name,
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

export const schedules = expressAsyncHandler(async (req, res) => {
    const user_Id = req.params.userId;
    const {date, service, note} = req.body;
    const user = await UserModel.findById({_id: user_Id})

    const schedule = await new ScheduleModel({
        user_Id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        birthday: user.birthday,
        sex: user.sex,
        date,
        service,
        note,
        status: 'nguoi-dung',
    });

    const scheduleNew = await schedule.save();

    await res.status(201).send(scheduleNew);
    
});

export const appointment = expressAsyncHandler(async (req, res) => {
    try {
        const currentDate = new Date();

        const appointments = await ScheduleModel.find({
            status: 'nguoi-dung',
            date: { $gte: currentDate.toISOString().split('T')[0] }  
        }).sort({ date: 1 });

        res.status(201).send(appointments);
    } catch (error) {
        res.status(500).send({ message: 'Lỗi server khi lấy danh sách tiếp nhận.', error });
    }
});


export const historyappointment = expressAsyncHandler(async (req, res) => {
    const user_Id = req.params.userId;

    const appointments = await ScheduleModel.find({ user_Id: user_Id, status : 'lich-su' });

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

export const forgotpassword = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.json({ message: 'Email không đúng' });
      }
  
      const resetToken = generateResetToken(user.email);
      user.resetToken = resetToken; 
      user.resetTokenExpires = new Date(Date.now() + 600000);
      await user.save();
  
      sendResetEmail(email, resetToken);
  
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});


export const resetpassword = expressAsyncHandler(async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;
  
    try {
      const decodedToken = jwt.verify(token, 'resetpassword');
      const email = decodedToken.email;
  
      const user = await UserModel.findOne({
        email,
        resetToken: token,
        resetTokenExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpires = null;
      await user.save();
  
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      if (error.name === 'TokenExpiredError') {
        res.status(400).json({ message: 'Token expired' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
});


const sendReminderBefore3Days = async () => {
    const threeDaysBefore = new Date();
    threeDaysBefore.setDate(threeDaysBefore.getDate() + 4);
    const formattedThreeDaysBefore = threeDaysBefore.toISOString().split('T')[0];

    const appointments = await ScheduleModel.find({ date: formattedThreeDaysBefore, status: 'nguoi-dung' });

    if (appointments.length > 0) {
        appointments.forEach(async (appointment) => {
            const email = appointment.email;
            const service = appointment.service;
            const rawDate = appointment.date;
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(rawDate));

            const subject = 'Nhắc nhở về lịch hẹn';
            const text = `Bạn có lịch hẹn khám bệnh sau 3 ngày. \nNgày khám: ${formattedDate}. \nDịch vụ: ${service}.\nĐừng quên!`;

            await sendEmailSchedule(email, subject, text);
        });

        console.log('Tin nhắn trước 3 ngày đã được gửi');
    } else {
        console.log('Không có lịch hẹn nào trong vòng 3 ngày');
    }
};


const sendReminderBefore1Day = async () => {
    const oneDayBefore = new Date();
    oneDayBefore.setDate(oneDayBefore.getDate() + 2);
    const formattedOneDayBefore = oneDayBefore.toISOString().split('T')[0];
    console.log(formattedOneDayBefore)

    const appointments = await ScheduleModel.find({ date: formattedOneDayBefore, status: 'nguoi-dung' });

    if (appointments.length > 0) {
        appointments.forEach(async (appointment) => {
            const email = appointment.email;
            const service = appointment.service;
            const rawDate = appointment.date;
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(rawDate));

            const subject = 'Nhắc nhở về lịch hẹn';
            const text = `Bạn có lịch hẹn khám bệnh sau 1 ngày. \nNgày khám: ${formattedDate}. \nDịch vụ: ${service}.\nĐừng quên!`;

            await sendEmailSchedule(email, subject, text);
        });

        console.log('Tin nhắn trước 1 ngày đã được gửi');
    } else {
        console.log('Không có lịch hẹn nào trong vòng 1 ngày');
    }
};


const sendReminderOnTheDay = async () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const formattedDate = currentDate.toISOString().split('T')[0];

    console.log(formattedDate)

    const appointments = await ScheduleModel.find({ date: formattedDate, status: 'nguoi-dung' });

    if (appointments.length > 0) {
        appointments.forEach(async (appointment) => {
            const email = appointment.email;
            const service = appointment.service;
            const rawDate = appointment.date;
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(rawDate));

            const subject = 'Nhắc nhở về lịch hẹn';
            const text = `Bạn có lịch hẹn khám bệnh hôm nay. \nNgày khám: ${formattedDate}. \nDịch vụ: ${service}.\nĐừng quên!`;

            await sendEmailSchedule(email, subject, text);
        });

        console.log('Tin nhắn trong ngày đã được gửi');
    } else {
        console.log('Không có lịch hẹn nào trong ngày hôm nay');
    }
};


// schedule.scheduleJob('*/5 * * * * *', checkAndSendReminder);

schedule.scheduleJob('0 0 0 * * *', sendReminderBefore3Days);
schedule.scheduleJob('0 0 0 * * *', sendReminderBefore1Day);
schedule.scheduleJob('0 0 0 * * *', sendReminderOnTheDay);  


