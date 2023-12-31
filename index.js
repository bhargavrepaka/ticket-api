
import cors from "cors"
import express from "express"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes.js"
import ticketRoutes from "./routes/ticketRoutes.js"
import tokensRoute from "./routes/tokensRoute.js"
import errorHandler from "./utils/errorHandler.js"
import mongoose from "mongoose"
import { config } from "dotenv"


const app = express()
const port = process.env.PORT || 3000

//Middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
config({
    path:"./config.env"
})

//Connect To MongoDB
mongoose.connect(process.env.MONGO_URL,{dbName:"ticket-system"}).then((s)=>console.log("Connected to database")).catch((err)=>console.log(err)) 
//App Routes
app.use("/v1/user",userRoutes)
app.use("/v1/tickets",ticketRoutes)
app.use("/v1/tokens",tokensRoute)

app.get("*",(req,res,next)=>{
    const error=new Error("Page Not Found")
    error.status=404
    next(error)
})
//Error handler
app.use((error,req,res,next)=>{
    errorHandler(error,res)
})


app.listen(port, () => console.log(`server running on  ${port}!`))