const express = require("express");
const { registerUser, loginUser, logoutUser, forgoutPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsers, getUser, deleteUser, updateUserRole, sendSupportEmail } = require("../controllers/userController");
const { isAuthenticatedUser, isAuthorized } = require("../middleware/auth");

const router = express.Router()



router.post('/register',registerUser).post('/login',loginUser).get('/logout',logoutUser)
router.post('/password/forgot',forgoutPassword)

router.put("/password/reset/:token",resetPassword)
router.get('/me',isAuthenticatedUser,getUserDetails)
router.put('/password/update',isAuthenticatedUser,updatePassword)
router.put('/me/update',isAuthenticatedUser,updateUserProfile)

router.get('/admin/users',isAuthenticatedUser,isAuthorized('admin'),getAllUsers)
router.get('/admin/user/:id',isAuthenticatedUser,isAuthorized('admin'),getUser)
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  isAuthorized("admin"),
  updateUserRole
);
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  isAuthorized("admin"),
  deleteUser
);

router.post("/support",sendSupportEmail)

module.exports = router
