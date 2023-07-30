import  jwt  from "jsonwebtoken";
import { setJwt,getJwt } from "./redisHelper.js";
import { storeUserRefreshJwt } from "../models/user/userFunctions.js";

export async function createAccessJwt(userEmail,userId){
    try {
        const accessToken=await jwt.sign({email:userEmail},process.env.JWT_SECRET,{expiresIn:"15m"})
        await setJwt(accessToken,userId)
        console.log(accessToken,userId)
        return Promise.resolve(accessToken)
        
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }  
}

export async function createRefreshJwt(userEmail,userId){
    try {
        const accessToken= await jwt.sign({email:userEmail},process.env.JWT_SECRET,{expiresIn:"30d"})
        const res= await storeUserRefreshJwt(userId,accessToken)
        return Promise.resolve(accessToken)
        
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export async function verifyAccessJwt(userJwt){
    try {
        return Promise.resolve(await jwt.verify(userJwt,process.env.JWT_SECRET))
    } catch (error) {
        return Promise.reject(error)
    }
}