import { findById, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import productModel from "../../../../DB/model/product.model .js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";


export const addWishList = asyncHandler(async (req, res, next) => {
    let { productId } = req.params;
    let founded = await findById({ model: productModel, id: productId })
    if (!founded) {
        return next(new Error("product not founded", { cause: 404 }))
    }

    let updated = await findByIdAndUpdate({
        model: userModel, condition: req.user._id,
        data: {
            //dataset add one time only
                $addToSet: { wishList:productId },
        },
        options: { new: true }
    });
    res.status(200).json({ message: "done", updated })
})


export const removeWishList= asyncHandler(async (req, res, next) => {
    let { productId } = req.params;
    let founded = await findById({ model: productModel, id: productId })
    if (!founded) {
        return next(new Error("product not founded", { cause: 404 }))
    }

    let updated = await findByIdAndUpdate({
        model: userModel, condition: req.user._id,
        data: {
            // remove any place but pop first nd last only 
                $pull: { wishList:productId },
        },
        options: { new: true }
    });
    res.status(200).json({ message: "done", updated })
})