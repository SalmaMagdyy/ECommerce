import {  create, findOne, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import cartModel from "../../../../DB/model/cart.model .js";
import { asyncHandler } from "../../../services/asyncHandler.js";


export const addCart=asyncHandler(async(req,res,next)=>{
    let{_id}=req.user;
    req.body.userId=_id;
    let cart=await findOne({model:cartModel,condition:{userId:_id}})
    if(!cart){
        let added=await create({model:cartModel,data:req.body})
        return res.status(201).json({message:"added",added})
    }
    
    for (const product of req.body.products) {
        let matched=false;
        for (let i = 0; i < cart.products.length; i++) {
            if(product.productIds==cart.products[i].productIds.toString()){
                cart.products=product;
                matched=true;
                break;
            }
            
        }
        if(!matched){
            cart.products.push(product)
        }
        
    }
    let updated=await findOneAndUpdate({model:cartModel,condition:{userId:req.user._id},data:cart,options:{new:true}})
    res.status(200).json({message:"updated",updated})

})