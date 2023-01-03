const UserVerify = require("./userVerify.model");

const createVerification = async (data) => {
  const verification = await UserVerify.create(data);
  return verification;
};
const findMobileNumberAndEmail = async (mobileNumber, email) => {
  const verification = await UserVerify.findOne({
    $and: [{ mobileNumber }, { email }],
  });
  return verification;
};
const DocumentUpload = async (verificationId, files) => {
  const verification = await UserVerify.findByIdAndUpdate(verificationId, {
    $push: { files },
  });
  return verification;
};

module.exports = {
  createVerification,
  DocumentUpload,
  findMobileNumberAndEmail,
};
