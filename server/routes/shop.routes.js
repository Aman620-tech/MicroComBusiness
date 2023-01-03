const express = require("express");
const shopRoutes = express.Router();
const {
  allBusinessView,
  AdminBusinessView,
  BusinessStatusChange,
  BusinessRegister,
  OwnerBusinessView,
  BusinessUpdate,
  deleteBusiness,
} = require("../controller/business.controller");
// const {
//   registerShopEmployee,
//   singleEmployee,
//   removeUser,
//   allEmployee,
//   addEmployeeToShop,
// } = require("../../controller/business/employee/employee.controller");
const {
  allProduct,
  // addProductByEmployee,
  updateProduct,
  addProductByOwner,
} = require("../controller/product.controller");

const {  businessAuthenticate} = require("../middleware/jwt");
console.log("In shop Routes");

shopRoutes.post("/register", businessAuthenticate, BusinessRegister);
shopRoutes.get("/:businessId", businessAuthenticate, OwnerBusinessView);
shopRoutes.patch("/update/:businessId", businessAuthenticate, BusinessUpdate);
shopRoutes.delete("/shop/:businessId", businessAuthenticate, deleteBusiness);
// shopRoutes.post(
//   "/register-employee/:businessId",
//   businessAuthenticate,
//   registerShopEmployee
// );
// =======================Product ===================

shopRoutes.post("/add-product/:businessId", businessAuthenticate, addProductByOwner);



// shopRoutes.post(
//   "/product/:businessId",
//   businessAuthenticate,
//   addProductByOwner
// );
// shopRoutes.get("/:businessId", businessAuthenticate, allProduct);
// shopRoutes.patch("/product", businessAuthenticate, allProduct);

module.exports = shopRoutes;
