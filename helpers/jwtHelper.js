import  jwt  from "jsonwebtoken";
import { setJwt,getJwt } from "./redisHelper.js";
import { storeUserRefreshJwt } from "../models/user/userFunctions.js";

export async function createAccessJwt(userEmail,userId){
    try {
        const accessToken=await jwt.sign({userEmail},process.env.JWT_SECRET,{expiresIn:"15m"})
        await setJwt(accessToken,userId)
        console.log(accessToken,userId)
        return accessToken
        
    } catch (error) {
        console.log(error)
        return error
    }
    
}

export async function createRefreshJwt(userEmail,userId){
    try {
        const accessToken= await jwt.sign({userEmail},process.env.JWT_SECRET,{expiresIn:"30d"})
        const res= await storeUserRefreshJwt(userId,accessToken)
        return accessToken
        
    } catch (error) {
        console.log(error)
        return error
    }
}