# Lottie 实战学习

交互式中文 Lottie / **dotLottie** 教程：课程 + 测验 + Playground + 工坊 + 图鉴 + 组件库 + **官方生态地图**。

**在线：** [https://xiaoqianran.github.io/learning-Lottie/](https://xiaoqianran.github.io/learning-Lottie/)  
**AI 索引：** [llms.txt](https://xiaoqianran.github.io/learning-Lottie/llms.txt) · [llms-full.txt](https://xiaoqianran.github.io/learning-Lottie/llms-full.txt)  
**仓库：** [xiaoqianran/learning-Lottie](https://github.com/xiaoqianran/learning-Lottie)

对标官方六份 llms：

| 源 | URL |
|----|-----|
| 平台 | [lottiefiles.com/llms.txt](https://lottiefiles.com/llms.txt) |
| 开发者 | [developers…/llms.txt](https://developers.lottiefiles.com/llms.txt) |
| Web 玩家 | [dotlottie-players-web-llms.txt](https://developers.lottiefiles.com/dotlottie-players-web-llms.txt) |
| Mobile 玩家 | [dotlottie-players-mobile-llms.txt](https://developers.lottiefiles.com/dotlottie-players-mobile-llms.txt) |
| dotLottie-JS | [dotlottiejs-llms.txt](https://developers.lottiefiles.com/dotlottiejs-llms.txt) |
| reLottie | [relottie-llms.txt](https://developers.lottiefiles.com/relottie-llms.txt) |

另： [Lottie Docs](https://lottiefiles.github.io/lottie-docs/) · [dotLottie](https://dotlottie.io/) · [MCP](https://docs.lottiefiles.com/en/platform/mcp)

---

## 覆盖面（对标官网）

| 维度 | 本站 |
|------|------|
| 格式 | JSON 字段、图层 ty、markers、slots、LAC vs 全 schema |
| 运行时 | `lottie-web` + `@lottiefiles/dotlottie-web` · layout · mode · Worker |
| 交互 | 手写状态 + 官方 State Machine |
| 主题 | 工程 recolor + 官方 theming/slots |
| 工具链 | Creator/Editor/Optimizer/转换器/插件 |
| 工程库 | dotLottie-JS 打包 · reLottie LAST |
| 跨端 | Web/iOS/Android/RN + 框架封装/CDN |
| AI | 官方 MCP · 六份 llms · 本站 llms |
| 合规 | Simple License · 商用检查清单 |

---

## 功能

| 模块 | 路径 |
|------|------|
| 课程 | `/lesson/:slug`（50 课级 · Demo · 代码即组件） |
| Playground | `/playground` |
| 工坊 | `/studio` |
| 图鉴 | `/gallery` |
| 组件库 | `/kit` |
| **官方生态** | `/ecosystem` |
| 速查 / 中心 / 练习 / 错题 / 结业 | `/cheatsheet` 等 |

---

## 版本

| 版本 | 内容 |
|------|------|
| v1 | 基础课 + Pages |
| v2 | markers / Playground 2 / 图鉴 |
| v3 | 代码即组件 / recolor / Kit |
| v4 | 官方 llms 对齐 · dotLottie 玩家 · 状态机/主题/跨端 |
| **v5** | 六份官方 llms 全覆盖 · MCP · reLottie · dotLottie-JS · 许可/工具/集成 |

分支 `v1`–`v5` 冻结；`main` 继续迭代。

---

## 本地

```bash
npm install
npm run dev
npm run build:pages
```

---

## 声明

教学站，非 LottieFiles 官方产品。规范与 API 以官方文档为准。
