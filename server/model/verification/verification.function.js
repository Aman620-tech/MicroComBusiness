const Verification = require("./verification.model");

const VerificationCreate = async (VerificationData) => {
  const verification = await Verification.create(VerificationData);
  return verification;
};
const VerificationUpdateData = async (VerificationId, data) => {
  await Verification.findByIdAndUpdate(VerificationId, data);
  const verification = await VerificationSingleView(VerificationId);
  return verification;
};
const BusinessVerification = async (businessId) => {
  const verification = await Verification.find({ businessId }).populate(
    "businessId"
  );
  return verification;
};
const ViewAllVerification = async () => {
  const verification = await Verification.aggregate([
    {
      $group: { _id: "$businessId" },
    },
    {
      $lookup: {
        from: "businesses",
        localField: "_id",
        foreignField: "_id",
        as: "BusinessData",
      },
    },
    {
      $lookup: {
        from: "verifications",
        localField: "_id",
        foreignField: "businessId",
        as: "VerificationData",
      },
    },
  ]);

  return verification;
};

// const ViewAllVerification = async () => {
//   const verification = await Verification.find().sort({ createdAt: -1 });
//   return verification;
// };

const findVerificationById = async (VerificationId) => {
  const verification = await Verification.findById(VerificationId);
  return verification;
};

const VerificationSingleView = async (businessId) => {
  const verification = await Verification.find({ businessId }).sort({
    createdAt: -1,
  });
  return verification;
};

// const AllVerificationFile = async () => {
//   const verification = await Verification.find();
//   return verification;
// };
const VerificationDelete = async (VerificationId) => {
  await Verification.findByIdAndDelete(VerificationId);
  const verification = await findVerificationById(VerificationId);
  return verification;
};
const FileAddToVerification = async (VerificationId, fileData) => {
  await Verification.findByIdAndUpdate(
    VerificationId,
    {
      $push: { files: fileData },
    },
    { new: true }
  );
  const verification = await findVerificationById(VerificationId);
  return verification;
};

const userVerificationUpdate = async (VerificationId, data) => {
  await Verification.findByIdAndUpdate(
    VerificationId,
    {
      $set: data,
    },
    { new: true }
  );

  const verification = await findVerificationById(VerificationId);
  return verification;
};
module.exports = {
  VerificationCreate,
  VerificationSingleView,
  findVerificationById,
  BusinessVerification,
  FileAddToVerification,
  ViewAllVerification,
  VerificationUpdateData,
  VerificationDelete,
  userVerificationUpdate
  // AllVerificationFile
};

// module.exports = { VerificationCreate };
