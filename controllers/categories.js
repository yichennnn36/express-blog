const db = require('../models');
const Category = db.Categories;

const categoryController = {
  getAllCategories: async (req, res, next) => {
    let categories;
    try {
      categories = await Category.findAll();
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('categoryPage', {
      categories
    })
  },
  createCategoryPage: async (req, res, next) => {
    let categories;
    try {
      categories = await Category.findAll()
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('createCategoryPage', {
      categories,
      errMessage: req.flash('errMessage'),
      successMessage: req.flash('successMessage')
    });
  },
  handleCreateCategory: async (req, res, next) => {
    const { category } = req.body;
    if (!category) {
      req.flash('errMessage', '請輸入文章分類');
      return next();
    }
    try {
      await Category.create({
        name: category
      });
      req.flash('successMessage', '新增分類成功');
      res.redirect('createCategoryPage');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  }
}
module.exports = categoryController;
