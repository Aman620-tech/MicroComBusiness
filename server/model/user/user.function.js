const User = require("./user.model");

const ViewAllUser = async () => {
  const user = await User.find({ role: "customer" }).select([
    "-password",
    "-role",
    "-address",
  ]).sort({ createdAt: "-1" });

  return user;
};
const ViewAllBusinessUser = async () => {
  const user = await User.find({ role: "business" }).select(["-password"]).sort({ createdAt: "-1" });

  return user;
};
const userSingleView = async (userId) => {
  const user = await User.findById(userId).select([""]);
  return user;
};
const AllVerifiedUser = async () => {
  const user = await User.find({ verified: true, role: "customer" }).select([
    "-password",
  ]).sort({ createdAt: "-1" });

  return user;
};
const AllBusinessVerifiedUser = async () => {
  const user = await User.find({ verified: true, role: "business" }).select([
    "-password",
  ]);
  return user;
};
const AllUnVerifiedUser = async () => {
  const user = await User.find({ verified: true, role: "customer" }).select([
    "-password",
  ]);
  return user;
};
const AllBusinessUnVerifiedUser = async () => {
  const user = await User.find({ verified: false, role: "business" })
    .select(["-password"])
    .sort({ createdAt: "-1" });
  return user;
};
const adminSingleView = async (userId) => {
  const user = await User.findById(userId).select([
    "-password",
    "-role",
    "-address",
  ]);
  return user;
};
const findByEmail = async (email) => {
  const admin = await User.findOne({ email });
  return admin;
};
const UserCreate = async (userData) => {
  const user = await User.create(userData);
  return user;
};
const UserUpdateData = async (userId, data) => {
  await User.findByIdAndUpdate(userId, { $set: data }, { new: true });
  const user = await userSingleView(userId);
  return user;
};
const UserDelete = async (userId) => {
  await User.findByIdAndDelete(userId);
  const user = await userSingleView(userId);
  return user;
};

module.exports = {
  AllVerifiedUser,
  AllUnVerifiedUser,
  ViewAllUser,
  AllBusinessVerifiedUser,
  AllBusinessUnVerifiedUser,
  ViewAllBusinessUser,
  UserCreate,
  UserUpdateData,
  userSingleView,
  findByEmail,
  adminSingleView,
  UserDelete,
};
