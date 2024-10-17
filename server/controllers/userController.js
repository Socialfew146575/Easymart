const ErrorHandler = require("../utils/errorHandler");
const { asyncErrorHandler } = require("../middleware/asyncErrorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const receiveEmail = require("../utils/receiveEmail.js");
// Register

const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
 
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a dummy id",
      url: "dummyUrl",
    },
  });

  return sendToken(user, 201, res);
});

// Login

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

 

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  return sendToken(user, 200, res);
});

//Logout

const logoutUser = asyncErrorHandler(async (req, res, next) => {
 res.cookie("token", null, {
    expires: new Date(Date.now()), // Immediately expire the cookie
    httpOnly: true,                // Prevents JavaScript access to the cookie
    secure: true,                  // Ensures the cookie is sent over HTTPS only
    sameSite: "None",            // Prevents CSRF attacks by restricting cookie sending
});


  return res.status(200).json({ success: true, message: "Logged Out" });
});

// Forgot Password

const forgoutPassword = asyncErrorHandler(async (req, res, next) => {


  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get Reset password Token

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
 

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "x-forwarded-host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} . \n\n If you have not requested this then ,please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

   
    return next(new ErrorHandler(error.message));
  }
});

// Reset Password

const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const providedToken = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(providedToken)
    .digest("hex");



  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(
        "Password and confirm password do not match. Please make sure you enter the same password in both fields.",
        400
      )
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return sendToken(user, 200, res);
});

const getUserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);


  res.status(200).json({
    success: true,
    user,
  });
});

const updatePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Enter Correct Password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password does not match", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

const updateUserProfile = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

   sendToken(user, 200, res);
});

// Admin - getAllUsers

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find({ role: "user" });



  res.status(200).json({
    success: true,
    users,
  });
});

// Admin - get Single User

const getUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User does not exists", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Admin - updateRole

const updateUserRole = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User does not exists", 400));
  }

  user.role = req.body.role;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User does not exists", 400));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// User - to send Support Help Email

const sendSupportEmail = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, subject, email, message } = req.body;

  if (!subject || !email || !message) {
    return next(
      new ErrorHandler(
        "Please fill out all required fields: subject, email, and message.",
        400
      )
    );
  }

  try {
    await receiveEmail({ firstName, lastName, subject, email, message });

    return res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully. We will get back to you soon.",
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        "There was an issue sending your message. Please try again later.",
        500
      )
    );
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgoutPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser,
  sendSupportEmail,
};
