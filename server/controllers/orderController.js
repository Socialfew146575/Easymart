const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const { asyncErrorHandler } = require("../middleware/asyncErrorHandler");

//Create New Order
const newOrder = asyncErrorHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;




  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  return res.status(201).json({
    success: true,
    order,
  });
});

//Get Single Order

const getSingleOrder = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  const order = await Order.findById({ _id : id, user: req.user.id });

  if (!order) {
    return next(
      new ErrorHandler(`Order with order_id ${id} does not exists`, 400)
    );
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

// Get User orders

const myOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  return res.status(200).json({
    success: true,
    orders,
  });
});

// get All Orders - Admin

const getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name email");

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});
//Get Single Order -- Admin

const getOrder = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;

  const order = await Order.findById({ id });

  if (!order) {
    return next(
      new ErrorHandler(`Order with order_id ${id} does not exists`, 400)
    );
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

// Update  Order Status - Admin

const updateOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("No such order exists", 400));
    }

  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("Order has already been delivered", 400));
  }

  order.orderItems.forEach(async (odr) => {
    await updateStock(odr.product, odr.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false,
  });

  return res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({
    validateBeforeSave: false,
  });
}

//Delete Order - Admin
const deleteOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No such order exists", 400));
  }

  return res.status(200).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrder,
  getAllOrders,
  deleteOrder,
  getOrder
};
