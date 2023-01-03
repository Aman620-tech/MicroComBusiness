const Product = require("./product.model");

const productCreate = async (productData) => {
  const product = await Product.create(productData);
  return product;
};
const productUpdateData = async (productId, data) => {
  await Product.findByIdAndUpdate(productId, data);
  const product = await productSingleView(productId);
  return product;
};
const viewAll = async (businessId) => {
  const product = await Product.find({ businessId })
    .populate(["categoryId", "subcategoryId"])
    .sort({ createdAt: -1 });
  return product;
};
const userViewAllProduct = async () => {
  const product = await Product.find().populate([
    "categoryId",
    "subcategoryId",
  ]);
  return product;
};

const findProductById = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

const productSingleView = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};
const productDelete = async (businessId, productId) => {
  await Product.findOneAndDelete({ businessId, productId });
  const product = await productSingleView(productId);
  return product;
};
const ImageAddToProduct = async (productId, imageData) => {
  // console.log("imageData", imageData);
  const product = await Product.findByIdAndUpdate(productId, {
    $push: { image: imageData },
  });
  return product;
};

const UserAddToProduct = async (productId, userId) => {
  const product = await Product.findByIdAndUpdate(productId, {
    $push: { userId },
  });
  return product;
};
const UserRemoveToProduct = async (productId, userId) => {
  const product = await Product.findByIdAndUpdate(productId, {
    $pull: { userId },
  });
  return product;
};

const categoryWiseProduct = async (categoryId) => {
  const product = await Product.find({ categoryId });
  return product;
};

module.exports = {
  productCreate,
  productSingleView,
  findProductById,
  viewAll,
  categoryWiseProduct,
  productUpdateData,
  productDelete,
  UserAddToProduct,
  UserRemoveToProduct,
  userViewAllProduct,
  ImageAddToProduct,
};

// module.exports = { productCreate };
