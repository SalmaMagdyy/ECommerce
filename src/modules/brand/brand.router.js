import { Router } from "express";
import {auth} from '../../middleware/auth.js'
import { endPoints } from "./brand.endPoint.js";
import {  myMulter,fileValidation, HME } from "../../services/multer.js";
import * as BrandController from "./controller/brand.controller.js"

const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Brand Module"})
})

router.post('/',auth(endPoints.createBrand),myMulter(fileValidation.image).single("image"),HME,BrandController.addBrand)
router.put('/:brandId',auth(endPoints.updateBrand),myMulter(fileValidation.image).single("image"),HME,BrandController.updateBrand)



export default router