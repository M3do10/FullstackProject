import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Food', 'Toys', 'Beauty']
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    image: {
        type: String,
        default: "default-product.png"
    }
}, {
    timestamps: true,
    versionKey: false
})

export const productModel = model("Product", productSchema)
