import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Paybill = new Schema({
    user_Id: {type: String},
    medicalrecord_Id: {type: String},
    totalmoney: {type: String},
    payment: {type: String},
    debt: {type: String},
},
{
    timestamps: true,
  },
)

export const PaybillModel = mongoose.model('Paybill', Paybill)