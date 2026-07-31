import express from "express"
import { verifyToke } from "../../middleware/verifyToken.js"
import { isAdmin } from "../../middleware/isAdmin.js"
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from "./product.controller.js"

export const productRoutes = express.Router()

productRoutes.use(express.json())

// Public routes
productRoutes.get("/products", getAllProducts)
productRoutes.get("/products/:id", getProduct)

// Admin only routes (require auth + admin role)
productRoutes.post("/products", verifyToke, isAdmin, createProduct)
productRoutes.put("/products/:id", verifyToke, isAdmin, updateProduct)
productRoutes.delete("/products/:id", verifyToke, isAdmin, deleteProduct)
