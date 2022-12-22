import { Schema, model, Types } from "mongoose";


const subCategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'subCategory name is required'],
        min: [2, 'subCategory name minimum length 2 char'],
        max: [20, 'subCategory name max length 2 char']

    },
    public_id:{
        type: String,
    },
    image: {
        type: String,
        required: [true, 'subCategory image is required'],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required']
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: [true, 'categoryId is required']
    }


}, {
    timestamps: true
})


const subCategoryModel = model('subCategory', subCategorySchema)
export default subCategoryModel