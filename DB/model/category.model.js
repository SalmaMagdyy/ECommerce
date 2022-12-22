import { Schema, model, Types } from "mongoose";


const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'category name is required'],
        min: [2, 'category name minimum length 2 char'],
        max: [20, 'category name max length 2 char']

    },
    image: {
        type: String,
        required: [true, 'category image is required'],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required']
    },
    publicImageId:String

}, {
    timestamps: true
})


const categoryModel = model('Category', categorySchema)
export default categoryModel