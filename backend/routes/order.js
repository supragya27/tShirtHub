const express = require("express")
const router = express.Router()

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { updateStock } = require("../controllers/product")


const { getOrderById } = require("../controllers/order")

//params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

//actual routes


module.exports = router