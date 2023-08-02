import express from "express";
import { createNewTicket, getTickets } from "../models/ticket/ticketFunctions.js";
import { userAuthorizaton } from "../middleware/authMiddleware.js";

const router=express.Router()

// router.all("/",(req,res,next)=>{
//     res.send({message:"sent from task route"})
// })
//new ticket
router.post("/",userAuthorizaton ,async(req,res,next)=>{
    const {subject,message,sender}=req.body
    const userId=req.userId
    const ticketObj={
        clientId:userId,
        subject,
        conversations:[
            {message,sender}
        ] 
    }
    try {
        const newTicket=await createNewTicket(ticketObj)
        return res.json(newTicket)
    } catch (error) {
        next(error)
    }
})


export default router