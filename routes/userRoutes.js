import {createNewUser,getUserByEmail,comparePassword} from "../models/user/userFunctions.js"
import { UserSchema } from "../models/user/userSchema.js";
import {hashPassword} from "../helpers/bcryptHelper.js"
import express from "express";
const router=express.Router()

router.get("/",(req,res,next)=>{
    res.json({success:true,message:"sent from user route"})
})

// create new user
router.post("/",async (req,res,next)=>{
    const {name,email,password}=req.body
    try {
        const hashedPassword= await hashPassword(password)
        const result = await createNewUser({...req.body,password:hashedPassword})
        console.log(result)
        res.json({success:true,message:"New User Created",result}) 
    } catch (error) {
        next(error)
    }
     
})

// login user
router.post("/login",async(req,res,next)=>{
    const {email,password}=req.body
    console.log(email,"-",password)

    if(!email||!password){
        const error=new Error("Email or Password field missing")
        return next(error)
    }

    try {
        const user = await getUserByEmail(email)
        if(!user){
            console.log(user)
            return next(new Error("user not found"))
        }
        const isMatchPassword= await comparePassword(password,user.password)
        if(!isMatchPassword) { throw new Error("password didnt match")}
        res.json({isMatchPassword})
    } catch (error) {
        console.log(error)
        return next(error)
    }

})
export default router 