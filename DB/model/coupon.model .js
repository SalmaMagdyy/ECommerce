import { Schema, model, Types } from "mongoose";


const couponSchema = new Schema({

    name: {
        type: String,
        required: [true, 'coupon name is required'],
        min: [2, 'coupon name minimum length 2 char'],
        max: [20, 'coupon name max length 2 char'],
        unique:true,
        trim:true,
        

    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required']
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User",
    },
    deletedBy: {
        type: Types.ObjectId, 
        ref: "User",
    },
    amount:{
        type:Number,
        min:[1,"min discount 1%"],
        max:[100,"max discount 100%"]

    },
    expireIn:{
        type:Date,
        required:true
    
    },
    isStopped:{
        type:Boolean,
        default:false
    }
 
 

}, {
    timestamps: true
})


const couponModel = model('coupon', couponSchema)
export default couponModel