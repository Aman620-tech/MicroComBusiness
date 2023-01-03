const {
  VerificationCreate,
  VerificationSingleView,
  findVerificationById,
  BusinessVerification,
  FileAddToVerification,
  // AllVerificationFile,
  ViewAllVerification,
  VerificationUpdateData,
  VerificationDelete,
  userVerificationUpdate,
} = require("../model/verification/verification.function");

const { businessUpdateData } = require("../model/business/business.function");

const { uploadFile, DeleteFile } = require("../services/file-upload");

const createVerification = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { businessName, fileLength } = req.body;
    // console.log("body", { businessName, fileLength }, "businessId", businessId);
    if (!businessName || !businessId || !fileLength) {
      // console.log(req.body, businessId);
      return res.json({ Status: 400, response: "Missing values" });
    }
    const verificationData = {
      businessId,
      businessName,
      userId: req.user._id,
    };

    let Verification = await VerificationCreate(verificationData);
    // console.log("imageLength", imageLength);
    let verification;
    if (fileLength) {
      for (let i = 0; i < fileLength; i++) {
        if (req.files) {
          const file = req.files[`file${i}`];
          console.log("file", file);
          if (file) {
            // console.log(req.files);
            const extensions = [".png", ".jpg", ".jpeg", ".pdf", ".word"];
            const fileLink = await uploadFile(file, extensions);
            console.log("fileLink", fileLink);
            const verificationData = {
              fileName: file.name,
              filePath: fileLink,
            };
            // console.log("verificationData", verificationData);

            verification = await FileAddToVerification(
              Verification._id,
              verificationData
            );
          }
        }
      }
    }

    res.json({
      status: 200,
      response: "verification Created",
      verification,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const VerificationViewByOwner = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    if (!businessId) res.json({ status: 200, response: "Missing parameter" });
    const verification = await VerificationSingleView(businessId);
    res.json({
      status: 200,
      response: "verification View",
      verification,
    });
  } catch (err) {
    res.json({
      status: 400,
      response: err.message,
    });
  }
};
const AllVerificationFile = async (req, res, next) => {
  try {
    const verification = await ViewAllVerification();
    res.json({
      status: 200,
      response: "verification View",
      verification,
    });
  } catch (err) {
    res.json({
      status: 400,
      response: err.message,
    });
  }
};

const StatusChangeVerification = async (req, res, next) => {
  try {
    const { verificationId } = req.params;
    const { status, message } = req.body;

    const data = {
      status,
      message,
    };
    const verification = await userVerificationUpdate(verificationId, data);
    if (verification.status === "approved") {
      const data = {
        verified: true,
      };

      await businessUpdateData(verification.businessId, data);
    }
    res.json({
      status: 200,
      response: "Verification Status Change",
      verification,
    });
  } catch (err) {
    res.json({
      status: 400,
      response: err.message,
    });
  }
};

// userVerificatioenUpdate;

module.exports = {
  createVerification,
  VerificationViewByOwner,
  AllVerificationFile,
  StatusChangeVerification,
};
