const Order = require("./order.model");

const orderCreate = async (orderData) => {
  const order = await Order.create(orderData);
  return order;
};


const orderSingleView = async (orderId) => {
  const order = await Order.findOne({ _id: orderId });
  return order;
};
const orderUpdateData = async (orderId, data) => {
  await Order.findByIdAndUpdate(orderId, data);
  const order = await orderSingleView(orderId);
  return order;
};
const viewAll = async (userId) => {
  const order = await Order.find({ userId });
  return order;
};

const businessView = async (businessId) => {
  const order = await Order.find({ businessId });
  return order;
};

const orderDelete = async (orderId) => {
  const order = await Order.findByIdAndDelete(orderId);
  return order;
};

module.exports = {
  orderCreate,
  orderSingleView,
  viewAll,
  orderUpdateData,
  orderDelete,
  businessView
};
