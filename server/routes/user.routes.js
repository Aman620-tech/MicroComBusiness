const express = require("express");
const userRoutes = express.Router();
const {
  userRegister,
  userLogin,
  userDataUpdate,
  DeleteUser,
  UserSingleView,
  UserPasswordReset,
  UserForgetPassword,
  passwordChange,
  adminRegister,
  userStatusChange,
} = require("../controller/user.controller");

// ======== Product ===============
const {
  allProduct,
  SingleProduct,
  categoryProduct,
} = require("../controller/product.controller");

// ====== Category =============
const { viewAllCategory } = require("../controller/category.controller");

// ========= Sub- Category ===============

const {
  allSubCategoryView,
  allCategorySubCategoryView,
} = require("../controller/subCategory.controller");

//============ Feed back ================
const {
  userFeedback,
  AllFeedbackView,
} = require("../controller/feedback.controller");

// ==== developer ==========
const { allDeveloperView } = require("../controller/developer.controller");
// ============= Cart ==================

const {
  // CreateKart,
  AddToCart,
  UserCart,
  removeFromCart,
} = require("../controller/cart.controller");

// ==============  Verification USer=============
const {
  VerifyOtp,
  otpRequest,
} = require("../controller/userVerification.controller");

// =============== Payment ==============

const {
  createPayment,
  paymentCheck,
  userPaymentCheck,
} = require("../controller/payment.controller");

// ======== Otp / Verification

const { customerAuthenticate } = require("../middleware/jwt");
console.log("In User Routes");

userRoutes.post("/register", userRegister);
// userRoutes.post("/admin-register", adminRegister);
userRoutes.post("/login", userLogin);
userRoutes.post("/forget-password", UserForgetPassword);
userRoutes.post("/reset-password/:userId/:token", UserPasswordReset);
userRoutes.patch("/password-change", customerAuthenticate, passwordChange);
userRoutes.patch("/delete-user", customerAuthenticate, userStatusChange);
userRoutes.patch("/update-user", customerAuthenticate, userDataUpdate);
userRoutes.get("/user", customerAuthenticate, UserSingleView);
userRoutes.get("/user/:userId", customerAuthenticate, UserSingleView);
// userRoutes.delete("/delete-user", customerAuthenticate, DeleteUser);

// ===============Category===================

userRoutes.get("/all-category", viewAllCategory);

// ======

userRoutes.get("/all-sub-category", allSubCategoryView);
userRoutes.get("/all-sub-category/:categoryId", allCategorySubCategoryView);

// ========== feedback ===========
userRoutes.post("/create-feedback", customerAuthenticate, userFeedback);
userRoutes.get("/feedback", AllFeedbackView);

// ====== developer =============
userRoutes.get("/all-developer", allDeveloperView);
// userRoutes.get("/all-developer", allDeveloperView);

// ====== Product =============
userRoutes.get("/all-product", allProduct);
userRoutes.get("/product/:productId", customerAuthenticate, SingleProduct);
userRoutes.get(
  "/category-product/:categoryId",
  customerAuthenticate,
  categoryProduct
);

// =-===== Cart =============

// userRoutes.post("/cart", customerAuthenticate, CreateKart);
userRoutes.post("/add-product-to-cart", customerAuthenticate, AddToCart);
userRoutes.get("/cart-check", customerAuthenticate, UserCart);
userRoutes.patch(
  "/remove-product-from-cart",
  customerAuthenticate,
  removeFromCart
);

// ============ PAYMENT =============
userRoutes.post("/payment-create", customerAuthenticate, createPayment);
userRoutes.get("/payment/:paymentId", customerAuthenticate, paymentCheck);
userRoutes.get("/payments", customerAuthenticate, userPaymentCheck);

// ================= otp Sector =============
userRoutes.post("/otp-sending", customerAuthenticate, otpRequest);
userRoutes.post("/otp-confirm", customerAuthenticate, VerifyOtp);

module.exports = userRoutes;
