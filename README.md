# Lottie 实战学习

交互式中文 Lottie 教程：课程 + 实时 Demo + 测验 + Playground + 动画工坊。

结构与体验参考 [learning-vue3](https://github.com/xiaoqianran/learning-vue3)。

---

## 这是什么

面向想系统掌握 **Lottie**（JSON 矢量动画）接入 Web 的同学。以「读一点、动手一点、测一点」组织：

- **19 节课程**：基础 → 进阶 → 交互 → 工程 → 实战
- **交互 Demo**：play/pause、段落、事件、hover、点赞、scrub、四态、reduced-motion…
- **Playground**：预设动画 + 自定义 URL + 速度/loop
- **动画工坊**：四项闯关练手
- **学习中心 / 练习场 / 错题本 / 结业证明**

技术栈：React 19 + TanStack Start + Tailwind v4 + `lottie-react`。

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、代码、Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度 |
| Playground | `/playground` | 实时播放实验台 |
| 动画工坊 | `/studio` | 闯关任务 |
| 速查表 | `/cheatsheet` | API 与模式一页纸 |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合抽题 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 全部完成后解锁 |

---

## 学习路径

| 路径 | 内容 |
|------|------|
| **基础** | 是什么、JSON、播放、速度循环、段落、事件 |
| **进阶** | 主题色思路 |
| **交互** | hover、点击状态、scrub、多状态 |
| **工程** | a11y、性能、React 集成、工作流 |
| **实战** | 加载 UX、微交互、常见坑、上线清单 |

---

## 本地开发

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run typecheck
```

GitHub Pages 构建（设置 base）：

```bash
npm run build:pages
```

---

## 许可证

学习项目，动画资源来自公开 Lottie 样例与本地生成几何动画，仅供教学演示。
