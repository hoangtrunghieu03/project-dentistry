import nodemailer from'nodemailer';
import jwt from 'jsonwebtoken'

export const generateResetToken = function (email) {
  const secretKey = 'resetpassword';
  const expiresIn = '5m';
  const token = jwt.sign({ email, timestamp: Date.now() }, secretKey, { expiresIn });
  return token;
};

export const sendResetEmail = function (email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hoanghieu35467@gmail.com',
      pass: 'zuco tgxn fzdi ipuc',
    },
  });

  const mailOptions = {
    from: 'hoanghieu35467@gmail.com',
    to: email,
    subject: 'Reset Password',
    text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
    html: `Click the following link to reset your password: <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export const sendEmailSchedule  = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hoanghieu35467@gmail.com',
      pass: 'zuco tgxn fzdi ipuc',
    },
  });

  const mailOptions = {
      from: 'hoanghieu35467@gmail.com', 
      to: to,
      subject: subject,
      text: text
  };

  try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
  } catch (error) {
      console.error('Error sending email: ', error);
  }
};
