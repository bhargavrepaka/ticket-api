import express from "express";

const router=express.Router()

router.get("/",(req,res,next)=>{
    res.send({message:"sent from task route"})
})

export default router