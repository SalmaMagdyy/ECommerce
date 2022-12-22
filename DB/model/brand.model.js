import { Schema, model, Types } from "mongoose";


const brandSchema = new Schema({

    name: {
        type: String,
        required: [true, 'brand name is required'],
        min: [2, 'brand name minimum length 2 char'],
        max: [20, 'brand name max length 2 char'],
        trim:true,
        

    },
    slug:String,
    public_id:{
        type: String,
    },
    image: {
        type: String,
        required: [true, 'brand image is required'],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required']
    },
 

}, {
    timestamps: true
})


const brandModel = model("brand", brandSchema)
export default brandModel