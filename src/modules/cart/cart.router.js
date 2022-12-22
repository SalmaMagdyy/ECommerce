import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as cartRouter from "../cart/controller/cart.controller.js"
import { endPoints } from "./cart.endPoint.js";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Cart Module"})
})

router.post('/',auth(endPoints.add),cartRouter.addCart)



export default router