const Product = require("../db/product");

async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model);
}

async function getProducts() {
  let products = await Product.find();
  return products.map((c) => c.toObject());
}

async function getProductById(id) {
  let product = await Product.findById(id);
  return product;
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

async function getNewProducts(id) {
  let newProducts = Product.find({
    isNewProduct: true,
  });
  return (await newProducts).map((x) => x.toObject());
}

async function getFeaturedProducts(id) {
  let featuredProducts = Product.find({
    isFeatured: true,
  });
  return (await featuredProducts).map((x) => x.toObject());
}

// async function getProductForListing(
//   searchTerm,
//   categoryId,
//   page,
//   pageSize,
//   sortBy,
//   sortOrder,
//   brandId
// ) {
//   let queryFilter = {};
//   if (!sortBy) {
//     sortBy = "price";
//   }
//   if (!sortOrder) {
//     sortOrder = -1;
//   }
//   if (searchTerm) {
//     // queryFilter.name = searchTerm;
//     queryFilter.$or = [
//       { name: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
//       {
//         shortDescription: {
//           $regex: ".*" + searchTerm + ".*",
//           $options: "i",
//         },
//       },
//     ];

//   }
//   if (categoryId) {
//     queryFilter.categoryId = categoryId;
//   }
//   if (brandId) {
//     queryFilter.brandId = brandId;
//   }
//   const products = Product.find(queryFilter)
//     .sort({
//       [sortBy]: +sortOrder,
//     })
//     .skip((page - 1) * pageSize)
//     .limit(pageSize);
//   return (await products).map((x) => x.toObject());
// }
async function getProductForListing(
  searchTerm,
  categoryId,
  page,
  pageSize,
  sortBy,
  sortOrder,
  brandId
) {
  const queryFilter = {};

  // normalize incoming values
  searchTerm = typeof searchTerm === "string" ? searchTerm.trim() : "";
  categoryId = typeof categoryId === "string" ? categoryId.trim() : "";
  brandId = typeof brandId === "string" ? brandId.trim() : "";
  sortBy = sortBy && sortBy.trim() !== "" ? sortBy : "price";
  sortOrder = parseInt(sortOrder) || -1;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  // build filter only for valid, non-empty values
  if (searchTerm) {
    queryFilter.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { shortDescription: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (categoryId) {
    queryFilter.categoryId = categoryId;
  }

  if (brandId) {
    queryFilter.brandId = brandId;
  }

  console.log("🧾 Final Product Filter:", queryFilter);

  const products = await Product.find(queryFilter)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return products.map((x) => x.toObject());
}


module.exports = {
  addProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};
