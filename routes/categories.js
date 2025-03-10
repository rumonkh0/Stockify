const express = require("express");
const {
  addCategory,
  deleteCategory,
  getAllCategories,
} = require("../controllers/categories");

const router = express.Router();

router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.get("/", getAllCategories);

module.exports = router;
