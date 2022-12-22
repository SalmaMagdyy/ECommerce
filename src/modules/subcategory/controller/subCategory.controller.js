import { create, findById, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import subCategoryModel from "../../../../DB/model/subCategory.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";

export const addSubCategory = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    if (!req.file) {
        next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { name } = req.body;
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "category/subCategory"
        })
        const result = await create(subCategoryModel, { name, image: secure_url, createdBy: req.user._id, public_id, categoryId: id })
        res.status(201).json({ message: "created", result })

    }
})

export const updateSubCategory = asyncHandler(async (req, res, next) => {
    let { SubCategoryId } = req.params;
    let { name } = req.body;
    let SubCategory = await findById({ model: subCategoryModel, id: SubCategoryId })
    if (!SubCategory) {
        next(new Error("subCategory not found", { cause: 404 }))
    } else {
        let img_Url = ""
        if (req.file) {
            // name
            let secure_url = await cloudinary.uploader.upload(req.file.path, { folder: "category/subCategory" })
            img_Url = secure_url;
        } else {
            // image
            img_Url = SubCategory.image;
        }
        let updatedSubCategory = await findByIdAndUpdate({ model: subCategoryModel, condition: { _id: SubCategoryId }, data: { name, image: img_Url }, options: { new: true } })
        res.status(200).json({ message: "updated", updatedSubCategory })
    }
})

export const getSubCategory = asyncHandler(async (req, res, next) => {
    let { subCategoryId } = req.params;
    let subcategory = await findById({ model: subCategoryModel, id: subCategoryId })
    if (!subcategory) {
        next(new Error("not found"), { cause: 404 })
    } else {
        const cursor = subCategoryModel.findById(subCategoryId).select("categoryId name").cursor();
        let allData=[]

        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            let myObj = doc.toObject();
            let category=await categoryModel.findById(myObj.categoryId).select("name");
            myObj.category=category;
            allData.push(myObj)
            console.log(category);
        }
        res.status(200).json({ message: "done", allData })
    }
})
