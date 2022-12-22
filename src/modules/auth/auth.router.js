import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { endPoints } from "./auth.endPoint.js";
import { signUpValidation, updateRole } from "./auth.validation.js";
import * as registerController from "./controller/registration.js"
const router = Router()

router.get('/', (req ,res)=>{
    res.status(200).json({message:"auth Module"})
})
router.post('/signup',validation(signUpValidation),registerController.signup)
router.get('/confirmEmail/:token',registerController.confirmEmail)
router.get('/refreshToken/:token',registerController.refreshToken)
router.post('/login',registerController.login)
router.put('/updateRole',validation(updateRole),auth(endPoints.updateRole),registerController.updateRole)




export default router