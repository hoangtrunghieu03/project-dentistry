import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const User = new Schema({
    name:{type: String},
    email: {type: String},
    password: {type: String, required: true},
    address: {type:String},
    phone: {type: String},
    birthday: {type: String},
    sex: {type: String},
    status: {type: String},
    soft_delete: {type: Boolean},
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    isAdmin: {type: Boolean}
},
{
    timestamps: true,
  },
)

export const UserModel = mongoose.model('User', User)