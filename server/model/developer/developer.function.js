const Developer = require("./developer.model");

const DeveloperCreate = async (developerData) => {
  const developer = await Developer.create(developerData);
  return developer;
};

const DeveloperSingleView = async (developerId) => {
  const developer = await Developer.findById(developerId);
  return developer;
};
const DeveloperUpdateData = async (developerId, data) => {
   await Developer.findByIdAndUpdate(developerId, data);
   const developer = await DeveloperSingleView(developerId)
   return developer;
};
const viewAll = async () => {
  const developer = await Developer.find();
  return developer;
};

const DeveloperDelete = async (developerId) => {
  const developer = await Developer.findByIdAndDelete(developerId);
  return developer;
};

module.exports = {
  DeveloperCreate,
  DeveloperSingleView,
  viewAll,
  DeveloperUpdateData,
  DeveloperDelete,
};
