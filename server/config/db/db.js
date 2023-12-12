import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB(){
    const url = 'mongodb://localhost:27017/nhakhoa'
    // const url = 'mongodb+srv://CaoKhaHieu:<CaoKhaHieu>@cluster0.r9hva.mongodb.net/shop?retryWrites=true&w=majority'
    // const url = 'mongodb+srv://CaoKhaHieu:CaoKhaHieu@cluster0.5sfoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            dateStrings: true
        })
        console.log("connected to db")
    } catch (error) {
        console.log(error)
        console.lo("no connect")
    }
}

export default connectDB;