import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Lichhen = new Schema({
    name: {type: String},
    phone: {type: String},
    date: {type: String},
},
{
    timestamps: true,
  },
)

export const LichhenModel = mongoose.model('Lichhen', Lichhen)