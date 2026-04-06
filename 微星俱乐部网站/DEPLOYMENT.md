# 部署指南

本文档详细说明如何将中国微星俱乐部网站部署到各个平台。

## 📋 部署方案对比

| 方案 | 前端 | 后端 | 适用场景 | 难度 |
|------|------|------|----------|------|
| 方案A | GitHub Pages | 无 | 仅展示静态页面 | ⭐ |
| 方案B | GitHub Pages | Vercel/Heroku | 完整功能网站 | ⭐⭐⭐ |
| 方案C | Vercel | Vercel | 全栈部署 | ⭐⭐ |

---

## 🚀 方案A：仅部署前端到GitHub Pages

### 优点
- 完全免费
- 部署简单
- 自动HTTPS

### 缺点
- 后端API不可用
- 无法处理表单提交
- 无法实现用户登录等功能

### 部署步骤

#### 1. 创建GitHub仓库
```bash
# 在GitHub上创建新仓库，例如：msi-club-website
```

#### 2. 初始化Git并推送代码
```bash
cd d:\微星俱乐部网站
git init
git add .
git commit -m "Initial commit: 微星俱乐部网站框架"
git branch -M main
git remote add origin https://github.com/yourusername/msi-club-website.git
git push -u origin main
```

#### 3. 启用GitHub Pages
1. 进入仓库的 **Settings** 页面
2. 左侧菜单找到 **Pages**
3. Source选择 **GitHub Actions**
4. 自动触发部署

#### 4. 访问网站
部署完成后访问：
```
https://yourusername.github.io/msi-club-website
```

---

## 🌐 方案B：前后端分离部署

### 前端部署到GitHub Pages

按照方案A的步骤部署前端。

### 后端部署选项

#### 选项1：Vercel（推荐）

**优点**：
- 免费额度充足
- 自动部署
- 支持自定义域名

**步骤**：

1. 安装Vercel CLI
```bash
npm install -g vercel
```

2. 创建Vercel配置文件
在项目根目录创建 `vercel.json`：
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    }
  ]
}
```

3. 部署到Vercel
```bash
vercel
```

4. 获取API地址
部署后会得到类似 `https://msi-club-api.vercel.app` 的地址

5. 更新前端API地址
修改前端JS文件中的API地址：
```javascript
const API_BASE_URL = 'https://msi-club-api.vercel.app';
```

#### 选项2：Heroku

**优点**：
- 免费套餐（有限制）
- 支持多种后端语言

**步骤**：

1. 创建Heroku账号并安装Heroku CLI
```bash
# 下载安装：https://devcenter.heroku.com/articles/heroku-cli
```

2. 登录Heroku
```bash
heroku login
```

3. 创建应用
```bash
heroku create msi-club-api
```

4. 创建Procfile
在项目根目录创建 `Procfile`（无扩展名）：
```
web: node backend/server.js
```

5. 部署
```bash
git push heroku main
```

6. 获取API地址
```
https://msi-club-api.herokuapp.com
```

#### 选项3：Railway

**优点**：
- 免费额度较大
- 部署简单
- 支持数据库

**步骤**：

1. 访问 [Railway](https://railway.app/)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择您的仓库
6. Railway会自动检测Node.js项目并部署

---

## 🎯 方案C：全栈部署到Vercel

### 步骤

1. 修改项目结构，创建Vercel配置：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

2. 部署
```bash
vercel
```

---

## 🔧 环境变量配置

### 后端环境变量

在部署平台设置以下环境变量：

```env
PORT=3000
JWT_SECRET=your-secret-key-here
DB_HOST=your-database-host
DB_PORT=27017
DB_NAME=msi_club
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
CORS_ORIGIN=https://yourusername.github.io
```

### Vercel设置环境变量
```bash
vercel env add JWT_SECRET
vercel env add DB_HOST
```

### Heroku设置环境变量
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set DB_HOST=your-database-host
```

---

## 📊 数据库部署

### MongoDB Atlas（推荐）

**免费套餐**：512MB存储空间

**步骤**：

1. 访问 [MongoDB Atlas](https://www.mongodb.com/atlas)
2. 创建免费集群
3. 创建数据库用户
4. 获取连接字符串
5. 在后端配置中添加连接字符串

### 安装Mongoose
```bash
npm install mongoose
```

### 更新后端代码

在 `backend/server.js` 中添加数据库连接：

```javascript
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('数据库连接成功'))
.catch(err => console.error('数据库连接失败:', err));
```

---

## 🌍 自定义域名

### GitHub Pages自定义域名

1. 在仓库根目录创建 `CNAME` 文件：
```
www.msiclub.com
```

2. 在域名服务商添加DNS记录：
```
类型: CNAME
名称: www
值: yourusername.github.io
```

3. 在GitHub Pages设置中启用HTTPS

### Vercel自定义域名

1. 在Vercel项目设置中添加域名
2. 按照提示配置DNS记录
3. 自动启用HTTPS

---

## ✅ 部署检查清单

- [ ] 代码已推送到GitHub
- [ ] GitHub Pages已启用
- [ ] 后端已部署到Vercel/Heroku/Railway
- [ ] 前端API地址已更新
- [ ] 环境变量已配置
- [ ] 数据库已连接（如需要）
- [ ] 自定义域名已配置（如需要）
- [ ] HTTPS已启用
- [ ] 所有页面可正常访问
- [ ] API接口可正常调用

---

## 🐛 常见问题

### 1. GitHub Pages显示404
- 检查仓库是否公开
- 检查Pages设置是否正确
- 等待几分钟让部署完成

### 2. API跨域错误
- 在后端配置CORS
- 确保前端使用正确的API地址

### 3. 环境变量未生效
- 检查部署平台的环境变量设置
- 重启应用使变量生效

### 4. 数据库连接失败
- 检查数据库连接字符串
- 确认IP白名单设置
- 验证数据库用户权限

---

## 📞 获取帮助

- GitHub Pages文档: https://docs.github.com/pages
- Vercel文档: https://vercel.com/docs
- Heroku文档: https://devcenter.heroku.com
- MongoDB Atlas文档: https://docs.atlas.mongodb.com

---

## 🎉 推荐部署方案

对于您的项目，我推荐：

**初学者**：方案A（仅前端GitHub Pages）
- 快速看到成果
- 无需配置后端
- 适合展示和测试

**完整功能**：方案B（GitHub Pages + Vercel）
- 前后端分离
- 免费且稳定
- 易于维护

**生产环境**：方案C + MongoDB Atlas
- 全栈部署
- 数据持久化
- 专业级方案
