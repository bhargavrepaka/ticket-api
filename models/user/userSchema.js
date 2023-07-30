import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    refreshJwt:{
       token:{
        type:String,
        default:""
       },
       addedAt:{
        type:Date,
        required:true,
        default:Date.now()
       }
    }
})

export const UserSchema=mongoose.model("User",userSchema)