const {
  categoryCreate,
  categorySingleView,
  viewAll,
  categoryUpdateData,
  categoryDelete,
} = require("../model/category/category.function");
const { uploadFile, DeleteFile } = require("../services/file-upload");

console.log("In Category");

const addCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const categoryData = { categoryName };
    const category = await categoryCreate(categoryData);
    // const categoryImage = req.files.categoryImage;
    if (req.files) {
      const categoryImage = req.files["categoryImage"];

      if (categoryImage) {
        const extensions = [".png", ".jpg", ".jpeg"];
        const fileLink = await uploadFile(categoryImage, extensions);
        console.log("fileLink", fileLink);
        const data = {
          categoryImage: fileLink,
        };
        await categoryUpdateData(category._id, data);
      }
    }

    const categoryView = await categorySingleView(category._id);
    res.json({
      status: 200,
      response: "Category Created",
      category: categoryView,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const viewAllCategory = async (req, res, next) => {
  try {
    const category = await viewAll();
    res.json({ status: 200, response: "all category", category });
  } catch (error) {
    res.json({ status: 400, response: err.message });
  }
};

const viewCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await categorySingleView(categoryId);
    res.json({ status: 200, response: category });
  } catch (error) {
    res.json({ status: 400, response: err.message });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    console.log("categoryId", categoryId);
    const { categoryName } = req.body;
    const categoryData = { categoryName };

    const categoryView = await categoryUpdateData(categoryId, categoryData);
    console.log("categoryView", categoryView);
    if (req.files) {
      const categoryImage = req.files["categoryImage"];
      let categoryView = await categoryUpdateData(categoryId, categoryData);
      await DeleteFile(categoryView.categoryImage);
      console.log("categoryImage", categoryImage);
      if (categoryImage) {
        const extensions = [".png", ".jpg", ".jpeg"];
        const fileLink = await uploadFile(categoryImage, extensions);
        const data = {
          categoryImage: fileLink,
        };
        categoryView = await categoryUpdateData(categoryId, data);
      }
    }
    // const categoryView = await categorySingleView(CategoryId);
    res.json({
      status: 200,
      response: "Category Updated",
      category: categoryView,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const CategoryStatusChange = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    // console.log("categoryId", categoryId);
    const { active } = req.body;
    const categoryData = { active };
    const categoryView = await categoryUpdateData(categoryId, categoryData);
    console.log("categoryView", categoryView);

    // const categoryView = await categorySingleView(CategoryId);
    res.json({
      status: 200,
      response: "Category Status Change",
      category: categoryView,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryView = await categorySingleView(categoryId);
    await DeleteFile(categoryView.categoryImage);
    const category = await categoryDelete(categoryId);
    res.json({
      status: 200,
      response: "Category Deleted",
      category: categoryView,
    });
  } catch (error) {}
};

module.exports = {
  addCategory,
  viewAllCategory,
  viewCategoryById,
  updateCategory,
  deleteCategory,
  CategoryStatusChange,
};
