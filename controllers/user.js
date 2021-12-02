const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.User;

const userController = {
  loginPage: (req, res) => {
    res.render('loginPage', {
      errMessage: req.flash('errMessage')
    });
  },
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errMessage', '請輸入帳號密碼');
      return next();
    }
    let user;
    try {
      user = await User.findOne({
        where: { username }
      });
    } catch (err) {
      req.flash('errMessage', err.toString());
      return next();
    }
    if (!user) {
      req.flash('errMessage', '帳號或密碼錯誤');
      return next();
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        req.flash('errMessage', '帳號或密碼錯誤');
        return next();
      }
      req.session.username = user.username;
      res.redirect('/backstage');
    });
  },
  handleLogout: (req, res) => {
    // clear up session
    req.session.destroy();
    res.redirect('/');
  }
}
module.exports = userController;
