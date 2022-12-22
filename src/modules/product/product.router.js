import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import {  myMulter,fileValidation, HME } from "../../services/multer.js";
import * as productController from "./controller/product.controller.js"
import { endPoints } from "./product.endPoint.js";
import wishList from "../wishList/wishlist.router.js"
const router = Router()

router.use("/:productId/wishList",wishList)

router.get("/",productController.productList)

router.post("/:categoryId/:subCategoryId/:brandId",
auth(endPoints.create),myMulter(fileValidation.image).array("image",7),HME,productController.addProduct)

router.put("/:productId",
auth(endPoints.create),myMulter(fileValidation.image).array("image",7),HME,productController.updateProduct)



export default router