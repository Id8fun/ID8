# Cloudflare Pages 部署配置说明

## 基本配置

### 框架预设
- **Framework preset**: `Gatsby`

### 构建设置
- **Build command**: `npm run build`
- **Build output directory**: `public`
- **Root directory**: `/` (项目根目录)

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
如果项目需要环境变量，可以在 Cloudflare Pages 的设置中添加：
- `NODE_VERSION`: `18` (推荐使用 Node.js 18)
- `NPM_VERSION`: `latest`

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

### 问题：Cannot find cwd: /opt/buildhome/repo/v4
**解决方案**：
- 检查 Root directory 设置是否正确
- 如果项目在根目录，设置为 `/`
- 如果项目在 `v4` 子目录，设置为 `/v4`

### 问题：构建失败
**检查项目**：
1. 确保 `package.json` 中有 `build` 脚本
2. 确保所有依赖都在 `package.json` 中正确声明
3. 检查 Node.js 版本兼容性

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

## 注意事项

1. **构建时间**：首次部署可能需要几分钟时间
2. **自动部署**：推送到 `main` 分支会自动触发重新部署
3. **预览部署**：推送到其他分支会创建预览部署
4. **自定义域名**：部署成功后可以在 Cloudflare Pages 设置中配置自定义域名

## 联系信息

如果遇到部署问题，请检查：
1. Cloudflare Pages 的构建日志
2. 项目的 `package.json` 配置
3. Gatsby 配置文件是否正确