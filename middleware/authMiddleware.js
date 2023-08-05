
import { verifyAccessJwt } from "../helpers/jwtHelper.js"
import { getJwt } from "../helpers/redisHelper.js"


export async function userAuthorizaton(req,res,next){

    const {authorization}=req.headers
    console.log(authorization)
    //verify jwt
    try {
        const decode= await verifyAccessJwt(authorization)
        //check redis store
        if(decode.email){
            const userId=await getJwt(authorization)
            req.userId=userId
            return next()
        }
        else{
            throw new Error("Invalid authorization")
        }
    } catch (error) {
        console.log(error,"this is from authmid")
        return res.status(500).json({message:error.message})
    }
}
