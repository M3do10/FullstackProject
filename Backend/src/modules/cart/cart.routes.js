import express from "express"
import { verifyToke } from "../../middleware/verifyToken.js"
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "./cart.controller.js"

export const cartRoutes = express.Router()

cartRoutes.use(express.json())

// All cart routes require authentication
cartRoutes.get("/cart", verifyToke, getCart)
cartRoutes.post("/cart", verifyToke, addToCart)
cartRoutes.put("/cart", verifyToke, updateCartItem)
cartRoutes.delete("/cart/:productId", verifyToke, removeFromCart)
cartRoutes.delete("/cart", verifyToke, clearCart)
