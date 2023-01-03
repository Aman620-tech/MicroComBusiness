const {
  productCreate,
  productSingleView,
  userViewAllProduct,
  viewAll,
  productUpdateData,
  findProductById,
  productDelete,
  categoryWiseProduct,
  ImageAddToProduct,
} = require("../model/product/product.function");

const { uploadFile, DeleteFile } = require("../services/file-upload");

const addProductByOwner = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const {
      productName,
      categoryId,
      subcategoryId,
      productType,
      description,
      price,
      size,
      color,
      quantity,
      productRating,
      imageLength,
    } = req.body;
    if (
      !productName ||
      !businessId ||
      !categoryId ||
      !subcategoryId ||
      !productType ||
      !price
    ) {
      console.log(req.body, businessId);
      return res.json({ Status: 400, response: "Missing values" });
    }
    const data = {
      businessId,
      productName,
      categoryId,
      subcategoryId,
      description,
      productType,
      price: 50 + parseInt(price),
      size,
      color,
      quantity,
      productRating,
      userId: req.user._id,
    };

    const product = await productCreate(data);
    // console.log("imageLength", imageLength);
    if (imageLength) {
      for (let i = 0; i < imageLength; i++) {
        if (req.files) {
          const productImage = req.files[`productImage${i}`];
          console.log("productImage", productImage);
          if (productImage) {
            // console.log(req.files);
            const extensions = [".png", ".jpg", ".jpeg"];
            const fileLink = await uploadFile(productImage, extensions);
            console.log(fileLink);
            const imageData = {
              imageName: productImage.name,
              imagePath: fileLink,
            };
            await ImageAddToProduct(product._id, imageData);
          }
        }
      }
    }

    const Product = await findProductById(product._id);
    res.json({
      status: 200,
      response: "Product Created",
      product: Product,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const businessAllProduct = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const product = await viewAll(businessId);
    res.json({ status: 200, response: " all Product ", product });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const allProduct = async (req, res, next) => {
  try {
    const product = await userViewAllProduct();
    res.json({ status: 200, response: " all Product ", product });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const SingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productSingleView(productId);
    res.json({ status: 200, response: " all Product ", product });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      categoryId,
      subcategoryId,
      productType,
      description,
      price,
      size,
      color,
      quantity,
      productRating,
      imageLength,
    } = req.body;
    const data = {
      productName,
      categoryId,
      subcategoryId,
      productType,
      description,
      price,
      size,
      color,
      quantity,
      productRating,
    };
    let product = await productUpdateData(productId, data);

    if (imageLength) {
      for (let i = 0; i < imageLength; i++) {
        if (req.files) {
          const productImage = req.files[`productImage${i}`];
          console.log("productImage", productImage);
          if (productImage) {
            // console.log(req.files);
            const extensions = [".png", ".jpg", ".jpeg"];
            const fileLink = await uploadFile(productImage, extensions);
            // console.log(fileLink);
            const imageData = {
              imageName: productImage.name,
              imagePath: fileLink,
            };
            product = await ImageAddToProduct(product._id, imageData);
          }
        }
      }
    }

    // const product = await findProductById(productCreate._id);
    res.json({
      status: 200,
      message: " Product updated successfully ",
      product,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { productId, businessId } = req.params;
    let product = await findProductById(productId);
    // console.log("object", product.image);
    if (product.image) {
      for (let i = 0; i < product.image.length; i++) {
        await DeleteFile(product.image[i].imagePath);
        // console.log("first", a);
      }
    }

    product = await productDelete(businessId, productId);
    res.json({
      status: 200,
      response: " Product deleted successfully ",
      product,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const productStatusChange = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { active } = req.body;
    const data = { active };
    let product = await productUpdateData(productId, data);
    res.json({ status: 200, response: " all Product ", product });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const categoryProduct = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    console.log("object", categoryId);
    const product = await categoryWiseProduct(categoryId);
    res.json({ status: 200, response: " all Product ", product });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  allProduct,
  businessAllProduct,
  // addProductByEmployee,
  categoryProduct,
  updateProduct,
  addProductByOwner,
  deleteProduct,
  SingleProduct,
  productStatusChange,
};
