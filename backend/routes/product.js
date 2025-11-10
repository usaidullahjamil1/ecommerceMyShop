const express = require("express");
const router = express.Router();

const { addProduct, getProducts, updateProduct, getProductById, deleteProduct } = require("../handlers/product-handler");
router.post("", async (req, res) => {
  console.log("testing products");
  let model = req.body;
  let result = await addProduct(model);
  res.send(result);
});

router.get("", async (req, res) => {
  let result = await getProducts();
  res.send(result);
});


router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getProductById(id);
  res.send(result);
});


router.put("/:id",async (req,res)=>{
    let model=req.body;
    let id=req.params["id"];
    await updateProduct(id,model);
    res.send({message:"okk"})
})


router.delete("/:id", async (req, res) => {
  // let model  = req.body;
  let id = req.params["id"];
  await deleteProduct(id);
  res.send({ message: "product deleted" });
});
module.exports = router;
