# Lottie 实战学习

交互式中文 Lottie 教程：课程 + 测验 + 进度 + Playground + 动画工坊。

**在线访问：** [https://xiaoqianran.github.io/learning-Lottie/](https://xiaoqianran.github.io/learning-Lottie/)  
**仓库：** [https://github.com/xiaoqianran/learning-Lottie](https://github.com/xiaoqianran/learning-Lottie)  
结构与体验参考 [learning-vue3](https://github.com/xiaoqianran/learning-vue3)。

---

## 这是什么

面向想系统掌握 **Lottie**（JSON 矢量动画）接入 Web 的同学。内容以「读一点、动手一点、测一点」组织，而不是纯文档站。

你可以：

- 按路径学完 **19 节** 课程（**讲解 + 代码 + 交互 Demo + 小测验**）
- 在 **Playground** 里切换预设、调速度 / loop、加载自定义 JSON
- 在 **动画工坊** 里完成播放控制、点赞、四态、scrub 闯关
- 用 **速查表** 复习，用 **学习中心 / 错题本 / 结业证明** 跟进度

> 说明：本站用 React + TanStack Start 承载教学内容；动画运行时为 `lottie-web`（经封装的 `LottiePlayer`）。

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、代码、Live Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度条 |
| Playground | `/playground` | 预设 + 自定义 URL + 速度 / loop |
| 动画工坊 | `/studio` | 四项闯关练手 |
| 速查表 | `/cheatsheet` | API 与模式一页纸 |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合抽题 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 全部完成后解锁 |

---

## 学习路径（5 条）

| 路径 | 你学到什么 |
|------|------------|
| **基础** | 是什么、JSON、播放、速度循环、段落、事件 |
| **进阶** | 主题色思路 |
| **交互** | hover、点击状态、scrub、多状态 |
| **工程** | a11y、性能、React 集成、工作流 |
| **实战** | 加载 UX、微交互、常见坑、上线清单 |

建议顺序：

```text
基础 → 交互 → 进阶 → 工程 → 实战 → 工坊闯关 → 自己的作品
```

---

## 版本演进

| 版本 | 内容 |
|------|------|
| v1 | 19 课 + Demo + Playground + 工坊 + 学习中心 |
| v1.1 | GitHub Pages（Actions）+ base 资源路径修正 |

---

## 本地运行

环境：Node 22+ 推荐。

```bash
git clone https://github.com/xiaoqianran/learning-Lottie.git
cd learning-Lottie
npm install
npm run dev
```

开发服务默认：`http://127.0.0.1:8080`（绑定 `0.0.0.0:8080`）。

常用脚本：

```bash
npm run dev          # 开发
npm run build        # 生产构建（Vercel / Node）
npm run build:pages  # GitHub Pages 静态构建
npm run typecheck    # TypeScript 检查
```

GitHub Pages 静态构建会设置 `GITHUB_PAGES=true`，`base` 为 `/learning-Lottie/`。

---

## 技术栈

- **界面与路由：** React 19、TanStack Start / Router、Vite
- **样式：** Tailwind CSS v4
- **状态：** Zustand（学习进度持久化）
- **动画：** `lottie-web` + `lottie-react` 类型
- **部署：** GitHub Actions → GitHub Pages

---

## 目录结构（简要）

```text
src/
  data/lessons.ts          # 全部课程内容
  data/animations.ts       # 本地动画资源映射
  components/LottiePlayer.tsx
  components/demos/        # 交互 Demo
  routes/                  # 页面路由
  store/progress.ts        # 学习进度
public/animations/         # Lottie JSON
.github/workflows/         # Pages 部署
```

---

## 部署

推送到 `main` 后，Actions 工作流 **Deploy to GitHub Pages** 会构建并发布。

- Pages 源：**GitHub Actions**
- 站点：`https://xiaoqianran.github.io/learning-Lottie/`

也可在 Actions 页手动 **Run workflow**。

---

## 进度与隐私

- 学习进度、笔记、错题、工坊数据保存在 **浏览器 localStorage**
- 不上传到服务器；清站点数据会丢失进度
- 结业证明为本地成就展示，**非正式官方证书**

---

## 许可证与声明

- 教程内容用于学习与演示
- 动画资源来自公开 Lottie 样例与本地几何动画，仅供教学
- Lottie / Airbnb 等相关商标归各自所有者
- 欢迎提 Issue / PR 纠错与补充

---

## 相关链接

- 在线课站：[learning-Lottie](https://xiaoqianran.github.io/learning-Lottie/)
- 参考课站：[learning-vue3](https://xiaoqianran.github.io/learning-vue3/)
- 仓库：[xiaoqianran/learning-Lottie](https://github.com/xiaoqianran/learning-Lottie)
- Lottie 文档：[https://airbnb.io/lottie/](https://airbnb.io/lottie/)
