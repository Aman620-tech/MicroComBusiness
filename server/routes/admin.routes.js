const express = require("express");
const adminRoutes = express.Router();
// ===================== user ====
const {
  userRegister,
  userLogin,
  userDataUpdate,
  DeleteUser,
  UserSingleView,
  adminRegister,
  UserPasswordReset,
  UserForgetPassword,
  passwordChange,
  AdminSingleView,
  allUser,
  AdminStatusChange,
  allBusinessUser,
} = require("../controller/user.controller");
// ============ Business =============
const {
  allShopView,
  allDeliveryView,
  AdminBusinessView,
  BusinessStatusChange,
  ShopCount,
  DeliveryCompanyCount,
  deleteBusiness,
} = require("../controller/business.controller");
// =================category ==========
const {
  addCategory,
  viewAllCategory,
  viewCategoryById,
  updateCategory,
  CategoryStatusChange,
  deleteCategory,
} = require("../controller/category.controller");
// ================= subCategory =====================
const {
  allSubCategoryView,
  singleSubCategoryView,
  addSubCategory,
  updateSubCategory,
  subCategoryStatusChange,
  deleteSubCategory,
  allCategorySubCategoryView,
} = require("../controller/subCategory.controller");

// =========== Business Owner======================
// const {  AdminAllOwnerView,
//   AdminBusinessStatusChange,
//   AdminBusinessUserSingleView,
//   AdminOwnerCount,
// }=require('../controller/businessOwner.controller');

// ====== Developer =====================
const {
  createDeveloper,
  SingleDeveloperView,
  allDeveloperView,
  updateDeveloper,
  deleteDeveloperView,
} = require("../controller/developer.controller");

// ========= feedback ========================
const {
  AdminFeedbackView,
  AdminFeedbackCount,
  SingleFeedbackViewByAdmin,
  // FeedbackCount,
  AdminFeedbackViewUpdate,
} = require("../controller/feedback.controller");
// ======== Verification

const {
  AllVerificationFile,
  VerificationViewByOwner,
  StatusChangeVerification,
} = require("../controller/verification.controller");

const { adminAuthenticate } = require("../middleware/jwt");
console.log("In Admin Routes");

// ==========admin-user
adminRoutes.patch("/update-user", adminAuthenticate, userDataUpdate);
// adminRoutes.post("/register",adminRegister);
adminRoutes.get("/user", adminAuthenticate, UserSingleView);
adminRoutes.patch("/password-change", adminAuthenticate, passwordChange);
// adminRoutes.patch("/delete-change/:userId", adminAuthenticate, DeleteUser);
adminRoutes.delete("/delete-user/:userId", adminAuthenticate, DeleteUser);
adminRoutes.patch(
  "/status-Change/:userId",
  adminAuthenticate,
  AdminStatusChange
);

// ======== Category Add ====================
adminRoutes.post("/category-create", adminAuthenticate, addCategory);
adminRoutes.get("/all-category", adminAuthenticate, viewAllCategory);
adminRoutes.get("/category/:categoryId", adminAuthenticate, viewCategoryById);
adminRoutes.patch(
  "/update-category/:categoryId",
  adminAuthenticate,
  updateCategory
);
adminRoutes.patch(
  "/category-status/:categoryId",
  adminAuthenticate,
  CategoryStatusChange
);
adminRoutes.delete(
  "/delete-category/:categoryId",
  adminAuthenticate,
  deleteCategory
);

// =============Sub Category ===============
adminRoutes.post("/sub-category-create", adminAuthenticate, addSubCategory);
adminRoutes.get("/all-sub-category", adminAuthenticate, allSubCategoryView);
adminRoutes.get(
  "/all-sub-category/:categoryId",
  adminAuthenticate,
  allCategorySubCategoryView
);
adminRoutes.get(
  "/sub-category/:subCategoryId",
  adminAuthenticate,
  singleSubCategoryView
);
adminRoutes.patch(
  "/sub-category-status-change/:subCategoryId",
  adminAuthenticate,
  subCategoryStatusChange
);
adminRoutes.patch(
  "/update-sub-category/:subCategoryId",
  adminAuthenticate,
  updateSubCategory
);
adminRoutes.delete(
  "/delete-sub-category/:subCategoryId",
  adminAuthenticate,
  deleteSubCategory
);

// ======= shop ===========
adminRoutes.get("/all-shop", adminAuthenticate, allShopView);
adminRoutes.get("/shop/:businessId", adminAuthenticate, AdminBusinessView);
adminRoutes.get("/shop-count", adminAuthenticate, ShopCount);
adminRoutes.patch(
  "/shop-status/:businessId",
  adminAuthenticate,
  BusinessStatusChange
);
adminRoutes.delete(
  "/delete-shop/:businessId",
  adminAuthenticate,
  deleteBusiness
);

// ====== delivery =================
adminRoutes.get("/all-delivery", adminAuthenticate, allDeliveryView);
adminRoutes.get("/delivery/:businessId", adminAuthenticate, AdminBusinessView);
adminRoutes.get("/delivery-count", adminAuthenticate, DeliveryCompanyCount);
adminRoutes.patch(
  "/delivery-status/:businessId",
  adminAuthenticate,
  BusinessStatusChange
);

// =============User==========
adminRoutes.get("/all-user", adminAuthenticate, allUser);
adminRoutes.get("/all-business-user", adminAuthenticate, allBusinessUser);
adminRoutes.get("/single-user/:userId", adminAuthenticate, AdminSingleView);
// adminRoutes.patch("/user-status/:userId", adminAuthenticate, statusChange);

// adminRoutes.get("/user", adminAuthenticate, allUser);
// ==========Shop=Owner=================
// adminRoutes.get("/all-owner", adminAuthenticate, AdminAllOwnerView);
// adminRoutes.get("/owner/:businessUserId", adminAuthenticate, AdminBusinessUserSingleView);
// adminRoutes.patch("/owner-status/:businessUserId",adminAuthenticate,AdminBusinessStatusChange);
// adminRoutes.get("/owner-count",adminAuthenticate,AdminOwnerCount);

// ================  feedbback===================
adminRoutes.get("/all-feedback", adminAuthenticate, AdminFeedbackView);
adminRoutes.get(
  "/feedback/:feedbackId",
  adminAuthenticate,
  SingleFeedbackViewByAdmin
);
adminRoutes.patch(
  "/feedback-status/:feedbackId",
  adminAuthenticate,
  AdminFeedbackViewUpdate
);
adminRoutes.get("/feedback-count", adminAuthenticate, AdminFeedbackCount);

// ================ Developer ==================
adminRoutes.post("/developer", adminAuthenticate, createDeveloper);
adminRoutes.get("/all-developer", adminAuthenticate, SingleFeedbackViewByAdmin);
adminRoutes.patch(
  "/update-developer/:developerId",
  adminAuthenticate,
  updateDeveloper
);
adminRoutes.delete(
  "/delete-developer/:developerId",
  adminAuthenticate,
  deleteDeveloperView
);

// ================ Verification ==================

adminRoutes.get(
  "/all-business-verification-file",
  adminAuthenticate,
  AllVerificationFile
);
adminRoutes.get(
  "/all-business-verification-file/:businessId",
  adminAuthenticate,
  VerificationViewByOwner
);
adminRoutes.get(
  "/verification-Status-change/:verificationId",
  adminAuthenticate,
  StatusChangeVerification
);

module.exports = adminRoutes;
