const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const { asyncErrorHandler } = require("../middleware/asyncErrorHandler");
const ApiFeatures = require("../utils/features");

// Create Product -- Admin
const createProduct = asyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get All Product
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 10;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const filteredProductsCount = await apiFeatures.getFilteredProductsCount();

  apiFeatures.pagination(resultPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});


// Update Product - Admin
const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;
  const updatedReviews = req.body.reviews;

  if (!productId) {
    return next(new ErrorHandler("Product ID is required", 400));
  }

  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Update product fields except reviews
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.images = req.body.images || product.images;
  product.category = req.body.category || product.category;
  product.stock = req.body.stock || product.stock;

  // Update reviews
  if (updatedReviews) {
    product.reviews = updatedReviews; // Replace entire reviews array with the updated data
  }

  try {
    // Save the updated product document
    await product.save({ validateBeforeSave: false });

    // Respond with success
    res.status(200).json({ success: true, product });
  } catch (err) {
    // Handle validation errors
    if (err.name === "ValidationError") {
      return next(new ErrorHandler(err.message, 500)); // or handle specific validation errors
    }
    // Handle other errors
    return next(new ErrorHandler("Error updating product", 500));
  }
});

// Delete Product -- Admin
const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;
  if (!productId) {
    return next(new ErrorHandler("Product ID is required", 400));
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// Get Single Product Detail
const getSingleProduct = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;
  if (!productId) {
    return next(new ErrorHandler("Product ID is required", 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

// Create new Review or Update the review

const createProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const haveReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (haveReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews += 1;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  return res.status(200).json({
    success: true,
  });
});

const getProductReviews = asyncErrorHandler(async (req, res, next) => {
  // Find the product by id and populate the 'user' field in the reviews
  const product = await Product.findById(req.query.id).populate({
    path: "reviews.user", // Populate the 'user' field inside 'reviews'
    select: "name email", // Only populate the necessary fields (optional)
  });

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


const deleteReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  const reviewExist = product.reviews.forEach((rev) => {
    if (rev._id.toString() === req.query.reviewId.toString()) return true;
  });

  if (!reviewExist) {
    return next(new ErrorHandler("Review does not exists", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / product.reviews.length;

  const numberOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
