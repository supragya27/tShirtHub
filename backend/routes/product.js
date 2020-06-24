const express = require("express")
const router = express.Router()

const { getProductById, updateProduct, deleteProduct, createProduct, getProduct, photo } = require("../controllers/product")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//params
router.param("userId", getUserById)
router.param("productId", getProductById)

//routes
//create route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

//read routes
router.get("product/:productId", getProduct)
router.get("product/photo/:productId", photo)

//delete route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)
//update route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

//listing route
module.exports = router