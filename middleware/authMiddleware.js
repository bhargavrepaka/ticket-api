
import { verifyAccessJwt } from "../helpers/jwtHelper.js"
import { getJwt } from "../helpers/redisHelper.js"
import { getUserByUid } from "../models/user/userFirebase.js"


export async function userAuthorizaton(req,res,next){

    // const {authorization}=req.headers
    // console.log(authorization)
    // //verify jwt
    // try {
    //     const decode= await verifyAccessJwt(authorization)
    //     //check redis store
    //     if(decode.uid){
    //         const userId=await getJwt(authorization)
    //         req.userId=userId
    //         return next()
    //     }
    //     else{
    //         throw new Error("Invalid authorization")
    //     }
    // } catch (error) {
    //     console.log(error,"this is from authmid")
    //     return res.status(500).json({message:error.message})
    // }

    
    const {authorization}=req.headers
    try{

        const user=await getUserByUid(await verifyAccessJwt(authorization))
        if(user){
            req.user=user
            return next()
        }
        else {throw new Error("Invalid authorization")}
    }
    catch(error){
        console.log(error,"this is from authmid")
        return res.status(500).json({message:error.message})
    }
}
