import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./coupon.endPoint.js";
import * as couponRouter from "../coupon/controller/coupon.controller.js"
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Coupon Module"})
})
router.post('/',auth(endPoints.add),couponRouter.AddCoupon)
router.put('/:name',auth(endPoints.add),couponRouter.updateCoupon)
router.put('/stop/:couponId',auth(endPoints.add),couponRouter.stopCoupon)

export default router