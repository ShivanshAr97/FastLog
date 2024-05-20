function errorHandler (err,req,res,next){
    const statusCode=res.statusCode?res.statusCode:500
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.NODE_ENV==='developement'?null:err.stack
    })
    return
}

export {errorHandler}