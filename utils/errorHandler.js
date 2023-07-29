export default function errorHandler(error,res){
    console.log("Error Message -",error.message)
    res.status(500).json({
        success:false,
        message:error.message
    })
}