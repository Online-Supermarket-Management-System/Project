const productModel = require('./ProductModel');
const CartItem = require('../Cart/CartModel');

const globalCart = [];

exports.createProduct = async (req, res) => {
  try {
    const { name, category, url, price, description,  brand, quantity, productId} = req.body;

    // Check if all required fields are provided
    if (!name || !category || !url || !price || !description || !brand || !quantity || !productId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new productModel({ name, category, url, price, description, brand, quantity, productId });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { name, category, url, price, description } = req.body;

    // Check if all required fields are provided
    if (!name || !category || !url || !price || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, { name, category, url, price, description }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// // Controller to handle adding a product to the cart
// exports.addToCart = async (req, res) => {
//   try {
//     const id = req.params.id;
//     // Retrieve product from database
//     const product = await productModel.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     // Add product to the user's cart (You may want to implement user authentication and manage cart for each user)
//     // For simplicity, I'll assume a global cart here
//     globalCart.push(product);
//     res.status(200).json({ message: "Product added to cart" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const quantity = req.body.quantity || 1;

    // Retrieve product from database
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new cart item with product details
    const cartItem = new CartItem({ 
      product: {
        _id: product._id,
        name: product.name,
        price: product.price
      }, 
      quantity: quantity 
    }); // Assuming default quantity is 1

    // Save the cart item to the database
    await cartItem.save();

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to get all items in the cart
// exports.getCartItems = (req, res) => {
//   try {
//     // Return all items in the global cart
//     res.status(200).json(globalCart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.getCartItems = async (req, res) => {
  try {
    // Retrieve all items from the cart along with their quantities, prices, and names
    const cartItems = await CartItem.find({})
      .populate({
        path: 'product',
        select: 'name price'
      })
      .select('product quantity');

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Remove Item from Cart Endpoint
exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Remove product from cart
    req.session.cart = req.session.cart.filter(item => item.product !== productId);

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct };
