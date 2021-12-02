const express = require('express');
const app = express();
// middleware
const flash = require('connect-flash');
const moment = require('moment');
const engine = require('ejs-locals');
const session = require('express-session');
const multer = require('multer');
const upload = multer();
const { check } = require('express-validator');

const port = process.env.PORT || 5001;

// include controller
const userController = require('./controllers/user');
const articleController = require('./controllers/articles');
const categoryController = require('./controllers/categories');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(session({
  secret: 'somevalue',
  resave: false,
  saveUninitialized: true
}));
// use built-in middleware static() to serve static files
app.use(express.static(__dirname + '/public'));

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
// 格式化時間
app.locals.moment = moment;

const redirectBack = (req, res) => {
  res.redirect('back');
}
const checkLogin = (req, res, next) => {
  if (!req.session.username) return res.redirect('/login');
  next();
}
// router
app.get('/login', userController.loginPage);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.handleLogout);
app.get('/about', (req, res) => res.render('aboutPage'));
app.get('/', articleController.getAllArticles, redirectBack);
app.get('/indexArticle/:id', (req, res) => res.set('Access-Control-Allow-Origin', '*'));
app.get('/indexArticle/:id', articleController.getOneArticle, redirectBack);
app.get('/list', articleController.getAllArticlesList, redirectBack);
app.get('/category', categoryController.getAllCategories, redirectBack);
app.get('/backstage', checkLogin, articleController.backstage);
app.get('/createArticle', checkLogin, articleController.createArticlePage, redirectBack);
app.post('/createArticle', checkLogin, upload.single('image'), [
  check('title').notEmpty().withMessage('請輸入文章標題'),
  check('content').notEmpty().withMessage('請輸入文章內容'),
  check('category').custom((value, { req }) => {
    if (value === 'not-selected') {
      throw new Error('請選擇文章分類')
    }
    return true;
  })
],
  articleController.checkErr,
  articleController.handleUploadImage,
  articleController.handleCreateArticle,
  redirectBack);
app.get('/deleteArticle/:id', checkLogin, articleController.handleDelete, redirectBack);
app.get('/updateArticle/:id', checkLogin, articleController.updateArticlePage)
app.post('/updateArticle/:id', checkLogin, upload.single('image'), [
  check('title').notEmpty().withMessage('請輸入文章標題'),
  check('content').notEmpty().withMessage('請輸入文章內容'),
  check('category').custom((value, { req }) => {
    if (value === 'not-selected') {
      throw new Error('請選擇文章分類')
    }
    return true;
  })
],
  articleController.checkErr,
  articleController.handleUploadImage,
  articleController.handleUpdateArticle,
  redirectBack);
app.get('/createCategory', checkLogin, categoryController.createCategoryPage, redirectBack)
app.post('/createCategory', checkLogin, categoryController.handleCreateCategory, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
