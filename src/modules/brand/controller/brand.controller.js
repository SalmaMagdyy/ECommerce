import { asyncHandler } from "../../../services/asyncHandler.js";
import slugify from "slugify";
import { create, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import brandModel from "../../../../DB/model/brand.model.js"
import cloudinary from "../../../services/cloudinary.js";


export const addBrand = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "brands"
        })
        req.body.image = secure_url;
        req.body.public_id = public_id;
        req.body.slug = slugify(req.body.name)
        req.body.createdBy = req.user._id

        const result = await create({ model: brandModel, data: req.body })
        res.status(201).json({ message: "created", result })

    }
})

export const updateBrand = asyncHandler(async (req, res, next) => {
    let { brandId } = req.params;
    if (req.file) {
        let {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, { folder: "category/subCategory" })
        req.body.image=secure_url
        req.body.public_id=public_id
    }
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
    let result = await findByIdAndUpdate({ model: brandModel, condition: { _id: brandId }, data: req.body })
    if(!result){
        await cloudinary.uploader.destroy(req.body.public_id);
        next(new Error("",{cause:404}))
    }else{
        await cloudinary.uploader.destroy(result.public_id);
        res.status(200).json({message:"updated",result})

    }
}
)