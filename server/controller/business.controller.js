const {
  businessCreate,
  businessUpdateData,
  // businessSingleView,
  userBusinessSingleView,
  businessDelete,
  businessSingleView,
  viewAll,
  AdminBusinessSingleView,
  CountDelivery,
  CountShop,
} = require("../model/business/business.function");
// const {BusinessUserDataUpdate} = require('../model/businessUser/businessUser.function')
const { UserUpdateData } = require("../model/user/user.function");
const { uploadFile, DeleteFile } = require("../services/file-upload");

console.log("In Business");

const allShopView = async (req, res, next) => {
  try {
    const businessType = "shop";
    const Shop = await viewAll(businessType);
    res.json({ status: 200, response: "all shops", shop: Shop });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const ShopCount = async (req, res, next) => {
  try {
    const businessType = "shop";
    const Shop = await CountShop(businessType);
    res.json({ status: 200, response: "all shops", shop: Shop });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const AdminBusinessView = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    if (!businessId) {
      return res.json({ status: 400, response: "Missing values" });
    }
    const shop = await AdminBusinessSingleView(businessId);
    res.json({ status: 200, response: "single shop", shop });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const BusinessStatusChange = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { active } = req.body;
    const data = { active };
    const shop = await businessUpdateData(businessId, data);
    res.json({ status: 200, response: "shop Status change ", shop });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const BusinessRegister = async (req, res, next) => {
  try {
    const {
      businessName,
      businessType,
      state,
      address,
      city,
      pin,
      mobileNumber,
      gstNo,
      panNo,
    } = req.body;
    // const Owner = await User.findById(req.user.id);
    if (!businessName || !businessType || !mobileNumber || !address || !city) {
      return res.json({ Status: 400, response: "Missing values" });
    }

    const data = {
      businessName,
      businessType,
      state,
      address,
      userId: req.user._id,
      city,
      pin,
      mobileNumber,
      gstNo,
      panNo,
    };

    const shopCreate = await businessCreate(data);
    if (req.files) {
      const shopLogo = req.files["shopLogo"];
      if (shopLogo) {
        // console.log(req.files);
        const extensions = [".png", ".jpg", ".jpeg"];
        const fileLink = await uploadFile(shopLogo, extensions);
        const data = {
          shopLogo: fileLink,
        };

        await businessUpdateData(shopCreate._id, data);
      }
    }
    // const userData = {
    //   businessId: shopCreate._id,
    // };
    // const user = await BusinessUserDataUpdate(req.user._id, userData);
    // console.log("Inside Shop USER", user);
    // const userUpdate = {
    //   businessId: shopCreate._id,
    // };

    // const user = await UserUpdateData(req.user._id, userUpdate);

    const shop = await businessSingleView(shopCreate._id);
    res.json({
      status: 200,
      response: "Shop Created successfully",
      business: shop,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const OwnerBusinessView = async (req, res, next) => {
  try {
    const business = await userBusinessSingleView(req.user._id);
    res.json({ status: 200, response: "single business", business });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const BusinessUpdate = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const {
      businessName,
      businessType,
      state,
      address,
      city,
      pin,
      mobileNumber,
      gstNo,
      panNo,
    } = req.body;
    const data = {
      businessName,
      businessType,
      state,
      address,
      city,
      pin,
      mobileNumber,
      gstNo,
      panNo,
    };

    const Business = await businessUpdateData(businessId, data);
    if (req.files) {
      const shopLogo = req.files["shopLogo"];
      await DeleteFile(Business.shopLogo);
      if (shopLogo) {
        const extensions = [".png", ".jpg", ".jpeg"];
        const fileLink = await uploadFile(shopLogo, extensions);
        const data = {
          shopLogo: fileLink,
        };
        await businessUpdateData(businessId, data);
      }
    }
    // const shop = await businessSingleView(businessId);
    res.json({
      status: 200,
      response: "Business updated successfully",
      Business,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const deleteBusiness = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const Business = await businessSingleView(businessId);
    console.log("Business", Business);
    if (Business.shopLogo) {
      await DeleteFile(Business.shopLogo);
    }
    await businessDelete(businessId);
    res.json({
      status: 200,
      response: "Business Deleted successfully",
      Business,
    });
  } catch (err) {
    res.json({ status: 200, response: err.message });
  }
};

const BusinessSingleView = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const business = await userBusinessSingleView(req.user._id);
    res.json({ status: 200, response: "single business", business });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
// =============Delivery Company ==================
const DeliveryCompanyCount = async (req, res, next) => {
  try {
    const businessType = "shop";
    const delivery = await CountDelivery(businessType);
    res.json({ status: 200, response: "all delivery", delivery });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const allDeliveryView = async (req, res, next) => {
  try {
    const businessType = "delivery";
    const delivery = await viewAll(businessType);
    res.json({ status: 200, response: "all delivery", delivery });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  allShopView,
  allDeliveryView,
  BusinessSingleView,
  AdminBusinessView,
  BusinessStatusChange,
  BusinessRegister,
  OwnerBusinessView,
  BusinessUpdate,
  deleteBusiness,
  ShopCount,
  DeliveryCompanyCount,
};
// ==========================================================================
