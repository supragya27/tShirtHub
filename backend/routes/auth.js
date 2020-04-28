var express = require('express')
var router = express.Router()

const signout = (req,res)=>{
    res.json({
        message:"user has signed out"
    })
}

router.get('/signout',signout);

module.exports=router;