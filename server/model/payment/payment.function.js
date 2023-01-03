const Payment = require("./payment.model");

const paymentCreate = async (paymentData) => {
  const payment = await Payment.create(paymentData);
  return payment;
};
const paymentSingleView = async (paymentId) => {
  const payment = await Payment.findById(paymentId).populate([
    { path: "userId", select: ["firstName", "lastName"] },
    {
      path: "productId", // model: "products"
    },
  ]);
  return payment;
};
const paymentUpdate = async (paymentId, paymentData) => {
  const payment = await Payment.findByIdAndUpdate(paymentId, {
    $set: { paymentData },
  });
  return payment;
};
const paymentUpdateData = async (paymentId, data) => {
  await Payment.findByIdAndUpdate(paymentId, data);
  const payment = await paymentSingleView(paymentId);
  return payment;
};
const userAllPayment = async (userId) => {
  const payment = await Payment.find({ userId }).populate([
    { path: "userId", select: ["firstName", "lastName"] },
    {
      path: "productId", // model: "products"
    },
  ]);
  return payment;
};
const businessAllPayment = async (businessId) => {
  const payment = await Payment.find({ businessId }).populate("productId");
  return payment;
};
const paymentDelete = async (paymentId) => {
  const payment = await Payment.findByIdAndDelete(paymentId);
  return payment;
};
module.exports = {
  paymentCreate,
  paymentSingleView,
  paymentUpdateData,
  paymentUpdate,
  userAllPayment,
  businessAllPayment,
  paymentDelete,
};
