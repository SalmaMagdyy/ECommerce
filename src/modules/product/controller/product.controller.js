import { create, find, findById, findByIdAndUpdate, findOne } from "../../../../DB/DBMethods.js";
import brandModel from "../../../../DB/model/brand.model.js";
import subCategoryModel from "../../../../DB/model/subCategory.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import slugify from "slugify";
import cloudinary from '../../../services/cloudinary.js'
import productModel from "../../../../DB/model/product.model .js";
import { paginate } from "../../../services/pagination.js";

export const addProduct = asyncHandler(async (req, res, next) => {
    let { categoryId, subCategoryId, brandId } = req.params;
    let foundedSubCategory = await findOne({ model: subCategoryModel, condition: { _id: subCategoryId, categoryId: categoryId } })
    if (!foundedSubCategory) {
        next(new Error("subcategory or categoryId  not found", { cause: 404 }))
    } else {
        let brand = await findById({ model: brandModel, id: brandId });
        if (!brand) {
            next(new Error("brand not found", { cause: 404 }))
        } else {
            if (!req.files?.length) {
                next(new Error("you have to add images", { cause: 400 }))

            } else {
                let { name, discount, price } = req.body;
                req.body.slug = slugify(name);
                req.body.stock = req.body.totalItems;
                req.body.finalPrice = price - ((price * discount || 0) / 100)
                req.body.categoryId = categoryId;
                req.body.subCategoryId = subCategoryId;
                req.body.brandId = brandId;
                req.body.createdBy = req.user._id;
                req.body.soldItems = 0;

                let imagesURL = [];
                let imageIds = [];
                for (const file of req.files) {
                    let { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: "brands/products" })
                    imagesURL.push(secure_url)
                    imageIds.push(public_id)
                }
                req.body.images = imagesURL;
                req.body.publicImagesIds = imageIds;
                let product = await create({ model: productModel, data: req.body })
                if (!product) {
                    for (const id of imageIds) {
                        await cloudinary.uploader.destroy(id)
                    }
                    next(new Error("error when insert db", { cause: 400 }))

                } else {
                    res.status(201).json({ message: "created0", product })
                }




            }
        }

    }
})


export const updateProduct = asyncHandler(async (req, res, next) => {
    let { productId } = req.params;
    let product = await findById({ model: productModel, id: productId })
    if (!product) {
        next(new Error("product  not found", { cause: 404 }))
    } else {
        let { name, discount, price, totalItems } = req.body;
        if (name) {
            req.body.slug = slugify(name);
        }
        if (price && discount) {
            req.body.finalPrice = price - ((price * discount) / 100)
        } else if (price) {
            req.body.finalPrice = price - ((price * product.discount) / 100)
        } else if (discount) {
            req.body.finalPrice = product.price - ((product.price * discount) / 100)
        }
        if (totalItems) {
            let currentStock = totalItems - product.soldItems
            req.body.stock = currentStock > 0 ? currentStock : 0
        }
        if (req.files?.length) {
            let imagesURL = [];
            let imageIds = [];
            for (const file of req.files) {
                let { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: "brands/products" })
                imagesURL.push(secure_url)
                imageIds.push(public_id)
            }
            req.body.images = imagesURL;
            req.body.publicImagesIds = imageIds;
        }
        req.body.updatedBy = req.user._id
        let updatedProduct = await findByIdAndUpdate({ model: productModel, condition: { _id: productId }, data: req.body, options: { new: true } })
        if (!updatedProduct) {
            if (req.body.publicImagesIds) {
                for (const id of publicImagesIds) {
                    await cloudinary.uploader.destroy(id)
                }
            }
            next(new Error("DB Error", { cause: 400 }))
        } else {
            if (req.body.publicImagesIds) {
                for (const id of product.publicImagesIds) {
                    await cloudinary.uploader.destroy(id)
                }
            }
            res.status(200).json({ message: "updated" })
        }


    }
}
)

const populate = [
    {
        path: "categoryId",
    },
    {
        path: "createdBy",
        select:"userName"
    },
    {
        path: "subCategoryId",
    },{
        path: "brandId",
    },
]

export const productList = asyncHandler(async (req, res, next) => {
    let { limit, skip } = paginate(req.query.page, req.query.size)
    let products = await find({ model: productModel, skip, limit ,populate:[...populate]})
    res.status(200).json({ message: "done", products })

})


