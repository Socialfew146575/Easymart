const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production to ensure the cookie is only sent over HTTPS
    sameSite: "None", // Allow cross-site requests
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
