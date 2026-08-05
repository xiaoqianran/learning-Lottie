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
    ],
  },
  {
    title: "播放控制",
    items: [
      { k: "play / pause / stop", v: "基础控制" },
      { k: "goToAndPlay(f, true)", v: "跳帧并播（isFrame）" },
      { k: "goToAndStop(f, true)", v: "跳帧并停 · scrub" },
      { k: "setSpeed(n)", v: "倍速，默认 1" },
      { k: "setDirection(±1)", v: "正放 / 倒放" },
      { k: "playSegments([a,b], force)", v: "段落；force 打断当前" },
    ],
  },
  {
    title: "事件",
    items: [
      { k: "DOMLoaded / data_ready", v: "资源就绪" },
      { k: "complete", v: "非循环播完" },
      { k: "loopComplete", v: "循环一圈" },
      { k: "enterFrame", v: "每帧 · 逻辑要轻" },
    ],
  },
  {
    title: "React",
    items: [
      { k: "lottie-react", v: "封装 lottie-web" },
      { k: "lottieRef", v: "拿到实例方法" },
      { k: "SSR", v: "客户端挂载 / dynamic ssr:false" },
      { k: "animationData", v: "对象；也可 path/fetch" },
    ],
  },
  {
    title: "交互模式",
    items: [
      { k: "hover play", v: "触屏需 click 兜底" },
      { k: "state → segments", v: "应用 state 驱动段落" },
      { k: "scrub", v: "进度映射帧" },
      { k: "multi-state slot", v: "idle/load/ok/err 换源或段落" },
    ],
  },
  {
    title: "工程",
    items: [
      { k: "reduced-motion", v: "静态帧 / 静态图" },
      { k: "IntersectionObserver", v: "离屏 pause" },
      { k: "体积", v: "清图层 · 少位图 · 压缩 JSON" },
      { k: "缓存", v: "文件名带哈希" },
      { k: "卸载", v: "destroy / 停动画" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          Lottie 速查表
        </h1>
        <p className="mt-2 text-sm text-muted">
          写代码时扫一眼。详细讲解见课程；动手见{" "}
          <Link
            to="/playground"
            className="text-primary no-underline hover:underline"
          >
            Playground
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
                  className="grid gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-4"
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
