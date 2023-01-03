const Business = require("./business.model");

const viewAll = async (businessType) => {
  const business = await Business.find({ businessType }).populate(
    "userId",
    "name email active"
  );
  return business;
};
const CountShop = async () => {
  const business = await Business.countDocuments({ businessType: "shop" });
  return business;
};
const CountDelivery = async () => {
  const business = await Business.countDocuments({ businessType: "delivery" });
  return business;
};

// const businessSingleView = async (businessId,userId) => {
//   const business = await Business.findOne(businessId).populate('userId')
//   return business;
// };
const AdminBusinessSingleView = async (businessId) => {
  const business = await Business.findById(businessId).populate(
    "userId",
    "firstName lastName"
  );
  // .select(["userId.password"]);
  return business;
};
const userBusinessSingleView = async (userId) => {
  const business = await Business.findOne({ userId }).populate("userId");
  return business;
};

const findByEmail = async (email) => {
  const business = await Business.findOne({ email });
  return business;
};
const businessCreate = async (businessData) => {
  const business = await Business.create(businessData);
  return business;
};

const businessUpdateData = async (businessId, data) => {
  await Business.findByIdAndUpdate({ _id: businessId }, { $set: data });
  const business = await businessSingleView(businessId);
  return business;
};

const businessDelete = async (businessId) => {
  const business = await Business.findByIdAndDelete(businessId);
  return business;
};
const businessSingleView = async (businessId) => {
  const business = await Business.findById(businessId);
  return business;
};

module.exports = {
  viewAll,
  businessCreate,
  businessUpdateData,
  businessSingleView,
  findByEmail,
  userBusinessSingleView,
  CountDelivery,
  CountShop,
  businessDelete,
  AdminBusinessSingleView,

  // removeEmployee,
};
