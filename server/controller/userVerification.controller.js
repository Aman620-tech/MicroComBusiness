const {
  createVerification,
  DocumentUpload,
  findMobileNumberAndEmail,
  findMobileNumber,
} = require("../model/userVerify/userVerify.function");
const { UserUpdateData } = require("../model/user/user.function");
const request = require("request");
const { createTransport } = require("nodemailer");

const otpRequest = async (req, res) => {
  try {
    const { mobileNumber, email } = req.body;
    if (!mobileNumber || !email) {
      return res.json({ Status: 400, response: "Missing values" });
    }

    const verificationData = {
      mobileNumber,
      mobileOtp: parseInt(Math.random(5) * 1000000),
      email,
      emailOtp: parseInt(Math.random(5) * 1000000),
      userId: req.user._id,
    };

    url = `https://2factor.in/API/V1/${process.env.MSG_KEY}/SMS/${mobileNumber}/${verificationData.mobileOtp}`;
    await request({ url: url }, (err, response) => {
      if (err) console.log("err", { error: err.message });
      //   console.log("response", response);
      const data = JSON.parse(response.body);
      msgResponse = data;
      console.log("data", data);
    });
    mailOption = {
      to: email,
      subject: "Welcome Mail",
      html: ` your  OTP verification Code is  ${verificationData.emailOtp}`,
    };
    const setup = await createTransport({
      service: "gmail",
      auth: {
        user: process.env.User_Email,
        pass: process.env.User_Password,
      },
    });
    await setup.sendMail(mailOption, (error, info) => {
      if (error) {
        // return res.send({ Error: error });
      }
      console.log(`Email sent: ${info.response}`);
    });

    await createVerification(verificationData);
    res.json({ status: 200, response: "Otp Send" });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const VerifyOtp = async (req, res) => {
  try {
    // const req
    const { mobileNumber, mobileOtp, email, emailOtp } = req.body;
    if (!mobileNumber || !mobileOtp || !email || !emailOtp) {
      // console.log(req.body, businessId);
      return res.json({ Status: 400, response: "Missing values" });
    }

    console.log("mobileOtp", mobileOtp, "emailOtp", emailOtp);
    const userData = await findMobileNumberAndEmail(mobileNumber, email);
    console.log("emailOtp", userData.emailOtp, "mobileOtp", userData.mobileOtp);
    console.log(
      "mobileOtp userData.mobileOtp",
      mobileOtp == userData.mobileOtp,
      "emailOtp == userData.emailOtp",
      emailOtp == userData.emailOtp
    );

    if (mobileOtp == userData.mobileOtp && emailOtp == userData.emailOtp) {
      const data = {
        mobileVerified: true,
        emailVerified: true,
      };
      const userUpdate = await UserUpdateData(req.user._id, data);
      return res.json({
        status: 200,
        response: "User Verified",
        user: userUpdate,
      });
    }
    // if (emailOtp == userData.emailOtp) {
    //   return res.json({ Status: 400, response: "Invalid Email Otp " });
    // }

    res.json({ Status: 400, response: "Invalid Mobile Otp " });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const updateUserVerification = async (req, res) => {
  try {
  } catch (err) {
    res.json({ status: 400, message: err.message });
  }
};

module.exports = { otpRequest, VerifyOtp };
