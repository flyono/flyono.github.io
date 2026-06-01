# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flyono Base — 个人博客与文档站点，基于 Next.js 16 + Fumadocs 构建，静态导出部署至 GitHub Pages。内容为中文为主。

## Commands

- `npm run dev` — 启动开发服务器
- `npm run build` — 构建静态站点（输出到 `./out`）
- `npm run types:check` — 完整类型检查（fumadocs-mdx 生成 → next typegen → tsc --noEmit）
- `npm run start` — 启动生产服务器

无 ESLint、Prettier、测试框架配置。

## Architecture

### 技术栈

- Next.js 16 (App Router) + React 19
- Fumadocs (core/ui/mdx) — 文档/博客框架
- Tailwind CSS v4 — 通过 `@tailwindcss/postcss` 配置，无 `tailwind.config.*` 文件，主题在 `app/global.css` 的 `@theme` 中定义
- TypeScript 6（strict mode）
- 静态导出（`output: 'export'`），`images.unoptimized: true`

### 路由结构

```plaintext
app/
  (home)/           — 首页（路由组，无 URL 段）
  docs/[[...slug]]  — 文档页，内容来自 content/docs/
  blogs/[[...slug]] — 博客页，内容来自 content/blogs/
  api/search/       — Orama 搜索 API
  og/docs/[...slug] — OG 图片生成
  llms.txt/         — LLM 友好文本路由
  llms-full.txt/    — 完整内容文本路由
```

### 内容管理

- MDX 文件存放在 `content/docs/` 和 `content/blogs/`
- `source.config.ts` 定义两个 collection（`docs` 和 `blogs`），使用 `defineDocs()`
- 博客 frontmatter 包含 `title`、`description`、`created` 字段
- `.source/` 目录为 fumadocs-mdx 自动生成的类型化 collection（gitignored）

### 关键文件

- `lib/source.ts` — docs 内容源，base URL `/docs`
- `lib/blogs-source.ts` — blogs 内容源，base URL `/blogs`
- `lib/shared.ts` — 全局配置（app name、路由常量、GitHub 信息）
- `lib/layout.shared.tsx` — fumadocs 布局共享配置（`baseOptions()`）
- `lib/cn.ts` — `tailwind-merge` 的 `cn` 工具函数
- `components/mdx.tsx` — MDX 组件合并（fumadocs 默认 + 自定义覆盖）
- `proxy.ts` — 内容协商中间件，支持 `.md` 后缀和 markdown 偏好请求

### 组件约定

- 页面级组件放在 `app/<route>/_components/` 目录（下划线前缀表示非路由）
- 共享组件放在顶层 `components/` 目录
- 类名合并使用 `cn()`（来自 `lib/cn.ts`），不要手动拼接 className

### 部署

- GitHub Actions (`.github/workflows/deploy.yml`)
- 触发：push 到 `master` 分支
- Node 22，`npm ci` → `npm run build` → 部署 `./out` 到 GitHub Pages
