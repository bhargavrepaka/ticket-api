import { UserSchema } from "./userSchema.js";
import bcrypt, { hash } from "bcrypt"

export const createNewUser=async (userObj)=>{
    try {
        const user =await UserSchema.create(userObj)
        return Promise.resolve(user)
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export async function getUserByEmail(email){ 
    try {
        const user =await UserSchema.findOne({email})
        return Promise.resolve(user)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function storeUserRefreshJwt(_id,token){
    try {
        const res=await UserSchema.findOneAndUpdate({_id},
            {"refreshJwt.token":token,"refreshJwt.addedAt":Date.now()},{new:true})
        return Promise.resolve(res)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export async function getUserById(_id){
    try {
        const userData=await UserSchema.findById(_id)
        return Promise.resolve(userData)
    } catch (error) {
        return Promise.reject(error)
    }
   
}