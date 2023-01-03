const {
  cartCreate,
  CartUpdateData,
  CartDelete,
  productCheck,
  allCart,
  singleCartView,
  AddProductToCart,
  removeProductFromCart,
} = require("../model/cart/cart.function");

// const allProduct = async (req, res, next) => {
//     try {
//       const { businessId } = req.params;
//       const product = await viewAll(businessId);
//       res.json({ status: 200, response: " all Product ", product });
//     } catch (err) {
//       res.json({ status: 400, response: err.message });
//     }
//   };
// const SingleKart = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     const product = await productSingleView(productId);
//     res.json({ status: 200, response: " all Product ", product });
//   } catch (err) {
//     res.json({ status: 400, response: err.message });
//   }
// };

// const CreateKart = async (req, res, next) => {
//   try {
//     const cartSearch = await singleCartView(req.user._id);
//     if (cartSearch) {
//       return res.json({
//         status: 400,
//         response: " Cart already Created ",
//         cart: cartSearch,
//       });
//     }

//     const CartData = {
//       userId: req.user._id,
//     };
//     const cart = await cartCreate(CartData);
//     res.json({ status: 200, response: " Cart Created ", cart });
//   } catch (err) {
//     res.json({ status: 400, response: err.message });
//   }
// };

const AddToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cartCheck = await productCheck(req.user._id);
    // const value = cartCheck.product.includes(productId);

    // console.log(value);
    if (cartCheck && cartCheck.product.includes(productId)) {
      return res.json({ status: 400, response: "product already added " });
    }

    const cart = await AddProductToCart(req.user._id, productId);
    res.json({ status: 200, response: " Added to Cart ", cart });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await removeProductFromCart(req.user._id, productId);
    res.json({ status: 200, response: " Product Removed from Cart ", cart });
  } catch (err) {
  res.json({ status: 400, response: err.message });
  }
};
const UserCart = async (req, res, next) => {
  try {
    const cart = await allCart(req.user._id);
    console.log("first",cart)
    if (cart === null) {
      return res.json({ status: 400, response: "Cart Not activated " });
    }
    res.json({ status: 200, response: " user Cart ", cart });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  //  CreateKart,
    AddToCart, UserCart, removeFromCart };
