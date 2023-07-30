
import { verifyAccessJwt } from "../helpers/jwtHelper.js"
import { getJwt } from "../helpers/redisHelper.js"


export async function userAuthorizaton(req,res,next){

    const {authorization}=req.headers
    //verify jwt
    try {
        const decode= await verifyAccessJwt(authorization)
        console.log("-----------------")
        console.log(decode,"thy res")
        //check redis store
        if(decode.email){
            const userId=await getJwt(authorization)
            console.log(userId)
            req.userId=userId
            return next()
        }
        else{
            throw new Error("Invalid authorization")
        }
    } catch (error) {
        console.log(error,"this is from authmid")
        return res.json({message:"auth failed boi"})
    }
}
