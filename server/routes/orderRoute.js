const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { isAuthorized } = require("../middleware/auth");

const router = express.Router();

router.post("/order/new", isAuthenticatedUser, newOrder);
router.get(
  "/order/:id",
  isAuthenticatedUser,
  getSingleOrder
);

router.get("/orders/me", isAuthenticatedUser, myOrders);
router
  .get(
    "/admin/orders",
    isAuthenticatedUser,
    isAuthorized("admin"),
    getAllOrders
  )
  
router.route("/admin/order/:id").get(getOrder).put(updateOrder).delete(deleteOrder)

module.exports = router;
