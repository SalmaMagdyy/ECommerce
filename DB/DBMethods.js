import userModel from "./model/User.model.js";
import categoryModel from "../DB/model/category.model.js"


//find
export const find =async({model,condition,select,limit=10,skip=0,populate=[]})=>{
    let data=await model.find(condition).skip(skip).limit(limit).select(select).populate(populate);
    return data
}

export const findOne =async({model,condition,select,populate=[]}={})=>{
    let data=await model.findOne(condition).select(select).populate(populate);
    return data
}

export const findById =async({model,id,select,populate=[]}={})=>{
    let data=await model.findById(id).select(select).populate(populate);
    return data
}

export const findByIdAndUpdate= async({model,condition={},data,options={}})=>{
const res=await model.findByIdAndUpdate(condition,data,options)
return res;}

export const findOneAndUpdate= async({model,condition={},data,options={}}={})=>{
    const res=await model.findOneAndUpdate(condition,data,options)
    return res;}

//save ... insert
export const create =async({model,data}={})=>{
    let newModel=new model(data);
    let result=await newModel.save()
    return result
}

export const insertMany=async(model,data=[])=>{
    let res=await model.insertMany(data);
    return res
}

//update
export const updateOne=async(model,condition={},options={})=>{
const res=await model.updateOne(condition,options)
return res;}

export const deleteOne =async({model,condition,select,populate=[]}={})=>{
    let data=await model.deleteOne(condition).select(select).populate(populate);
    return data
}
