import { UserSchema } from "./userSchema.js";
import bcrypt, { hash } from "bcrypt"

export const createNewUser=(userObj)=>{
    const user = UserSchema.create(userObj)
    return user
}

export function getUserByEmail(email){
    
    const user =  UserSchema.findOne({email})
    return user
}

export function storeUserRefreshJwt(_id,token){
    try {
        return UserSchema.findOneAndUpdate({_id},
            {"refreshJwt.token":token,"refreshJwt.addedAt":Date.now()},{new:true})
    } catch (error) {
        console.log(error)
        return errror
    }
}