const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter product name"] },
    description: {
      type: String,
      trim: true,
      minlength: [20, "description should be at least 20 characters"],
      required: [true, "Product description is needed"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product price should at least 0"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount need to at least 0"],
      max: [100, "Discount can be max 100"],
    },
    image: { type: String, required: false },
    status: {
      type: String,
      enum: {
        values: ["In Stock", "Stock Out"],
        message: "Status must be either 'In Stock' or 'Stock Out'",
      },
      default: "In Stock",
    },
    productCode: {
      type: String,
      unique: true,
      required: [true, "Product code have to be unique"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
