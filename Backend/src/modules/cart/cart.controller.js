import { cartModel } from "../../../db/models/cart.model.js";

// Get user's cart
async function getCart(req, res) {
    try {
        let cart = await cartModel.findOne({ user: req.decoded._id }).populate("items.product")
        if (!cart) return res.json({ message: "cart is empty", cart: { items: [] } })
        res.json({ message: "user cart", cart })
    } catch (err) {
        res.status(500).json({ message: "error fetching cart", err: err.message })
    }
}

// Add product to cart (or increase quantity if already exists)
async function addToCart(req, res) {
    try {
        let { productId, quantity } = req.body
        quantity = quantity || 1

        let cart = await cartModel.findOne({ user: req.decoded._id })

        if (!cart) {
            // Create new cart for user
            cart = await cartModel.create({
                user: req.decoded._id,
                items: [{ product: productId, quantity }]
            })
        } else {
            // Check if product already in cart
            let existingItem = cart.items.find(item => item.product.toString() === productId)
            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                cart.items.push({ product: productId, quantity })
            }
            await cart.save()
        }

        cart = await cart.populate("items.product")
        res.json({ message: "product added to cart", cart })
    } catch (err) {
        res.status(500).json({ message: "error adding to cart", err: err.message })
    }
}

// Update item quantity in cart
async function updateCartItem(req, res) {
    try {
        let { productId, quantity } = req.body
        let cart = await cartModel.findOne({ user: req.decoded._id })

        if (!cart) return res.status(404).json({ message: "cart not found" })

        let item = cart.items.find(item => item.product.toString() === productId)
        if (!item) return res.status(404).json({ message: "product not found in cart" })

        item.quantity = quantity
        await cart.save()

        cart = await cart.populate("items.product")
        res.json({ message: "cart updated successfully", cart })
    } catch (err) {
        res.status(500).json({ message: "error updating cart", err: err.message })
    }
}

// Remove product from cart
async function removeFromCart(req, res) {
    try {
        let cart = await cartModel.findOne({ user: req.decoded._id })

        if (!cart) return res.status(404).json({ message: "cart not found" })

        cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId)
        await cart.save()

        cart = await cart.populate("items.product")
        res.json({ message: "product removed from cart", cart })
    } catch (err) {
        res.status(500).json({ message: "error removing from cart", err: err.message })
    }
}

// Clear entire cart
async function clearCart(req, res) {
    try {
        let cart = await cartModel.findOneAndUpdate(
            { user: req.decoded._id },
            { items: [] },
            { new: true }
        )
        if (!cart) return res.status(404).json({ message: "cart not found" })
        res.json({ message: "cart cleared successfully", cart })
    } catch (err) {
        res.status(500).json({ message: "error clearing cart", err: err.message })
    }
}

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}
