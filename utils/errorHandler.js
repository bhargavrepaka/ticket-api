export default function errorHandler(error,res){
    console.log("message-",error.message)
    res.status(500).json({
        success:false,
        message:error.message
    })
}