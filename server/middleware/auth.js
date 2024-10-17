const ErrorHandler = require("../utils/errorHandler");
const { asyncErrorHandler } = require("./asyncErrorHandler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Middleware
const isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {


  const  token  = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);
  next();
});

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not authorized to access this resource`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { isAuthenticatedUser, isAuthorized };
