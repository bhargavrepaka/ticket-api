import express from "express";
import {createNewUser,getUserByEmail} from "../models/user/userFunctions.js"
import {hashPassword,comparePassword} from "../helpers/bcryptHelper.js"
import { createAccessJwt,createRefreshJwt } from "../helpers/jwtHelper.js";



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
        console.log(user)

        if(!user) return next(new Error("user not found"))
        const isMatchPassword= await comparePassword(password,user.password)
        if(!isMatchPassword) throw new Error("password didnt match")
        
        const accessJwt=await createAccessJwt(user.email,`${user._id}`)
        const refreshJwt=await createRefreshJwt(user.email,`${user._id}`)

        res.json({isMatchPassword,accessJwt,refreshJwt})
    } catch (error) {
        return next(error)
    }

})
export default router 