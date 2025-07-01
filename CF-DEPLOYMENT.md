# Cloudflare Pages 部署配置说明

本文档详细说明了如何在 Cloudflare Pages 上部署 Gatsby 项目的完整配置和最佳实践。

## 基本配置

### 框架预设

- **Framework preset**: `Gatsby`
- **版本要求**: Gatsby 3.x 或更高版本
- **Node.js 版本**: 推荐 18.x LTS（**重要：不要使用 14.x，会导致语法错误**）

### 构建设置

- **Build command**: `npm run build`
- **Build output directory**: `public`
- **Root directory**: `/` (项目根目录)
- **Install command**: `npm install --legacy-peer-deps` ⚠️ **必须手动设置**

### 🚨 关键配置步骤（必须执行）

**部署失败的主要原因：Cloudflare Pages 使用默认的 `npm install` 而不是 `npm install --legacy-peer-deps`**

**必须在 Cloudflare Pages 控制台中手动配置安装命令**：

1. **登录 Cloudflare Pages 控制台**
2. **选择您的项目** → Settings
3. **进入构建配置** → Build & deployments → **Edit configuration**
4. **设置安装命令**：在 "Install command" 字段中输入：
   ```
   npm install --legacy-peer-deps
   ```
5. **保存并重新部署**

**验证配置正确**：部署日志应显示 `Installing project dependencies: npm install --legacy-peer-deps` 而不是 `npm install --progress=false`

⚠️ **如果跳过此步骤，部署将因 ERESOLVE 依赖冲突错误而失败**

## 详细配置说明

### 1. 构建命令 (Build Command)

```bash
npm run build
```

这个命令会执行 `gatsby build`，生成静态网站文件。

### 2. 构建输出目录 (Build Output Directory)

```
public
```

Gatsby 构建后的静态文件会输出到 `public` 目录。

### 3. 环境变量 (Environment Variables)

在 Cloudflare Pages 的设置中可以添加以下环境变量：

#### 必需的环境变量

- `NODE_VERSION`: `18` (推荐使用 Node.js 18 LTS，**避免使用 14.x**)
- `NPM_VERSION`: `latest`

#### 可选的环境变量

- `GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES`: `true` (启用增量构建)
- `GATSBY_CPU_COUNT`: `2` (限制 CPU 使用)
- `NODE_OPTIONS`: `--max-old-space-size=4096` (增加内存限制)
- `GATSBY_TELEMETRY_DISABLED`: `1` (禁用遥测)

#### 生产环境变量

- `NODE_ENV`: `production` (自动设置)
- `GATSBY_ACTIVE_ENV`: `production`

### 4. 根目录设置

- 如果代码在仓库根目录：设置为 `/`
- 如果代码在子目录（如 `v4`）：设置为 `/v4`

## 部署流程

1. **连接 GitHub 仓库**

   - 在 Cloudflare Pages 中选择 "Connect to Git"
   - 选择 GitHub 仓库：`lyrick/Id8`
   - 选择分支：`main`

2. **配置构建设置**

   - Framework preset: `Gatsby`
   - Build command: `npm run build`
   - Build output directory: `public`
   - Root directory: `/`

3. **部署**
   - 点击 "Save and Deploy"
   - Cloudflare Pages 会自动开始构建和部署

## 常见问题解决

### 问题 1：SyntaxError: Unexpected token '??='

**原因**: Node.js 版本过低（如 14.16.0），不支持空值合并赋值运算符 `??=`
**解决方案**：

1. 在 Cloudflare Pages 环境变量中设置 `NODE_VERSION`: `18`
2. 删除项目根目录的 `.nvmrc` 文件，或将其内容改为 `18`
3. 重新部署项目

### 问题 2：Cannot find cwd: /opt/buildhome/repo/v4

**原因**: Root directory 配置错误
**解决方案**：

1. 登录 Cloudflare Pages 控制台
2. 进入项目设置 → Build & deployments
3. 点击 "Edit configuration"
4. 将 Root directory 从 `/v4` 改为 `/`
5. 保存并重新部署

### 问题 2：构建超时或内存不足

**解决方案**：

1. 添加环境变量 `NODE_OPTIONS`: `--max-old-space-size=4096`
2. 优化 Gatsby 配置，启用增量构建
3. 减少并发构建进程：`GATSBY_CPU_COUNT`: `1`

### 问题 3：依赖版本冲突错误

**错误信息**: `ERESOLVE unable to resolve dependency tree` 或 `peer gatsby@"^5.2.0" from gatsby-plugin-react-i18next@3.0.1`
**原因**: `gatsby-plugin-react-i18next@3.0.1` 要求 Gatsby 5.x，但项目使用的是 Gatsby 3.x
**解决方案**：

1. **在 Cloudflare Pages 中设置安装命令**（推荐）：

   - 进入项目设置 → Build & deployments → Edit configuration
   - Install command: `npm install --legacy-peer-deps`
   - 保存并重新部署

