const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { isAuthorized } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  isAuthorized("admin"),
  createProduct
);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, isAuthorized("admin"), updateProduct)
  .delete(isAuthenticatedUser, isAuthorized("admin"), deleteProduct);

router.get("/product/:id", getSingleProduct);

router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReview)

module.exports = router;
