
exports.signup=(req,res)=>{
   res.json({
       message: "signup route works"
   })
}

exports.signout = (req,res)=>{
    res.json({
        message:"user has signed out"
    })
}