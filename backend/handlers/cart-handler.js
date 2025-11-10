const Cart = require("../db/cart");

async function addToCart(userId, productId, quantityChange) {
  try {
    // Check if the product already exists in the user's cart
    let existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      // Calculate the new quantity
      const newQuantity = existingItem.quantity + quantityChange;

      if (newQuantity <= 0) {
        // If quantity becomes 0 or negative → remove the item
        await Cart.deleteOne({ _id: existingItem._id });
        console.log("Item removed from cart");
      } else {
        // Otherwise, update the quantity
        existingItem.quantity = newQuantity;
        await existingItem.save();
        console.log("Item quantity updated:", newQuantity);
      }
    } else {
      // If item doesn’t exist in the cart → add it as new
      const cart = new Cart({
        userId,
        productId,
        quantity: quantityChange > 0 ? quantityChange : 1, // ensure positive qty
      });
      await cart.save();
      console.log("New item added to cart");
    }
  } catch (error) {
    console.error("Error in addToCart:", error.message);
  }
}

// async function addToCart(userId, productId, quantity = 1) {
//   quantity = Number(quantity);
//   if (isNaN(quantity) || quantity <= 0) {
//     quantity = 1;
//   }

//   // 🧠 Try to increment existing cart item
//   const updatedItem = await Cart.findOneAndUpdate(
//     { userId, productId },
//     { $inc: { quantity: quantity } }, // ✅ increases existing quantity
//     { new: true } // returns updated document
//   );

//   // 🧠 If no item existed, create a new one
//   if (!updatedItem) {
//     const newCart = new Cart({ userId, productId, quantity });
//     await newCart.save();
//     return newCart;
//   }

//   return updatedItem;
// }

async function removeFromCart(userId, productId) {
  await Cart.findOneAndDelete({
    userId: userId,
    productId: productId,
  });

  // return cart.toObject();
}

// async function getCart(userId) {
//   const products = await Cart.find({ userId: userId }).populate("productId");
//   console.log("🛒 Raw cart:", products); // <--- check this output

//   return products.map((x) => x.toObject().productId);
// }

async function getCart(userId) {
  const products = await Cart.find({ userId }).populate("productId");
  console.log("🛒 Raw cart:", products);

  return products.map((x) => {
    return { quantity: x.quantity, product: x.productId };
  });
  //   return products.map((item) => {
  //     console.log("👉 Item:", item);
  //     return item.productId ? item.productId.toObject() : null;
  //   });
}
async function clearCart(userId) {
  await Cart.deleteMany({
    userId: userId,
  });
}

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
};
