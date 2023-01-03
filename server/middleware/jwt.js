const jwt = require("jsonwebtoken");
const { userSingleView } = require("../model/user/user.function");
const {
  userBusinessSingleView,
} = require("../model/business/business.function");

const tokenCreate = async (id) => {
  // console.log(id);
  const token = await jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

const forgetPasswordToken = async (data, secret) => {
  // console.log(data,secret);
  const token = await jwt.sign({ data }, secret, {
    expiresIn: "30m",
  });
  return token;
};

const tokenVerify = async (token, secret) => {
  // console.log("token", token, "secret", "secret");
try{
  const verify = await jwt.verify(token, secret);
  if (verify) {
    return verify;
  }
  // return data;
}catch(err){
  // const data = "Can't access the link ";
return false
}
 
};

const adminAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.json({
        status: 400,
        message: "No authorization token is sent with request",
      });
    }
    const id = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSingleView(id.id);

    // if (user.active === false) {
    //   return res.json({
    //     status: 400,
    //     message:
    //       "you are blocked please drop a mail to microcombusiness@gmail.com ",
    //   });
    // }
    if (user.role === "admin") {
      req.user = user; // token

      return next();
    }
    return res.json({ status: 400, response: "Not a admin" });
  } catch (err) {
    res.json({ status: 400, Error: err.message });
  }
};
// const shopAuthenticate = async (req, res, next) => {
//   try {
//     const token = req.header("token");

//     if (!token) {
//       return res.json({
//         status: 400,
//         message: "No authorization token is sent with request",
//       });
//     }
//     const id = await jwt.verify(token, process.env.JWT_SECRET);
//     const user = await userSingleView(id.id);

//     if (user.active === false) {
//       return res.json({
//         status: 400,
//         message:
//           "you are blocked please drop a mail to microcombusiness@gmail.com ",
//       });
//     }

//     if (user.role === "business") {
//       const business = await userBusinessSingleView(user._id);
//       if (business.businessType === "shop") {
//         req.user = user; // token
//         return next();
//       }
//       return res.json({ status: 400, response: "Not a Shop Owner" });
//     }
//     return res.json({ status: 400, response: "Not a admin" });
//   } catch (err) {
//     res.json({ status: 400, Error: err.message });
//   }
// };

// const deliveryAuthenticate = async (req, res, next) => {
//   try {
//     const token = req.header("token");

//     if (!token) {
//       return res.json({
//         status: 400,
//         message: "No authorization token is sent with request",
//       });
//     }
//     const id = await jwt.verify(token, process.env.JWT_SECRET);
//     const user = await userSingleView(id.id);

//     if (user.active === false) {
//       return res.json({
//         status: 400,
//         message:
//           "you are blocked please drop a mail to microcombusiness@gmail.com ",
//       });
//     }

//     if (user.role === "business") {
//       const business = await userBusinessSingleView(user._id);
//       if (business.businessType === "delivery") {
//         req.user = user;
//         return next();
//       }
//       return res.json({ status: 400, response: "Not a delivery Owner" });
//     }
//     return res.json({ status: 400, response: "Not a admin" });
//   } catch (err) {
//     res.json({ status: 400, Error: err.message });
//   }
// };

const customerAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.json({
        status: 400,
        message: "No authorization token is sent with request",
      });
    }
    const id = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSingleView(id.id);

    if (user.active === false) {
      return res.json({
        status: 400,
        message:
          "you are blocked please drop a mail to microcombusiness@gmail.com ",
      });
    }
    if (user.role === "customer") {
      req.user = user; // token

      return next();
    }
    return res.json({ status: 400, response: "Not a customer" });
  } catch (err) {
    res.json({ status: 400, Error: err.message });
  }
};
const businessAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.json({
        status: 400,
        message: "No authorization token is sent with request",
      });
    }
    const id = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSingleView(id.id);

    if (user.active === false) {
      return res.json({
        status: 400,
        message:
          "you are blocked please drop a mail to microcombusiness@gmail.com ",
      });
    }
    if (user.role === "business") {
      req.user = user; // token

      return next();
    }
    return res.json({ status: 400, response: "Not a Business User" });
  } catch (err) {
    res.json({ status: 400, Error: err.message });
  }
};

module.exports = {
  tokenCreate,
  adminAuthenticate,
  tokenVerify,
  forgetPasswordToken,
  // shopAuthenticate,
  // deliveryAuthenticate,
  customerAuthenticate,
  businessAuthenticate,
};

//
// user  token
