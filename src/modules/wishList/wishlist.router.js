import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./endPoints.js";
import * as wishListController from "../wishList/controller/wishlist.controller.js"
const router = Router({mergeParams:true})




router.get('/', (req ,res)=>{
    res.status(200).json({message:"WishList Module"})
})

router.put('/',auth(endPoints.add),wishListController.addWishList)
router.put('/remove',auth(endPoints.remove),wishListController.removeWishList)





export default router