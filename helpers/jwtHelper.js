import  jwt  from "jsonwebtoken";
import { setJwt,getJwt, deleteJwt } from "./redisHelper.js";
import { storeUserRefreshJwt } from "../models/user/userFunctions.js";

// export async function createAccessJwt(userEmail,userId){
//     try {
//         const accessToken=await jwt.sign({email:userEmail},process.env.JWT_SECRET,{expiresIn:"30d"})
//         await setJwt(accessToken,userId)
//         return Promise.resolve(accessToken)
        
//     } catch (error) {
//         console.log(error)
//         return Promise.reject(error)
//     }  
// }

export async function createAccessJwt(uid,userId){
    try {
        const accessToken=await jwt.sign(uid,process.env.JWT_SECRET)
        await setJwt(accessToken,userId)
        return Promise.resolve(accessToken)
        
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }  
}

export async function createRefreshJwt(userEmail,userId){
    try {
        const accessToken= await jwt.sign({email:userEmail},process.env.JWT_SECRET,{expiresIn:"30d"})
        await storeUserRefreshJwt(userId,accessToken)
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
        if(error.message==="jwt expired"){
            await deleteJwt(userJwt)
        }
        return Promise.reject(error)
    }
}