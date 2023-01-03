const {
  subCategoryCreate,
  subCategoryUpdateData,
  allSubCategory,
  subCategorySingleView,
  subCategoryDelete,
  allCategorySubCategory,
} = require("../model/SubCategory/subCategory.function");
const { uploadFile, DeleteFile } = require("../services/file-upload");

console.log("In Sub-Category");

const allSubCategoryView = async (req, res, next) => {
  try {
    const subCategory = await allSubCategory();
    res.json({ status: 200, response: "all subCategory", subCategory });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const singleSubCategoryView = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    if (!subCategoryId) {
      return res.json({ Status: 400, response: "Missing values" });
    }
    const subCategory = await subCategorySingleView(subCategoryId);
    res.json({ status: 200, response: "single Sub Category", subCategory });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const deleteSubCategory = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    if (!subCategoryId) {
      return res.json({ Status: 400, response: "Missing values" });
    }
    const subCategory = await subCategorySingleView(subCategoryId);
    await DeleteFile(subCategory.subcategoryImage);

    await subCategoryDelete(subCategoryId);
    res.json({ status: 200, response: "sub-Category deleted", subCategory });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const subCategoryStatusChange = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const { active } = req.body;
    const data = { active };
    const subCategory = await subCategoryUpdateData(subCategoryId, data);
    res.json({
      status: 200,
      response: "SubCategory Status change ",
      subCategory,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const addSubCategory = async (req, res, next) => {
  try {
    const { categoryId, subcategoryName } = req.body;
    if (
      !categoryId ||
      categoryId == " " ||
      !subcategoryName ||
      subcategoryName == " "
    ) {
      return res.json({ status: 400, response: "missing Parameters" });
    }
    const subCategoryData = { categoryId, subcategoryName };
    console.log("body ", subCategoryData);
    const Subcategory = await subCategoryCreate(subCategoryData);
    console.log("object", req.files);

    if (req.files) {
      const subcategoryImage = req.files["subcategoryImage"];
      // console.log("img",  req.files["subcategoryImage"]);
      if (subcategoryImage) {
        const extensions = [".png", ".jpg", ".jpeg"];
        const fileLink = await uploadFile(subcategoryImage, extensions);
        const data = {
          subcategoryImage: fileLink,
        };
        console.log(data);
        await subCategoryUpdateData(Subcategory._id, data);
      }
    }

    const subCategoryView = await subCategorySingleView(Subcategory._id);
    res.json({
      status: 200,
      response: "sub-Category Created",
      subCategory: subCategoryView,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const updateSubCategory = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const { categoryId, subcategoryName } = req.body;
    const subCategoryData = { categoryId, subcategoryName };
    const subCategory = await subCategoryUpdateData(
      subCategoryId,
      subCategoryData
    );
    if (req.files) {
      const subcategoryImage = req.files["subcategoryImage"];
      await DeleteFile(subCategory.subcategoryImage);
      if (subcategoryImage) {
        const extensions = [".png", ".jpg", ".jpeg"];
        const fileLink = await uploadFile(subcategoryImage, extensions);
        const data = {
          subcategoryImage: fileLink,
        };
        console.log(data);
        await subCategoryUpdateData(subCategory._id, data);
      }
    }

    const subCategoryView = await subCategorySingleView(subCategory._id);
    res.json({
      status: 200,
      response: "Category Created",
      subCategory: subCategoryView,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const allCategorySubCategoryView = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const subCategory = await allCategorySubCategory(categoryId);
    res.json({ status: 200, response: "all subCategory", subCategory });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  allSubCategoryView,
  singleSubCategoryView,
  addSubCategory,
  updateSubCategory,
  subCategoryStatusChange,
  deleteSubCategory,
  allCategorySubCategoryView,
};
