const SubCategory = require("./SubCategory.model");

const subCategoryCreate = async (SubCategoryData) => {
  const subCategory = await SubCategory.create(SubCategoryData);
  return subCategory;
};
const subCategoryUpdateData = async (SubCategoryId, data) => {
  const subCategory = await SubCategory.findByIdAndUpdate(SubCategoryId, data);
  return subCategory;
};
const allCategorySubCategory = async (categoryId) => {
  const subCategory = await SubCategory.find({ categoryId }).populate(
    "categoryId"
  );
  return subCategory;
};
const allSubCategory = async () => {
  const subCategory = await SubCategory.find().populate("categoryId");
  return subCategory;
};

const subCategorySingleView = async (SubCategoryId) => {
  const subCategory = await SubCategory.findById(SubCategoryId);
  return subCategory;
};

const subCategoryDelete = async (SubCategoryId) => {
  await SubCategory.findByIdAndDelete(SubCategoryId);
  const subCategory = await subCategorySingleView(SubCategoryId);
  return subCategory;
};

module.exports = {
  subCategoryCreate,
  subCategoryUpdateData,
  allSubCategory,
  subCategorySingleView,
  subCategoryDelete,
  allCategorySubCategory,
};
