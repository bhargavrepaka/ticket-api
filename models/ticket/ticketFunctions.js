import { TicketSchema } from "./ticketSchema.js";

export async function createNewTicket(ticketObj){
    try {
        const result=await TicketSchema.create(ticketObj)
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getTickets(userId){
    try {
        const result=await TicketSchema.find({clientId:userId})
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}
export async function getSingleTicket(_id,clientId){
    try {
        const result=await TicketSchema.find({_id,clientId})
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function updateTicketConversation(_id,clientId,message,sender){
    try {
        const result =await TicketSchema.findOneAndUpdate(
            {_id,clientId},
            {status:"Pending operator reply",
            $push:{
                conversations:{message,sender}
            }
        },{new:true}
        )
        return Promise.resolve(result)
        
    } catch (error) {
        return Promise.reject(error)
        
    }
}


export async function updateStatusClose(_id,clientId){
    try {
        const result= await TicketSchema.findOneAndUpdate({_id,clientId},{
            status:"Closed"
        },{new:true})
        console.log(result)
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}