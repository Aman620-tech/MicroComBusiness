const Category = require("./category.model");

const categoryCreate = async (categoryData) => {
  const category = await Category.create(categoryData);
  return category;
};

const categorySingleView = async (categoryId) => {
  const category = await Category.findOne({ _id: categoryId });
  return category;
};
const categoryUpdateData = async (categoryId, data) => {
   await Category.findByIdAndUpdate(categoryId, data);
   const category = await categorySingleView(categoryId)
   return category;
};
const viewAll = async () => {
  const category = await Category.find();
  return category;
};

const categoryDelete = async (categoryId) => {
  const category = await Category.findByIdAndDelete(categoryId);
  return category;
};

module.exports = {
  categoryCreate,
  categorySingleView,
  viewAll,
  categoryUpdateData,
  categoryDelete,
};
