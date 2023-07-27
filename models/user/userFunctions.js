import { UserSchema } from "./userSchema.js";

export const createNewUser=(userObj)=>{
    const user = UserSchema.create(userObj)
    return user
}
