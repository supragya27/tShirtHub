const express = require("express")
const router = express.Router()

const { getProductById } = require("../controllers/product")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//params
router.param("userId", getUserById)
router.param("productId", getProductById)

//routes

module.exports = router