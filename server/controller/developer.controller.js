const {
  DeveloperCreate,
  DeveloperSingleView,
  viewAll,
  DeveloperUpdateData,
  DeveloperDelete,
} = require("../model/developer/developer.function");
const { uploadFile, DeleteFile } = require("../services/file-upload");

const createDeveloper = async (req, res, next) => {
  try {
    const { name, role, experience, description, linkedIn, instagram } =
      req.body;
    if (!name || !role || !experience) {
      res.json({ status: 400, response: err.message });
    }
    const developerData = {
      name,
      role,
      experience,
      description,
      linkedIn,
      instagram,
    };
    const developer = await DeveloperCreate(developerData);
    // const categoryImage = req.files.categoryImage;
    if (req.files) {
      const image = req.files["image"];

      if (image) {
        const extensions = [".png", ".jpg", ".jpeg"];
        const imgLink = await uploadFile(image, extensions);
        // console.log("fileLink", imgLink);
        const data = {
          image: imgLink,
        };
        await DeveloperUpdateData(developer._id, data);
      }
    }

    const developerView = await DeveloperSingleView(developer._id);
    res.json({
      status: 200,
      response: "developer Created",
      developer: developerView,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const SingleDeveloperView = async (req, res, next) => {
  try {
    const { developerId } = req.params;
    const developer = await DeveloperSingleView(developerId);
    res.json({ status: 200, response: "Single  developer ", developer });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const allDeveloperView = async (req, res, next) => {
  try {
    const developer = await viewAll();
    res.json({ status: 200, response: "all  developer ", developer });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const updateDeveloper = async (req, res, next) => {
  try {
    const { developerId } = req.params;
    const { name, role, experience, description, linkedIn, instagram } =
      req.body;

    const developerData = {
      name,
      role,
      experience,
      description,
      linkedIn,
      instagram,
    };
    const developerDetail = await DeveloperSingleView(developerId);
    let developerView = await DeveloperUpdateData(developerId, developerData);

    if (req.files) {
      const image = req.files["image"];
      await DeleteFile(developerDetail.image);

      if (image) {
        const extensions = [".png", ".jpg", ".jpeg"];
        const imgLink = await uploadFile(image, extensions);
        // console.log("fileLink", imgLink);
        const data = {
          image: imgLink,
        };
        developerView = await DeveloperUpdateData(developerId, data);
      }
    }

    // const developerView = await DeveloperSingleView(developerId);
    res.json({
      status: 200,
      response: "developer Created",
      developer: developerView,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const deleteDeveloperView = async (req, res, next) => {
  try {
    const { developerId } = req.params;
    const developer = await DeveloperSingleView(developerId);
    await DeleteFile(developer.image);
    await DeveloperDelete(developerId);

    console.log("Param", Param);
    res.json({ status: 200, response: "deleted developer ", developer });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
module.exports = {
  createDeveloper,
  SingleDeveloperView,
  allDeveloperView,
  updateDeveloper,
  deleteDeveloperView,
};
