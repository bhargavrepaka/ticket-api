import { TicketSchema } from "./ticketSchema.js";

export function createNewTicket(ticketObj){
    try {
        const result=TicketSchema.create(ticketObj)
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}

export function getTickets(userId){
    try {
        const result=TicketSchema.find({clientId:userId})
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}