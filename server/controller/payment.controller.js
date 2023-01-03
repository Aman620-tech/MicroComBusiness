const {
  paymentCreate,
  paymentSingleView,
  paymentUpdateData,
  paymentUpdate,
  userAllPayment,
  businessAllPayment,
  paymentDelete,
} = require("../model/payment/payment.function");

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const createPayment = async (req, res, next) => {
  try {
    const {
      productId,
      productName,
      businessId,
      quantity,
      deliveryCharge,
      productCharge,
    } = req.body;

    const price = parseInt(deliveryCharge) + parseInt(productCharge);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: productName,
            },
            unit_amount: parseInt(price) * 100,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure",
    });

    console.log("sessions", session);

    const data = {
      productId,
      userId: req.user._id,
      businessId,
      deliveryCharge,
      productCharge,
      price: parseInt(session.amount_total) / 100,
      sessionId: session.id,
    };
    const payment = await paymentCreate(data);

    res.json({
      status: 200,
      response: "Payment Url Created",
      payment,
      // sessionId: session.id,
      sessionUrl: session.url,
    });

    //       sessionId:session.id,
    // payment_status
    // payment_intent
    // amount_total
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const paymentCheck = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await paymentSingleView(paymentId);

    // const { sessionId } = req.params;
    // console.log("sessionId", payment.sessionId);
    const session = await stripe.checkout.sessions.retrieve(
      `${payment.sessionId}`
    );

    const data = {
      paymentStatus: session.payment_status,
      sessionPaymentId: session.payment_intent,
    };
    const View = await paymentUpdateData(paymentId, data);

    res.json({
      status: 200,
      response: "Single-payment",
      payment: View,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const userPaymentCheck = async (req, res, next) => {
  try {
    const payment = await userAllPayment(req.user._id);
    res.json({
      status: 200,
      response: "user-All-payment",
      payment,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const businessPaymentCheck = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const payment = await businessAllPayment(businessId);
    res.json({
      status: 200,
      response: "Business-All-payment",
      payment,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const SinglePaymentCheck = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = await paymentSingleView(paymentId);
    res.json({
      status: 200,
      response: "Business-All-payment",
      payment,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  createPayment,
  paymentCheck,
  businessPaymentCheck,
  userPaymentCheck,
  SinglePaymentCheck
};
