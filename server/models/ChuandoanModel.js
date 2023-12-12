import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Medicalrecord = new Schema({
    user_Id: {type: String},
    name: {type: String},
    phone: {type: String},
    birthday: {type: String},
    sex: {type: String},
    date: {type: String},
    service: {type: String},
    note: {type: String},
    diagnostic: {type: String},
    tools: {type: String},
    totalmoney: {type: Number},
    payment: {type: Number},
    debt: {type: Number},
    status: {type: String},
    soft_delete: {type: Boolean},
},
{
    timestamps: true,
  },
)

export const MedicalRecord = mongoose.model('Medicalrecord', Medicalrecord)