const Cart = require("./cart.model");

const cartCreate = async (cartData) => {
  const cart = await Cart.create(cartData);
  return cart;
};

const allCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("product");
  return cart;
};
const productCheck = async (userId) => {
  const cart = await Cart.findOne({ userId });
  return cart;
};

const singleCartView = async (userId) => {
  const cart = await Cart.findOne({ userId });
  return cart;
};

const CartUpdateData = async (cartId, data) => {
  await Cart.findByIdAndUpdate(cartId, data);
  const cart = await singleCartView(cartId);
  return cart;
};

const AddProductToCart = async (userId, productId) => {
  await Cart.findOneAndUpdate(
    { userId },
    { $push: { product: productId } },
    { new: true }
  );
  const cart = await singleCartView(userId);
  return cart;
};

const removeProductFromCart = async (userId, productId) => {
  await Cart.findOneAndUpdate(
    { userId },
    { $pull: { product: productId } },
    { new: true }
  );
  const cart = await singleCartView(userId);
  return cart;
};

const CartDelete = async (cartId, data) => {
  const cart = await Cart.findByIdAndUpdate(cartId, data);
  return cart;
};

module.exports = {
  cartCreate,
  CartUpdateData,
  CartDelete,
  allCart,
  productCheck,
  AddProductToCart,
  singleCartView,
  removeProductFromCart,
};
