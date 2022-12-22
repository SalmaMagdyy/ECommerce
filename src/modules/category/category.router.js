import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import {  myMulter,fileValidation, HME } from "../../services/multer.js";
import * as categoryController from "../category/controller/category.controller.js"
import  subcategoryRouter  from "../subcategory/subcategory.router.js";
import { endPoints } from "./category.endPoint.js";
const router = Router()

router.use('/:id/subCategory',subcategoryRouter)
router.get('/',auth(endPoints.addCategory),categoryController.Categories)
router.get('/:categoryId',auth(endPoints.addCategory),categoryController.getCategoryById)


router.post('/add',auth(endPoints.addCategory),myMulter(fileValidation.image).single('image'),HME,categoryController.addCategory)
router.put('/update/:id',auth(endPoints.updateCategory),myMulter(fileValidation.image).single('image'),HME,categoryController.updateCategory)
router.delete('/:categoryId',auth(endPoints.updateCategory),categoryController.deleteCategory)


export default router