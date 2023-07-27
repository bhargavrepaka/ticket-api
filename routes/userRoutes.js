import {createNewUser} from "../models/user/userFunctions.js"
import { UserSchema } from "../models/user/userSchema.js";
import {hashPassword} from "../helpers/bcryptHelper.js"
import express from "express";
const router=express.Router()

router.get("/",(req,res,next)=>{
    res.json({message:"sent from user route"})
})
router.post("/",async (req,res,next)=>{
    const {name,email,password}=req.body
    try {
        const hashedPassword= await hashPassword(password)
        const result = await createNewUser({...req.body,password:hashedPassword})
        console.log(result)
        res.json({message:"New User Created",result}) 
    } catch (error) {
        next(error)
    }
     
})
export default router