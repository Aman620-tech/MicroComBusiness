const {
  orderCreate,
  orderSingleView,
  viewAll,
  orderUpdateData,
  orderDelete,
  businessView,
} = require("../model/order/order.function");

const createOrder = (req, res, next) => {
  try {
    const { productId, paymentId, businessId, userId, orderStatus } = req.body;
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
