const Category = require("../models/Category");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Create a new categories
// @route     POST /api/v1/categories
exports.addCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return next(new ErrorResponse(`Category already exists`, 400));
  }

  // Create a new category
  const category = new Category({ name });
  await category.save();

  res
    .status(201)
    .json({ success: true, message: "Category added successfully", category });
});

// @desc      Delete a category
// @route     DELETE /api/v1/categories/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if the category exists
  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Check if the category is associated with any products
  const productsWithCategory = await Product.find({ category: id });
  if (productsWithCategory.length > 0) {
    return next(
      new ErrorResponse(
        "Cannot delete category. It is associated with one or more products.",
        400
      )
    );
  }

  // Delete the category
  await Category.findByIdAndDelete(id);

  res
    .status(200)
    .json({ success: true, message: "Category deleted successfully" });
});

// @desc      Get all categories
// @route     GET /api/v1/categories
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    message: "Categories found successfully",
    categories,
  });
});
