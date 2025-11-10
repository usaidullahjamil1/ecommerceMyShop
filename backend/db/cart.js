// const mongoose = require("mongoose");
// const cartSchema = new mongoose.Schema({
//   userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
//   //   productId: Array(String),
//   productId: {
//     // ✅ singular, not productsId
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "products", // ✅ must match your Product model name
//     required: true,
//   },
//   quantity: Number,
// });
// const Cart = mongoose.model("carts", cartSchema);
// module.exports = Cart;

const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//     required: true,
//   },
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "products",
//     required: true,
//   }, // ✅ must match model name above
//   quantity: { type: Number, default: 1 },
// });

// const Cart = mongoose.model("carts", cartSchema);
// module.exports = Cart;

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Cart", cartSchema);
