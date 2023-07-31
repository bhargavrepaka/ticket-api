import  express  from "express";
import { createAccessJwt, verifyAccessJwt } from "../helpers/jwtHelper.js";
import { getUserByEmail } from "../models/user/userFunctions.js";
const router=express.Router()

router.get("/",async(req,res,next)=>{
    const {authorization}=req.headers
    console.log(authorization)
    try {
        const decode=await verifyAccessJwt(authorization)
        console.log(decode)
        if(decode.email){
            const userData=await getUserByEmail(decode.email)
            console.log(userData)
            let tokenCreatedAt=userData.refreshJwt.addedAt
            console.log(tokenCreatedAt)
            tokenCreatedAt=tokenCreatedAt.setDate(tokenCreatedAt.getDate()+30)
            console.log(new Date(tokenCreatedAt))

            const today=new Date()
            if(tokenCreatedAt<today)throw new Error("Refresh token expired Please Login")
            const accessJwt= await createAccessJwt(userData.email,`${userData._id}`)
            console.log(accessJwt)

            return res.json({success:true,accessJwt})


        }else throw new Error("not valid")
        
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

export default router