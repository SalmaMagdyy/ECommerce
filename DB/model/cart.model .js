import { Schema, model, Types } from "mongoose";


const cartSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required'],
        unique:true
    },
    products:{
        type:[{
            productIds:{
                type:Types.ObjectId,
                ref:'Product',
                required:[true, 'Product is required']
            },quantity:{
                type:Number,
                default:1
            }
        }]
    }

}, {
    timestamps: true
})


const cartModel = model("Cart", cartSchema)
export default cartModel