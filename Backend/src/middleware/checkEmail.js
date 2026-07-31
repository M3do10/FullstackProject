import { userModel } from "../../db/models/user.model.js"


export const checkEmail=async (req,res,next)=>{
    let exists = await userModel.findOne({email:req.body.email})
    if(exists) return res.json({message:"user already registered, please login"})
        next()
}