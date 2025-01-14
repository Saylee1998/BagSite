import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String
});

export const Product = mongoose.model('Product', productSchema);
