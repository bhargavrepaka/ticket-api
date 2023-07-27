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

export function comparePassword(password,hashedPassword){
    return bcrypt.compare(password,hashedPassword)
}