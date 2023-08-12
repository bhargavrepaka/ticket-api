import nodemailer from 'nodemailer'


let config = {
    service : 'gmail',
    auth : {
        user: "nomoreterminate@gmail.com",
        pass: "tzboportaniueonp"
    }
}

let transporter =nodemailer.createTransport(config)

export const sendTicketMail=async (messageFor,mailReceiver,mailText,sender)=>{
    let messageForReply = {
        from: 'nomoreterminate@gmail.com', // sender address
        to: mailReceiver, // list of receivers
        subject: "Received new reply on Ticket", // Subject line
        text: mailText, // plain text body
        html: `<h1>${mailText}</h1>`, // html body
      }

      let messageForTicketCreate = {
        from: 'nomoreterminate@gmail.com', // sender address
        to: mailReceiver, // list of receivers
        subject: `New ticket Created by ${sender}` , // Subject line
        text: mailText, // plain text body
        html:`<h1>${mailText}</h1>`, // html body
      }
      try {
        const result = await transporter.sendMail(messageFor==="reply"?messageForReply:messageForTicketCreate)
        return Promise.resolve(result)
      } catch (error) {
        console.log("error from mail helper",error)
        return Promise.reject(error)
      }
      


}
