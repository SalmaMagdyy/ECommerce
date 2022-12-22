import { create, deleteOne, find, findById,  findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";
import { paginate } from "../../../services/pagination.js";

export const addCategory = asyncHandler(async (req, res, next) => {

    if (!req.file) {
        next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { name } = req.body;
        let { secure_url,public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "category"
        })
        const result = await create({model:categoryModel,data: { name, image: secure_url, createdBy: req.user._id,publicImageId:public_id }})
        res.status(201).json({ message: "created", result })

    }
})

export const updateCategory = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    let category = await findById({model:categoryModel,id: id})
    if (!category) {
        next(new Error("category not found", { cause: 404 }))
    } else {
        let img_Url="";
        let publicImageId=""
        if (req.file) {
            // name
            let  {secure_url,public_id}  = await cloudinary.uploader.upload(req.file.path, { folder: "category" })
            img_Url = secure_url;
            publicImageId=public_id;
        } else {
            // image
            img_Url = category.image;
            publicImageId=category.public_id;
        }
        let updatedCategory = await findByIdAndUpdate({model:categoryModel,condition: { _id: id },data:{ name, image: img_Url,publicImageId },options: { new: true }})
        res.status(200).json({ message: "updated", updatedCategory })
    }
})

export const Categories= asyncHandler(async(req,res,next)=>{
    let {limit,skip}=paginate(req.query.page,req.query.size);
    let allCategories=await find({model:categoryModel,limit,skip});
    res.status(200).json({message:"done",allCategories})
})

export const getCategoryById= asyncHandler(async(req,res,next)=>{
    let {categoryId}=req.params
    let category=await findById({model:categoryModel,id:categoryId});
    if(!category){
        next(new Error("invalid category"),{cause:404})
    }else{
    res.status(200).json({message:"done",category})}
})

export const deleteCategory= asyncHandler(async(req,res,next)=>{
    let {categoryId}=req.params
    let dCategory=await findById({model:categoryModel,id:categoryId});
    if(!dCategory){
        next(new Error("invalid category"),{cause:404})
    }else{
        let deletedCategory = await deleteOne({model:categoryModel,condition: { _id: categoryId},options: { new: true }})
        res.status(200).json({ message: "deleted", deletedCategory })
    }})