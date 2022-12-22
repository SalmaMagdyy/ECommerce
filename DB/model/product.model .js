import { Schema, model, Types } from "mongoose";


const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'product name is required'],
        min: [2, 'product name minimum length 2 char'],
        max: [20, 'product name max length 2 char']

    },
    slug:String,
    description:{
        type: String,
        required: [true, 'description  is required'],
        min: [2, 'description  minimum length 2 char'],
        max: [200, 'description  max length 2 char']
    },
    image: {
        type: [String],
        required: [true, 'product images are required'],
    },
    publicImageId:[String],
    Stock:{
        type:Number,
        default:0,
        required:[true,'stock is required']
    },
    price:{
        type: Number,
        required: [true, 'price is required'],
    },
    discount: {
        type:Number},
    finalPrice:{
        type: Number
    },
    colors:{
        type:[String],
    },
    sizes:{
        type:String,
        enum:["sm","md","lg","xl","free"],
        default:"free"
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: [true, 'categoryId is required']
    },
    subCategoryId : {
        type: Types.ObjectId,
        ref: "subCategory",
        required: [true, 'subcategoryId is required']
    },
    brandId: {
        type: Types.ObjectId,
        ref: "brand",
        required: [true, 'brandId is required']
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
    soldItem:Number,
    totalItems:Number


}, {
    timestamps: true
})


const productModel = model('Product', productSchema)
export default productModel