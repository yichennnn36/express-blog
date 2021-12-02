const db = require('../models');
const Articles = db.Articles;
const Category = db.Categories;
const fetch = require("node-fetch");
const FormData = require('form-data');
const { validationResult } = require('express-validator');

const articleController = {
  getAllArticles: async (req, res, next) => {
    let articles;
    try {
      articles = await Articles.findAll({
        where: { isDeleted: 0 },
        include: Category,
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('homePage', {
      articles
    })
  },
  getOneArticle: async (req, res, next) => {
    let article;
    try {
      article = await Articles.findOne({
        where: { id: req.params.id },
        include: Category
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('indexArticlePage', {
      article
    });
  },
  getAllArticlesList: async (req, res, next) => {
    let articles;
    try {
      articles = await Articles.findAll({
        where: { isDeleted: 0 },
        include: Category,
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('listPage', {
      articles
    })
  },
  backstage: async (req, res) => {
    let articles;
    try {
      articles = await Articles.findAll({
        where: { isDeleted: 0 },
        include: Category,
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return res.redirect('back');
    }
    res.render('backstage', {
      articles,
      successMessage: req.flash('successMessage')
    })
  },
  createArticlePage: async (req, res, next) => {
    let categories;
    try {
      categories = await Category.findAll();
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    res.render('createArticlePage', {
      categories,
      errMessage: [],
      article: {}
    });
  },
  checkErr: async (req, res, next) => {
    const { title, category, content } = req.body;
    const errors = validationResult(req);

    if (!req.file) errors.errors.push({ 'msg': '請選擇圖片檔案' });
    if (!errors.isEmpty()) {
      const categories = await Category.findAll()
      if (!req.params.id) {
        return res.render('createArticlePage', {
          categories,
          errMessage: errors.array(),
          article: { title, category, content }
        })
      } else {
        return res.render('updateArticlePage', {
          categories,
          errMessage: errors.array(),
          article: {
            title,
            category,
            content,
            id: req.params.id
          }
        })
      }
    }
    next();
  },
  handleUploadImage: async (req, res, next) => {
    const encoded_image = req.file.buffer.toString('base64');
    const formData = new FormData();
    formData.append('image', encoded_image);

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID d66b1144adcbf85',
        },
        body: formData
      })
      const data = await response.json();
      req.file.url = data.data.link;
      next();
    } catch (err) {
      req.flash('errMessage', err.toString());
      res.redirect('back');
    }
  },
  handleCreateArticle: async (req, res, next) => {
    const { title, category, content } = req.body;
    const categoryData = await Category.findOne({
      where: { name: category }
    });
    const categoryId = categoryData.id;
    const imageUrl = req.file.url;

    try {
      await Articles.create({
        userId: 1,
        categoryId,
        title,
        imageUrl,
        content
      });
      req.flash('successMessage', '新增文章成功');
      res.redirect('backstage');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  },
  handleDelete: async (req, res, next) => {
    const article = await Articles.findOne({
      where: { id: req.params.id }
    });
    try {
      await article.update({
        isDeleted: 1
      })
      req.flash('successMessage', '已刪除文章');
      res.redirect('/backstage');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  },
  updateArticlePage: async (req, res) => {
    const categories = await Category.findAll();
    const article = await Articles.findOne({
      where: { id: req.params.id },
      include: Category
    })
    res.render('updateArticlePage', {
      categories,
      article,
      errMessage: req.flash('errMessage') || []
    });
  },
  handleUpdateArticle: async (req, res, next) => {
    const { title, category, content } = req.body;
    const id = req.params.id;
    const article = await Articles.findOne({
      where: { id },
      include: Category
    });
    const categoryData = await Category.findOne({
      where: { name: category }
    });
    const categoryId = categoryData.id;
    const imageUrl = req.file.url;

    try {
      await article.update({
        categoryId,
        title,
        imageUrl,
        content
      });
      req.flash('successMessage', '成功編輯文章');
      res.redirect('/backstage');
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
  }
}
module.exports = articleController;