2. **或者在环境变量中添加**：

   - `NPM_CONFIG_LEGACY_PEER_DEPS`: `true`

3. **或者修改构建命令为**：`npm install --legacy-peer-deps && npm run build`

4. **本地修复依赖冲突**：
   ```bash
   # 删除 lockfile 和 node_modules
   rm yarn.lock package-lock.json
   rm -rf node_modules
   # 使用 npm 重新安装依赖
   npm install --legacy-peer-deps
   # 提交新的 lockfile
   git add package-lock.json
   git commit -m "Update package-lock.json to resolve dependency conflicts"
   ```

### 问题 4：依赖安装失败

**检查项目**：

1. 确保 `package.json` 和 `yarn.lock`/`package-lock.json` 同步
2. 检查依赖版本兼容性
3. 清理 node_modules 后重新安装

### 问题 5：GraphQL 查询错误

**解决方案**：

1. 检查 `gatsby-config.js` 中的插件配置
2. 确保所有 markdown 文件格式正确
3. 验证 frontmatter 字段一致性

### 问题 6：静态资源加载失败

**解决方案**：

1. 检查 `static` 目录结构
2. 确保图片路径正确
3. 验证 `gatsby-config.js` 中的 `pathPrefix` 设置

## 项目结构

```
项目根目录/
├── package.json          # 包含构建脚本和依赖
├── gatsby-config.js      # Gatsby 配置文件
├── gatsby-node.js        # Gatsby Node API
├── src/                  # 源代码目录
├── content/              # 内容文件
├── static/               # 静态资源
└── public/               # 构建输出目录（自动生成）
```

## 性能优化建议

### 1. 构建优化

- 启用增量构建：`GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true`
- 使用 Gatsby Cloud 缓存策略
- 优化图片处理：使用 `gatsby-plugin-image`

### 2. 部署优化

- 启用 Cloudflare 的自动缩小功能
- 配置适当的缓存策略
- 使用 Cloudflare 的图片优化服务

### 3. 监控和分析

- 启用 Cloudflare Analytics
- 配置 Core Web Vitals 监控
- 设置部署通知

## 高级配置

### 自定义构建脚本

```json
{
  "scripts": {
    "build": "gatsby build",
    "build:production": "gatsby build --prefix-paths",
    "clean": "gatsby clean"
  }
}
```

### Headers 配置

创建 `_headers` 文件在 `static` 目录下：

```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/static/*
  Cache-Control: public, max-age=31536000, immutable
```

### 重定向配置

创建 `_redirects` 文件在 `static` 目录下：

```
# 重定向旧路径
/old-path/* /new-path/:splat 301

# SPA 回退
/* /index.html 200
```

## 注意事项

1. **构建时间**：首次部署可能需要 5-10 分钟
2. **自动部署**：推送到 `main` 分支会自动触发重新部署
3. **预览部署**：推送到其他分支会创建预览部署
4. **自定义域名**：部署成功后可以在 Cloudflare Pages 设置中配置自定义域名
5. **SSL 证书**：Cloudflare 会自动提供 SSL 证书
6. **CDN 缓存**：全球 CDN 分发，提高访问速度

## 故障排除清单

### 部署前检查

- [ ] `package.json` 包含正确的构建脚本
- [ ] 所有依赖都已正确安装
- [ ] Gatsby 配置文件语法正确
- [ ] 环境变量已正确设置
- [ ] Git 仓库已推送最新代码

### 部署失败时检查

1. **查看构建日志**：Cloudflare Pages → 项目 → 部署历史
2. **检查错误信息**：重点关注 npm install 和 gatsby build 阶段
3. **验证配置**：确认 Root directory、Build command 等设置
4. **本地测试**：在本地运行 `npm run build` 确保无误

### 性能问题排查

1. **构建时间过长**：检查依赖大小，优化构建配置
2. **页面加载慢**：启用 Cloudflare 优化功能
3. **内存不足**：调整 NODE_OPTIONS 环境变量

## 有用的链接

- [Cloudflare Pages 官方文档](https://developers.cloudflare.com/pages/)
- [Gatsby 部署指南](https://www.gatsbyjs.com/docs/deploying-to-cloudflare-pages/)
- [Cloudflare Pages GitHub 集成](https://developers.cloudflare.com/pages/get-started/)
- [性能优化最佳实践](https://developers.cloudflare.com/pages/platform/)

## 联系信息

如果遇到部署问题，请按以下顺序检查：

1. **构建日志**：Cloudflare Pages 控制台中的详细日志
2. **项目配置**：`package.json`、`gatsby-config.js` 等配置文件
3. **环境变量**：确保所有必需的环境变量已设置
4. **本地构建**：在本地环境中复现问题
5. **社区支持**：Cloudflare 社区论坛和 Gatsby 官方文档
