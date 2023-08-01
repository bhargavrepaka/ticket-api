import express from "express";
import {createNewUser,getUserByEmail, getUserById, storeUserRefreshJwt} from "../models/user/userFunctions.js"
import {hashPassword,comparePassword} from "../helpers/bcryptHelper.js"
import { createAccessJwt,createRefreshJwt } from "../helpers/jwtHelper.js";
import { userAuthorizaton } from "../middleware/authMiddleware.js";
import { deleteJwt } from "../helpers/redisHelper.js";


const router=express.Router()



//userProfile v1/user/
router.get("/",userAuthorizaton,async (req,res,next)=>{
    const _id=req.userId

    try {
        const userProfile=await getUserById(_id)
        res.json(userProfile)
    } catch (error) {
        next(error)
    }
})

// create new user v1/user/
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

// login user v1/user/login
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

//logout user
router.delete("/logout",userAuthorizaton,async(req,res,next)=>{
    const {authorization}=req.headers
    const _id=req.userId
    try {
            // delet ein auth
        await deleteJwt(authorization)
        //delete refresh 
        const result=await storeUserRefreshJwt(_id,"")
        return res.json({message:'LogOut Success',result})
    } catch (error) {
        console.log(error)
        next(error)
    }
    
})

export default router 