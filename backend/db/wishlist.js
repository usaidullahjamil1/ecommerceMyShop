const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  //   productId: Array(String),
  productId: {
    // ✅ singular, not productsId
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", // ✅ must match your Product model name
    required: true,
  },
});
const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;
