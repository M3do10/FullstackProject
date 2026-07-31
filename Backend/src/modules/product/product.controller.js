import { productModel } from "../../../db/models/product.model.js";

// Create a product (admin)
async function createProduct(req, res) {
    try {
        let product = await productModel.create(req.body)
        res.status(201).json({ message: "product created successfully", product })
    } catch (err) {
        res.status(500).json({ message: "error creating product", err: err.message })
    }
}

// Get all products
async function getAllProducts(req, res) {
    try {
        let products = await productModel.find()
        res.json({ message: "all products", products })
    } catch (err) {
        res.status(500).json({ message: "error fetching products", err: err.message })
    }
}

// Get single product by id
async function getProduct(req, res) {
    try {
        let product = await productModel.findById(req.params.id)
        if (!product) return res.status(404).json({ message: "product not found" })
        res.json({ message: "product found", product })
    } catch (err) {
        res.status(500).json({ message: "error fetching product", err: err.message })
    }
}

// Update product (admin)
async function updateProduct(req, res) {
    try {
        let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) return res.status(404).json({ message: "product not found" })
        res.json({ message: "product updated successfully", product })
    } catch (err) {
        res.status(500).json({ message: "error updating product", err: err.message })
    }
}

// Delete product (admin)
async function deleteProduct(req, res) {
    try {
        let product = await productModel.findByIdAndDelete(req.params.id)
        if (!product) return res.status(404).json({ message: "product not found" })
        res.json({ message: "product deleted successfully", product })
    } catch (err) {
        res.status(500).json({ message: "error deleting product", err: err.message })
    }
}

export {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
