---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304602210091c19bcf16cce0a98e192e14971c83a8f0551ae12d3d0bee8e60a6cfe6ef8fec022100d3ffc0ff267d2caea7226ddde3734b45b5f46215c2d675c8102052524e1aa5ca
    ReservedCode2: 304402205eb1b4bb9b2ce89436ab1a4db4b0b8a829a9fa8da905a2cb8de0f78670ffcc88022060e3b9ded20d3c4b7e2e620778664d8ea8662a0963e4df67101aab35c4d607d3
---

# MiniWeb Host - HTML 应用托管平台

一个用于托管和分享 HTML 应用的平台，支持微信分享、用户管理和应用预览。

## 功能特性

- **用户认证**: 基于 Supabase 的邮箱注册登录和 GitHub OAuth
- **应用管理**: 上传、预览、编辑和删除 HTML 应用
- **微信分享**: 生成分享链接和二维码，兼容微信内置浏览器
- **应用预览**: 仪表盘内实时预览托管的 HTML 应用

## 技术栈

- **前端**: Next.js 14 (React), Tailwind CSS
- **后端/BaaS**: Supabase (PostgreSQL, Auth, Storage)
- **部署**: Vercel

## 部署到 Vercel

### 前提条件

1. 一个 [Supabase](https://supabase.com) 项目
2. 一个 [GitHub](https://github.com) 账号
3. 一个 [Vercel](https://vercel.com) 账号

### 步骤 1: 配置 Supabase

1. 登录 [Supabase](https://supabase.com) 控制台
2. 创建一个新项目
3. 在 **SQL Editor** 中运行 `supabase-setup.sql` 文件中的 SQL 语句
4. 在 **Project Settings > API** 中获取：
   - Project URL
   - `anon` / `public` Key

### 步骤 2: 推送到 GitHub

```bash
# 初始化 Git 仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 创建 GitHub 仓库并推送
# （在 GitHub 上创建仓库后执行以下命令）
git remote add origin https://github.com/你的用户名/miniweb-host.git
git branch -M main
git push -u origin main
```

### 步骤 3: 部署到 Vercel

1. 登录 [Vercel](https://vercel.com)
2. 点击 "Add New..." > "Project"
3. 导入你的 GitHub 仓库
4. 在 **Environment Variables** 中添加：
   - `NEXT_PUBLIC_SUPABASE_URL`: 你的 Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 你的 Supabase anon key
5. 点击 "Deploy"

## 本地开发

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
miniweb-host/
├── app/                    # Next.js App Router
│   ├── dashboard/         # 用户仪表盘
│   ├── login/             # 登录页面
│   ├── register/          # 注册页面
│   ├── view/[id]/         # 公开查看页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
├── lib/                   # 工具函数
│   ├── supabase.ts        # Supabase 客户端
│   ├── supabase-server.ts # 服务端 Supabase
│   └── types.ts           # TypeScript 类型
├── public/                # 静态资源
└── supabase-setup.sql     # 数据库初始化脚本
```

## 微信分享说明

分享的链接格式为: `https://你的域名/view/[app-id]`

在微信中打开时：
- 如果检测到微信浏览器，会显示提示引导用户在外部浏览器打开
- 分享的页面经过优化，防止缩放和布局错乱

## 许可证

MIT License
