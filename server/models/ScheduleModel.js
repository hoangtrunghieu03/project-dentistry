import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Schedule = new Schema({
    user_Id: {type: String},
    name: {type: String},
    phone: {type: String},
    email: {type: String},
    birthday: {type: String},
    sex: {type: String},
    date: {type: String},
    service: {type: String},
    note: {type: String},
    status: {type: String},
},
{
    timestamps: true,
  },
)

export const ScheduleModel = mongoose.model('Schedule', Schedule)