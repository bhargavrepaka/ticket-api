export default function errorHandler(error,res){
    console.log("message-",error.message)
    res.status= error.status || 500
    res.json({
        message:error.message
    })
}