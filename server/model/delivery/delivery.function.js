const Delivery = require("./delivery.model");

const deliveryCreate = async (deliveryData) => {
  const delivery = await Delivery.create(deliveryData);
  return delivery;
};

const viewAllDelivery = async () => {
  const delivery = await Delivery.find();
  return delivery;
};

const singleDeliveryView = async (AdminId) => {
  const delivery = await Delivery.findById(AdminId);
  return delivery;
};

const deliveryUpdateData = async (AdminId, data) => {
  const delivery = await Delivery.findByIdAndUpdate(AdminId, data);
  return delivery;
};

module.exports = {
  deliveryCreate,
  viewAllDelivery,
  singleDeliveryView,
  deliveryUpdateData,
};
