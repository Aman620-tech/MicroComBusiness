const express = require("express");
const businessRoutes = express.Router();
const {
  BusinessRegister,
  OwnerBusinessView,
  BusinessUpdate,
  deleteBusiness,
  BusinessSingleView,
} = require("../controller/business.controller");
const {
  userDataUpdate,
  DeleteUser,
  UserSingleView,
  passwordChange,
  userStatusChange,
} = require("../controller/user.controller");
const { businessFeedback } = require("../controller/feedback.controller");

// const {
//   registerShopEmployee,
//   singleEmployee,
//   removeUser,
//   allEmployee,
//   addEmployeeToShop,
// } = require("../../controller/business/employee/employee.controller");
const {
  businessAllProduct,
  updateProduct,
  SingleProduct,
  deleteProduct,
  addProductByOwner,
} = require("../controller/product.controller");

const {
  createVerification,
  VerificationViewByOwner,
} = require("../controller/verification.controller");

// ==============  Verification USer=============
const {
  VerifyOtp,
  otpRequest,
} = require("../controller/userVerification.controller");

const {
  businessPaymentCheck,
  SinglePaymentCheck,
} = require("../controller/payment.controller");

const { businessAuthenticate } = require("../middleware/jwt");
console.log("In shop Routes");

businessRoutes.patch("/password-change", businessAuthenticate, passwordChange);
businessRoutes.patch("/update-user", businessAuthenticate, userDataUpdate);
// businessRoutes.patch("/status-change", businessAuthenticate, userStatusChange);
businessRoutes.get("/user", businessAuthenticate, UserSingleView);
businessRoutes.delete("/delete-user", businessAuthenticate, userStatusChange);

businessRoutes.post("/register", businessAuthenticate, BusinessRegister);
businessRoutes.get("/", businessAuthenticate, OwnerBusinessView);
businessRoutes.get("/:businessId", businessAuthenticate, BusinessSingleView);
// businessRoutes.get("/", businessAuthenticate, UserBusinessView);
businessRoutes.patch(
  "/update/:businessId",
  businessAuthenticate,
  BusinessUpdate
);
businessRoutes.delete("/:businessId", businessAuthenticate, deleteBusiness);
// businessRoutes.post("/register-employee/:businessId",shopOwnerAuthenticate, registerShopEmployee );
// =======================Product ===================

businessRoutes.post(
  "/add-product/:businessId",
  businessAuthenticate,
  addProductByOwner
);
businessRoutes.get(
  "/all-product/:businessId",
  businessAuthenticate,
  businessAllProduct
);
businessRoutes.get("/product/:productId", businessAuthenticate, SingleProduct);
businessRoutes.delete(
  "/delete-product/:businessId/:productId",
  businessAuthenticate,
  deleteProduct
);
businessRoutes.patch(
  "/update-product/:productId",
  businessAuthenticate,
  updateProduct
);

// businessRoutes.post("/product/:businessId",shopOwnerAuthenticate,addProductByOwner );
// businessRoutes.get("/:businessId", shopOwnerAuthenticate, allProduct);
// businessRoutes.patch("/product", shopOwnerAuthenticate, allProduct);

// ======   Payments ================
// businessPaymentCheck,SinglePaymentCheck
businessRoutes.get(
  "/all-payments/:businessId",
  businessAuthenticate,
  businessPaymentCheck
);
businessRoutes.get(
  "/single-payment/:paymentId",
  businessAuthenticate,
  SinglePaymentCheck
);

// ==================== Feedback=============
businessRoutes.post("/create-feedback", businessAuthenticate, businessFeedback);

// ==================== Verification ============
businessRoutes.post(
  "/create-verification/:businessId",
  businessAuthenticate,
  createVerification
);
businessRoutes.get(
  "/view-verification/:businessId",
  businessAuthenticate,
  VerificationViewByOwner
);
businessRoutes.post("/otp-sending", businessAuthenticate, otpRequest);
businessRoutes.post("/otp-confirm", businessAuthenticate, VerifyOtp);

module.exports = businessRoutes;
