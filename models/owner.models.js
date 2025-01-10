
import mongoose, { Schema } from 'mongoose';



const ownerSchema = new Schema({
    fullname: {
        type:String
    },
    email: String,
    password: String,

    products: {
        type: Array,
        default: []
    },
    
    picture: String
});


export const Owner = mongoose.model('Owner', ownerSchema);