# HstarOrg 官网 - Claude Code 任务清单

## 项目概述

基于 Astro + Tailwind CSS 构建个人/组织官网，用于展示产品列表。部署到 GitHub Pages，仓库名 `hstarorg.github.io`，自定义域名 `hstar.org`。

**设计风格**：暗色科技风（zinc-950 底色），强调色用 emerald/cyan 渐变。简洁现代，响应式。

---

## Task 1：项目初始化

使用 `npm create astro@latest` 创建项目，选择空模板（Empty）。安装依赖：

```bash
pnpm create astro@latest hstarorg.github.io -- --template minimal
cd hstarorg.github.io
pnpm astro add tailwind
```

配置 `astro.config.mjs`：
- `site`: `'https://hstar.org'`
- `output`: `'static'`
- 集成 tailwind

---

## Task 2：定义产品内容集合

创建 `src/content.config.ts`，定义 products 集合的 schema：

```typescript
// 字段：
// title: string (必填)
// description: string (一句话描述，必填)
// image: string (截图路径如 /images/xxx.png，必填)
// demoUrl: string url (在线演示链接，可选)
// repoUrl: string url (GitHub 仓库链接，可选)
// tags: string[] (技术栈标签如 ["Node.js", "SQLite"]，必填)
// order: number (排序权重，越小越靠前，默认 0)
```

在 `src/content/products/` 下创建 2 个示例产品 `.md` 文件：

**site1.md**:
- title: "Site1"
- description: "一个轻量级的 Web 工具服务"
- image: "/images/site1.png"
- demoUrl: "http://site1.hstar.org:4797/"
- repoUrl: "https://github.com/hstarorg/site1"
- tags: ["Node.js", "SQLite", "Express"]
- order: 1

**mmp.md**:
- title: "MMP"
- description: "多媒体处理工具"
- image: "/images/mmp.png"
- repoUrl: "https://github.com/hstarorg/mmp"
- tags: ["TypeScript", "FFmpeg"]
- order: 2

在 `public/images/` 下放置对应的占位图片（可以先用 placeholder）。

---

## Task 3：通用布局 + Header + Footer

**`src/layouts/Base.astro`**：
- HTML lang="zh-CN"
- meta description, viewport, favicon
- body: `min-h-screen bg-zinc-950 text-zinc-100 antialiased`
- 包含 Header 和 Footer 组件，中间 `<slot />`

**`src/components/Header.astro`**：
- sticky top, 半透明毛玻璃背景 (`bg-zinc-950/80 backdrop-blur-lg`)
- 左侧 logo 文字 "HstarOrg"，链接到首页
- 右侧导航：产品（锚点 #products）、GitHub（外链到 https://github.com/hstarorg）
- 移动端适配（小屏幕下导航保持简单一行即可，不需要汉堡菜单）

**`src/components/Footer.astro`**：
- 简洁底部，居中文字：© 2025 HstarOrg · 上方一条 zinc-800 分割线
- 可带 GitHub 链接

---

## Task 4：Hero 首屏组件

**`src/components/Hero.astro`**：
- 大标题，部分文字用 emerald→cyan 渐变色（`bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent`）
- 副标题：一句话介绍，zinc-400 色
- 两个按钮："浏览产品"（emerald 实心，锚点到 #products）和 "GitHub →"（边框按钮，外链）
- 背景：一个大的模糊光斑装饰（absolute, emerald-500/8, blur-3xl）
- 响应式：移动端标题 text-4xl，桌面端 text-5xl

---

## Task 5：ProductCard 产品卡片组件

**`src/components/ProductCard.astro`**：

Props 接收单个产品的数据（title, description, image, demoUrl, repoUrl, tags）。

卡片设计：
- 圆角卡片，背景 `bg-zinc-900/50`，边框 `border border-zinc-800`
- hover 时边框变亮 `hover:border-zinc-600`，整体上移 `hover:-translate-y-1`，加 transition
- 顶部：产品截图区域，`aspect-video` 比例，`object-cover`，圆角裁切，图片不存在时显示 zinc-800 占位背景
- 中间：产品名称（text-lg font-semibold 白色）+ 一句话描述（text-sm zinc-400）
- 标签区域：flex wrap，每个标签是小药丸（`bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded-full`）
- 底部：操作链接区域，横排显示
  - 如果有 demoUrl：显示"在线演示 ↗"链接
  - 如果有 repoUrl：显示"源码 ↗"链接
  - 链接样式：text-sm，默认 zinc-400，hover 变 emerald-400

---

## Task 6：首页组装

**`src/pages/index.astro`**：

1. 使用 Base 布局
2. 引入 Header、Hero、Footer
3. 从 content collections 获取所有产品，按 order 字段排序
4. 产品列表区域：
   - `id="products"` 锚点
   - 区域标题"产品"或"Projects"，居中，text-2xl
   - 网格布局：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
   - 遍历产品数据，渲染 ProductCard
5. 整体 max-w-6xl 居中，padding 合理

---

## Task 7：GitHub Pages 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

在仓库根目录创建 `public/CNAME` 文件，内容为：
```
hstar.org
```

---

## Task 8：完善细节

- 确保 `pnpm build` 无报错，本地 `pnpm dev` 能正常预览
- 确保移动端显示正常（卡片单列）
- 图片懒加载：img 标签加 `loading="lazy"`
- 产品截图如果暂时没有，用一个美观的占位 div（带产品名首字母和渐变背景）替代

---

## 加新产品的流程

以后要加新产品，只需：

1. 在 `src/content/products/` 下新建一个 `.md` 文件
2. 填写 frontmatter（title, description, image, tags 等）
3. 把截图放到 `public/images/`
4. push 到 main，GitHub Actions 自动构建部署