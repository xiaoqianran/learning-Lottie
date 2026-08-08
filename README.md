# Lottie 实战学习

交互式中文 Lottie 教程：课程 + 测验 + Playground + 工坊 + 图鉴 + 组件库。

**在线访问：** [https://xiaoqianran.github.io/learning-Lottie/](https://xiaoqianran.github.io/learning-Lottie/)  
**仓库：** [https://github.com/xiaoqianran/learning-Lottie](https://github.com/xiaoqianran/learning-Lottie)  
结构与体验参考 [learning-vue3](https://github.com/xiaoqianran/learning-vue3)。

---

## 这是什么

面向想系统掌握 **Lottie**（JSON 矢量动画）接入 Web 的同学。以「读一点、动手一点、测一点」组织：

- **29 节课程**（讲解 + 代码 + 交互 Demo + 测验）
- **Demo · 代码即组件**：每个 live Demo 可展开对应源码（对齐 learning-vue3）
- **Playground**：预设 / 本地 JSON / URL、速度、方向、段落、renderer、scrub、markers
- **动画工坊**：八项闯关
- **模式图鉴** + **组件库 Kit**（点赞、四态、运行时改色）
- **学习中心 / 练习场 / 错题本 / 结业证明**

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、Live Demo + 对应源码、测验、笔记 |
| 首页 | `/` | 搜索、路径筛选、进度 |
| Playground | `/playground` | 播放实验台 |
| 动画工坊 | `/studio` | 八项闯关 |
| 模式图鉴 | `/gallery` | 产品模式速览 |
| 组件库 | `/kit` | 可复制组件 |
| 速查表 | `/cheatsheet` | API 一页纸 |
| 学习中心 | `/hub` | 打卡、收藏 |
| 练习场 | `/lab` | 综合抽题 |
| 错题本 | `/mistakes` | 错题回顾 |
| 结业 | `/certificate` | 全部完成后解锁 |

---

## 学习路径

| 路径 | 内容 |
|------|------|
| **基础** | 是什么、JSON、播放、速度、段落、事件 |
| **进阶** | 主题、markers、倒放、串联、运行时改色 |
| **交互** | hover、点击、scrub、多状态、滚动 |
| **工程** | a11y、性能、React、工作流、renderer、优化 |
| **实战** | 加载 UX、微交互、坑、清单、面试串讲 |
| **组件** | 点赞开关、异步四态槽 |

---

## 版本演进

| 版本 | 内容 |
|------|------|
| v1 | 19 课 + Demo + Playground + 工坊 + Pages |
| v2 | +6 课；Playground 2.0；7 关工坊；图鉴 |
| **v3** | Demo 源码对照；运行时改色；Kit 组件库；+4 课；8 关工坊 |

分支：`v1` / `v2` / `v3` 冻结；`main` 继续开发。标签：`v1.0.0` `v2.0.0` `v3.0.0`。

---

## 本地运行

```bash
git clone https://github.com/xiaoqianran/learning-Lottie.git
cd learning-Lottie
npm install
npm run dev
```

```bash
npm run build:pages  # GitHub Pages（base=/learning-Lottie/）
npm run typecheck
```

---

## 技术栈

React 19 · TanStack Start · Tailwind v4 · Zustand · lottie-web · GitHub Actions Pages

---

## 部署

推送 `main` → Actions **Deploy to GitHub Pages** →  
https://xiaoqianran.github.io/learning-Lottie/

Pages 源：**GitHub Actions**。

---

## 进度与隐私

进度在浏览器 localStorage，不上传服务器。结业证明非正式证书。

---

## 相关链接

- [learning-Lottie](https://xiaoqianran.github.io/learning-Lottie/)
- [learning-vue3](https://xiaoqianran.github.io/learning-vue3/)
- [Lottie](https://airbnb.io/lottie/)
