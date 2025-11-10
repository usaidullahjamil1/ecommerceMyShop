const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");

const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoute = require("./routes/auth");

const app = express();

// app.use(express.json());
// connect to local MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerceStoreDb")
  .then(() => console.log("✅ Connected to Mongo"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const port = 3000;
const cors = require("cors");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.use(cors());
app.use(express.json());
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);

app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log("server running on", 3000);
});
