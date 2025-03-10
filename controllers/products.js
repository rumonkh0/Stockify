// src/controllers/productController.js
const Product = require("../models/Product");
const Category = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const generateProductCode = require("../utils/productCodeGenerator");

// @desc      Create a new product
// @route     POST /api/v1/products
exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, discount, image, status, categoryId } =
    req.body;

  // Validate category
  const category = await Category.findById(categoryId);
  if (!category) {
    return next(new ErrorResponse(`Invalid category`, 400));
  }

  // Generate product code
  const productCode = generateProductCode(name);

  // Create product
  const product = new Product({
    name,
    description,
    price,
    discount,
    image,
    status,
    productCode,
    category: categoryId,
  });

  await product.save();
  res
    .status(201)
    .json({ success: true, message: "Product added successfully", product });
});

// @desc      Get single product
// @route     GET /api/v1/products/:ID
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status, description, discount } = req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    { status, description, discount },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

// @desc      Get all products
// @route     GET /api/v1/products
exports.getProducts = asyncHandler(async (req, res, next) => {
  const { category, search } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };

  const products = await Product.find(filter).populate("category");

  const response = products.map((product) => ({
    ...product.toObject(),
    finalPrice: product.price * (1 - product.discount / 100),
  }));

  res
    .status(200)
    .json({ success: true, message: "Found all products", data: response });
});

// @desc      Get all products
// @route     DELETE /api/v1/products/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});
