import { Router } from "express";
import {auth} from '../../middleware/auth.js'
import { endPoints } from "./subcategory.endPoint.js";
import {  myMulter,fileValidation,HME } from "../../services/multer.js";
import * as subCategoryController from './controller/subCategory.controller.js'
const router = Router({mergeParams:true})




router.post('/',auth(endPoints.addSubCategory),myMulter(fileValidation.image).single('image'),HME,subCategoryController.addSubCategory)
router.get('/:subCategoryId',auth(endPoints.addSubCategory),subCategoryController.getSubCategory)

router.put('/:SubCategoryId',auth(endPoints.addSubCategory),myMulter(fileValidation.image).single('image'),HME,subCategoryController.updateSubCategory)

export default router