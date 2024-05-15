const express = require("express");
const router = express.Router();
const productController = require("./ProductController");

router.post("/uploadProduct", productController.createProduct);
router.get("/product", productController.getAllProducts);
// Update a product by ID
router.put("/product/:id", productController.updateProduct);
router.get("/product/:id", productController.getProductById);

// Delete a product by ID
router.delete("/product/:id", productController.deleteProduct);


// Route to add a product to the cart
router.post("/products/:id/add-to-cart", productController.addToCart);

// Route to get all items in the cart
router.get("/cart", productController.getCartItems);

// Route for removing a product from the cart
router.delete('/cart/:productId', productController.removeFromCart);




module.exports = router;
