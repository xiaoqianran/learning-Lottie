import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "JSON 字段",
    items: [
      { k: "v / fr", v: "版本 / 帧率" },
      { k: "ip / op", v: "入点 / 出点（帧）" },
      { k: "w / h", v: "画布尺寸" },
      { k: "layers", v: "图层时间轴与形状" },
      { k: "assets", v: "图片与预合成" },
      { k: "markers", v: "命名标记 { tm, cm }" },
      { k: "slots", v: "主题插槽（官方 theming）" },
    ],
  },
  {
    title: "播放控制 · lottie-web",
    items: [
      { k: "play / pause / stop", v: "基础控制" },
      { k: "goToAndPlay(f, true)", v: "跳帧并播" },
      { k: "goToAndStop(f, true)", v: "跳帧并停 · scrub" },
      { k: "setSpeed(n)", v: "倍速，默认 1" },
      { k: "setDirection(±1)", v: "正放 / 倒放" },
      { k: "playSegments([a,b], force)", v: "段落；force 打断" },
      { k: "destroy()", v: "卸载释放" },
    ],
  },
  {
    title: "DotLottie Web",
    items: [
      { k: "new DotLottie({canvas,src})", v: "核心构造" },
      { k: "mode", v: "forward | reverse | bounce" },
      { k: "layout.fit", v: "contain | cover | fill | …" },
      { k: "layout.align", v: "[x,y] 0–1" },
      { k: "themeId / setTheme", v: "运行时主题" },
      { k: "loadAnimation(id)", v: "多动画切换" },
      { k: "loadStateMachine + postEvent", v: "状态机" },
      { k: "DotLottieWorker", v: "卸主线程（async API）" },
      { k: "destroy()", v: "必须调用" },
    ],
  },
  {
    title: "事件",
    items: [
      { k: "data_ready / load", v: "资源就绪" },
      { k: "complete", v: "非循环播完" },
      { k: "loopComplete / loop", v: "循环一圈" },
      { k: "enterFrame / frame", v: "每帧 · 逻辑要轻" },
      { k: "loadError", v: "失败降级" },
      { k: "stateEntered / transition", v: "状态机事件" },
    ],
  },
  {
    title: "工程库",
    items: [
      { k: "@lottiefiles/dotlottie-web", v: "官方 Web 核心" },
      { k: "@lottiefiles/dotlottie-react", v: "React 封装" },
      { k: "@dotlottie/dotlottie-js", v: "程序化打包 .lottie" },
      { k: "@lottiefiles/relottie", v: "LAST AST 管线" },
      { k: "lottie-web / lottie-react", v: "经典路径" },
    ],
  },
  {
    title: "官方索引",
    items: [
      { k: "lottiefiles.com/llms.txt", v: "平台总索引" },
      { k: "developers…/llms.txt", v: "开发者索引" },
      { k: "…players-web-llms.txt", v: "Web 玩家全文" },
      { k: "mcp.lottiefiles.com/mcp", v: "远程 MCP" },
      { k: "Feature Support Checker", v: "跨端特性" },
      { k: "Lottie Simple License", v: "免费库许可" },
    ],
  },
  {
    title: "交互模式",
    items: [
      { k: "hover play", v: "触屏需 click 兜底" },
      { k: "state → segments", v: "应用 state 驱动段落" },
      { k: "scrub", v: "进度映射帧" },
      { k: "multi-state slot", v: "idle/load/ok/err" },
      { k: "markers by name", v: "告别魔法数字" },
      { k: "official SM", v: ".lottie 内状态机" },
      { k: "IO visibility", v: "离屏 pause / freeze" },
    ],
  },
  {
    title: "工程清单",
    items: [
      { k: "reduced-motion", v: "静态帧 / 静态图" },
      { k: "体积", v: "Optimizer · .lottie · 少位图" },
      { k: "缓存", v: "文件名带哈希" },
      { k: "表达式", v: "bake + hasExpressions 门禁" },
      { k: "许可", v: "来源与商用条款" },
      { k: "svg vs canvas", v: "先 SVG，重场景 canvas/Worker" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查 · v5
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          Lottie 速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          写代码时扫一眼。详细讲解见课程；官方全文见{" "}
          <Link
            to="/ecosystem"
            className="text-primary no-underline hover:underline"
          >
            生态地图
          </Link>
          。
        </p>
      </header>

      <div className="grid gap-4">
        {SECTIONS.map((sec) => (
          <section
            key={sec.title}
            className="overflow-hidden rounded-xl border border-border bg-surface"
          >
            <h2 className="border-b border-border bg-surface-2 px-4 py-2.5 font-display text-sm font-semibold text-fg">
              {sec.title}
            </h2>
            <ul className="divide-y divide-border">
              {sec.items.map((item) => (
                <li
                  key={item.k}
                  className="grid gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-4"
                >
                  <code className="font-mono text-xs text-primary">{item.k}</code>
                  <span className="text-sm text-muted">{item.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
