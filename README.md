# express-blog

![express-blog](https://user-images.githubusercontent.com/82022020/144380151-fe229a4a-13d1-4c6d-97da-ac7642fef336.gif)

個人部落格（以 Express 實作前端 + 後端）

## Demo

> 網站： [https://blog.yichennnn.tw/](https://blog.yichennnn.tw/)

- User：admin123
- Password：admin123

## Technologies

- Express 框架
- MVC 架構
- EJS Template Emgine
- Imgur API 串接
- Sequelize ODM 操作資料庫
- pm2 + Nginx 部署

## 專案架構（frontend）

```
├── .gitignore
├── package-lock.json
├── package.json
├── app.js
├── config
│   └── config.json.              # 連線資料庫
├── controllers
│   ├── articles.js
│   ├── categories.js
│   └── user.js
├── migrations
├── models
│   ├── articles.js
│   ├── categories.js
│   ├── index.js
│   └── user.js
├── public                        # 放靜態檔案 css/js/images
└── views                         # 管理畫面的顯示 EJS Template Emgine
```
