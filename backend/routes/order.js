const express = require("express")
const router = express.Router()

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { updateStock } = require("../controllers/product")


const { } = require("../controllers/order")


module.exports = router