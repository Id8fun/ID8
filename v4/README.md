# 个人作品集网站

基于 Gatsby 构建的现代化个人作品集网站，支持多语言（中文/英文），具有响应式设计和优雅的动画效果。

## 🏗️ 项目架构

### 技术栈
- **前端框架**: React 17 + Gatsby 3
- **样式方案**: Styled Components
- **动画库**: Anime.js + ScrollReveal
- **国际化**: React i18next
- **构建工具**: Gatsby + Webpack
- **代码规范**: ESLint + Prettier + Husky

### 目录结构
```
src/
├── components/          # React 组件
│   ├── sections/       # 页面区块组件
│   ├── icons/          # SVG 图标组件
│   └── layout/         # 布局组件
├── pages/              # 页面文件
├── styles/             # 全局样式和主题
├── locales/            # 多语言配置
├── hooks/              # 自定义 React Hooks
├── utils/              # 工具函数
└── images/             # 静态图片资源

content/
├── featured/           # 精选项目内容
├── projects/           # 项目展示内容
├── jobs/               # 工作经历内容
└── posts/              # 博客文章内容
```

### 核心功能
- 📱 响应式设计，支持移动端和桌面端
- 🌐 多语言支持（中文/英文切换）
- ✨ 流畅的页面动画和交互效果
- 📝 Markdown 驱动的内容管理
- 🎨 可定制的主题色彩系统
- ⚡ 静态站点生成，性能优化
- 🔍 SEO 友好，支持 sitemap 和 robots.txt

## 🚀 部署步骤

### 环境要求
- Node.js 14.x 或更高版本
- npm 或 yarn 包管理器
- Git

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/Id8fun/ID8.git
   cd ID8/v4
   ```

2. **安装依赖**
   ```bash
   # 使用 yarn（推荐）
   yarn install
   
   # 或使用 npm
   npm install
   ```

3. **启动开发服务器**
   ```bash
   # 使用 yarn
   yarn develop
   
   # 或使用 npm
   npm run develop
   ```
   
   访问 `http://localhost:8000` 查看网站

### 生产构建

1. **构建静态文件**
   ```bash
   # 使用 yarn
   yarn build
   
   # 或使用 npm
   npm run build
   ```

2. **本地预览生产版本**
   ```bash
   # 使用 yarn
   yarn serve
   
   # 或使用 npm
   npm run serve
   ```

### 部署选项

#### 1. Netlify 部署（推荐）
- 连接 GitHub 仓库到 Netlify
- 构建命令：`npm run build`
- 发布目录：`public`
- 自动部署：推送到主分支时自动构建

#### 2. Vercel 部署
- 导入 GitHub 仓库到 Vercel
- 框架预设：Gatsby
- 自动检测构建设置

#### 3. GitHub Pages 部署
```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 添加部署脚本到 package.json
"scripts": {
  "deploy": "gatsby build && gh-pages -d public"
}

# 部署
npm run deploy
```

#### 4. 服务器部署
1. 构建项目：`npm run build`
2. 将 `public` 目录上传到服务器
3. 配置 Web 服务器（Nginx/Apache）指向 `public` 目录

### 环境变量配置

创建 `.env.development` 和 `.env.production` 文件：

```env
# 站点配置
GATSBY_SITE_URL=https://your-domain.com
GATSBY_GOOGLE_ANALYTICS_ID=your-ga-id

# API 配置（如需要）
GATSBY_API_URL=your-api-url
```

### 自定义配置

- **站点信息**：编辑 `gatsby-config.js` 中的 `siteMetadata`
- **主题色彩**：修改 `src/styles/theme.js`
- **多语言内容**：编辑 `src/locales/index.js`
- **内容管理**：在 `content/` 目录下添加 Markdown 文件

### 性能优化

- 图片自动优化（gatsby-plugin-image）
- 代码分割和懒加载
- PWA 支持（离线缓存）
- SEO 优化（sitemap、robots.txt）
- 压缩和缓存策略
