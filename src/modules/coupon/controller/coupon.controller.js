import { create, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model .js ";
import { asyncHandler } from "../../../services/asyncHandler.js";



export const AddCoupon= asyncHandler(async(req,res,next)=>{
    req.body.createdBy=req.user._id;
    let added= await create({model:couponModel,data:req.body})
    res.status(201).json({message:"added",added})
})

export const updateCoupon= asyncHandler(async(req,res,next)=>{
    req.body.updatedBy=req.user._id;
    let{name}=req.params;
    let updated= await findOneAndUpdate({model:couponModel,condition:{name},data:req.body,options:{new:true}})
    res.status(200).json({message:"added",updated})
})

export const stopCoupon= asyncHandler(async(req,res,next)=>{
    req.body.deletedBy=req.user._id;
    let{couponId}=req.params;
    let stopCouponStatus= await findOneAndUpdate({model:couponModel,condition:{_id:couponId},data:{isStopped:true,deletedBy:req.user._id},options:{new:true}})
    res.status(200).json({message:"stopCoupon",stopCouponStatus})
})