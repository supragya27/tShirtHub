var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const {signout,signup,signin} =require('../controllers/auth')

router.post('/signup',[
    check('name').isLength({min:3}).withMessage('Name should be atleast 3 letters.'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({min:3}).withMessage('Password should be atleast 3 characters long.')
],signup);

router.post('/signin',[
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({min:1}).withMessage('Password field is compulsory.')
],signin);

router.get('/signout',signout);

module.exports=router;