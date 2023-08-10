import express from "express";
import { createNewTicket, getSingleTicket, getTickets,updateTicketConversation,updateStatusClose, getTicketsAdmin } from "../models/ticket/ticketFunctions.js";
import { userAuthorizaton } from "../middleware/authMiddleware.js";
import { getUserById } from "../models/user/userFunctions.js";

const router=express.Router()

// router.all("/",(req,res,next)=>{
//     res.send({message:"sent from task route"})
// })
//new ticket
router.post("/",userAuthorizaton ,async(req,res,next)=>{
    const {subject,message,sender}=req.body
    const userId=req.user._id
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

//get all tickets  of a user
router.get("/",userAuthorizaton,async (req,res,next)=>{
    // const userId=req.userId
    // const userProfile= await getUserById(userId)
    // console.log(userProfile)

    //for firebase
    const userProfile=req.user
    const userId=req.user._id
    if(userProfile.role==="admin"){
        try {
            const allTickets=await getTicketsAdmin()
            console.log(allTickets)
            return res.json(allTickets)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    try {
        const allTickets=await getTickets(userId)
        console.log(allTickets)
        return res.json(allTickets)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//get details of single ticket
router.get("/:_id",userAuthorizaton,async (req,res,next)=>{
    const userId=req.userId
    const {_id}= req.params
    console.log(_id)
    try {
        const singleTicket=await getSingleTicket(_id,userId)
        console.log(singleTicket)
        return res.json(singleTicket)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
//sending reply to converstion
router.put("/:_id",userAuthorizaton,async(req,res,next)=>{
    const userId=req.userId
    const {_id}=req.params
    const {message,sender}=req.body
    if(!message ||!sender) next( new Error("message and sender both needed"))
    try {
        const result= await updateTicketConversation(_id,userId,message,sender)
        return res.json({success:true,message:"your message sent",result})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//updating the status of ticket
router.patch("/close-ticket/:_id",userAuthorizaton,async(req,res,next)=>{
    const {_id}=req.params
    const userId=req.userId
    try {
        await updateStatusClose(_id,userId)
        res.json({success:true,message:"ticket closed"})
    } catch (error) {
        console.log(error)
        next(error)
    }

})
export default router