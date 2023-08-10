import { UserSchema } from "./userSchema.js";


export async function getUserByUid(uid){ 
    try {
        console.log(uid)
        const user =await UserSchema.findOne({uid})
        return Promise.resolve(user)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createFirebaseUser=async (userObj)=>{
    try {
        const user =await UserSchema.create(userObj)
        return Promise.resolve(user)
    } catch (error) {
        return Promise.reject(error)
    }
}
