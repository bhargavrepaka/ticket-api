import helmet from "helmet"
import cors from "cors"
import express from "express"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import errorHandler from "./utils/errorHandler.js"
import mongoose, { mongo } from "mongoose"
import { config } from "dotenv"


const app = express()
const port = process.env.PORT || 3000

//Middleware
app.use(cors())
app.use(helmet())
app.use(morgan("tiny"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
config({
    path:"./config.env"
})

//Connect To MongoDB
mongoose.connect(process.env.MONGO_URL,{dbName:"ticket-system"}).then((s)=>console.log("Connected to database")).catch((err)=>console.log(err)) 
//App Routes
app.use("/v1/users",userRoutes)
app.use("/v1/tasks",taskRoutes)

app.get("*",(req,res,next)=>{
    const error=new Error("Page Not Found")
    error.status=404
    next(error)
})
//Error handler
app.use((error,req,res,next)=>{
    errorHandler(error,res)
})

app.get('/', (req, res) => res.send('zehahah!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))