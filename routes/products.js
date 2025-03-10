// src/routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct
} = require("../controllers/products");

const router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);

module.exports = router;
