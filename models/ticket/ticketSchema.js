import mongoose, { Schema } from "mongoose";

const ticketSchema=mongoose.Schema({
    clientId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    subject:{
        type:String,
        maxlength:100,
        required:true,
    },
    openedAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        required:true,
        default:"Pending operator response"
    },
    conversations:[
        {
            sender:{
                type:String,
                required:true,
            },
            message:{
                type:String,
                maxlength:1000,
                required:true,
            },
            msgAt:{
                type:Date,
                required:true,
                default:Date.now()
            }
        }
    ]
})

export const TicketSchema=mongoose.model("Ticket",ticketSchema)