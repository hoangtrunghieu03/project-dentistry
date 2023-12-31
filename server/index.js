import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db/db.js'

import UserRouter from './routers/UserRouter.js'

import {createServer} from 'http'
// import {Server} from 'socket.io'

import {ConnectSocket} from './config/socket/socket.js'

import cloudinary from './config/cloudinary/cloudinary.js'

import Letan from './routers/LetanRouter.js'
import Chuandoan from './routers/ChuanDoanRouter.js'
import Thuchien from './routers/ThuchienRouter.js'
import Thanhtoan from './routers/Thanhtoan.js'
import Admin from './routers/AdminRouter.js'

dotenv.config();
process.env.TOKEN_SECRET;

const app = express()
const PORT = process.env.PORT || 4000
const server = createServer(app)

ConnectSocket(server)
connectDB()

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/user', UserRouter)
app.use('/le-tan', Letan)
app.use('/chuan-doan', Chuandoan)
app.use('/thuc-hien', Thuchien)
app.use('/thanh-toan', Thanhtoan)
app.use('/admin', Admin)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`))