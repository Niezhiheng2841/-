# 中国微星俱乐部网站

这是中国微星俱乐部的官方网站项目，为微星爱好者提供一个交流、学习、分享的平台。

## 项目结构

```
微星俱乐部网站/
├── frontend/                 # 前端文件
│   ├── index.html           # 首页
│   ├── activities.html      # 活动中心
│   ├── members.html         # 会员专区
│   ├── css/                 # 样式文件
│   │   ├── style.css        # 主样式
│   │   ├── index.css        # 首页样式
│   │   ├── activities.css   # 活动中心样式
│   │   └── members.css      # 会员专区样式
│   ├── js/                  # JavaScript文件
│   │   ├── main.js          # 主脚本
│   │   ├── index.js         # 首页脚本
│   │   ├── activities.js    # 活动中心脚本
│   │   └── members.js       # 会员专区脚本
│   └── images/              # 图片资源
├── backend/                  # 后端文件
│   ├── server.js            # 服务器入口
│   ├── routes/              # 路由
│   │   ├── index.js         # 主路由
│   │   ├── activities.js    # 活动路由
│   │   ├── members.js       # 会员路由
│   │   └── contact.js       # 联系表单路由
│   ├── models/              # 数据模型
│   └── config/              # 配置文件
│       └── index.js         # 主配置
├── assets/                   # 静态资源
│   ├── images/              # 图片
│   └── docs/                # 文档
├── package.json             # 项目配置
└── .gitignore              # Git忽略文件
```

## 功能特性

### 前端功能
- 响应式设计，支持移动端访问
- 首页：展示俱乐部介绍、最新动态、统计数据
- 活动中心：活动列表、筛选、日历视图
- 会员专区：会员等级、权益展示、积分系统

### 后端功能
- RESTful API接口
- 活动管理（增删改查）
- 会员注册登录
- 联系表单处理
- 积分兑换系统

## 技术栈

### 前端
- HTML5
- CSS3
- JavaScript (ES6+)

### 后端
- Node.js
- Express.js

## 安装和运行

### 前置要求
- Node.js >= 14.0.0
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 运行开发服务器
```bash
npm run dev
```

### 运行生产服务器
```bash
npm start
```

服务器将在 http://localhost:3000 启动

## API接口

### 基础接口
- `GET /api` - API信息
- `GET /api/health` - 健康检查

### 活动接口
- `GET /api/activities` - 获取活动列表
- `GET /api/activities/:id` - 获取活动详情
- `POST /api/activities/:id/register` - 报名活动

### 会员接口
- `POST /api/members/register` - 会员注册
- `POST /api/members/login` - 会员登录
- `GET /api/members/profile` - 获取会员信息
- `GET /api/members/gifts` - 获取可兑换礼品
- `POST /api/members/exchange/:giftId` - 兑换礼品

### 联系接口
- `POST /api/contact` - 提交联系表单

## 开发指南

### 添加新页面
1. 在 `frontend/` 目录创建新的HTML文件
2. 在 `frontend/css/` 创建对应的样式文件
3. 在 `frontend/js/` 创建对应的脚本文件
4. 在后端添加相应的路由（如需要）

### 添加新功能
1. 前端：在相应的JS文件中添加功能函数
2. 后端：在 `backend/routes/` 中添加新的路由处理

## 待完善功能

- [ ] 数据库集成（MongoDB/MySQL）
- [ ] 用户认证系统（JWT）
- [ ] 文件上传功能
- [ ] 管理后台
- [ ] 邮件通知
- [ ] 微信登录集成

## 贡献指南

欢迎提交Issue和Pull Request来帮助改进项目。

## 许可证

MIT License

## 联系方式

- 邮箱：contact@msiclub.com
- 电话：400-xxx-xxxx
