# 🌟 阳大壮AI智能助手

> 基于智谱GLM-4大语言模型的跨平台桌面智能对话应用

---

## 📝 项目简介

阳大壮AI智能助手是一款基于智谱GLM-4大语言模型的桌面端智能对话应用，支持多轮对话、知识问答、代码生成等多种场景，致力于为用户带来极致的AI交互体验。

---

## 🚀 主要特性

- 🤖 **智能对话**：基于GLM-4模型，支持多轮上下文理解
- ⚡ **高性能**：响应速度快，体验流畅
- 📚 **知识广博**：覆盖科技、文化、艺术等多个领域
- 💡 **创新思维**：助力创意激发与问题解决
- 🖥️ **桌面端**：Electron跨平台支持，Windows/Linux
- 🛡️ **安全隔离**：前后端隔离，数据安全

---

## 🛠️ 技术栈

- 前端：React 18 + Ant Design 5 + Vite
- 后端/服务：Electron 35
- 语言模型：智谱GLM-4（API调用）
- 其他：TypeScript、Axios、React Router、React Markdown、高亮代码块

---

## ⚡ 快速开始

1. **克隆项目**


2. **安装依赖**

   ```bash
   npm install
   ```

3. **本地开发**

   ```bash
   npm run electron:dev
   ```
   > 前端和Electron主进程将自动启动，访问 http://localhost:5173

4. **打包发布**

   ```bash
   npm run electron:build
   ```
   > 打包产物在 `release/` 目录下

---

## 📁 目录结构

```
├── src/                # 前端源码
│   ├── pages/          # 页面组件（Home, Chat等）
│   ├── services/       # API服务（GLM-4接口）
│   └── ...
├── electron/           # Electron主进程代码
├── public/             # 静态资源（头像、图标等）
├── dist/               # 前端打包输出
├── release/            # 应用打包产物
├── package.json        # 项目配置
├── vite.config.ts      # Vite配置
└── ...
```

---

## 🙏 鸣谢

- [智谱AI GLM-4](https://open.bigmodel.cn/) 提供强大的大语言模型API
- [Ant Design](https://ant.design/) 优秀的UI组件库
- [Electron](https://www.electronjs.org/) 跨平台桌面支持

---

> © 2024 阳子
