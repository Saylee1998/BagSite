import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
});



export const User = mongoose.model('User', userSchema);