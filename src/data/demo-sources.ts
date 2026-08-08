import type { DemoKind } from "@/data/lessons";

export type DemoSource = {
  lang: string;
  title: string;
  code: string;
};

/** 每个交互 Demo 对应源码 — 与 live 区同一套逻辑 */
export const DEMO_SOURCES: Record<DemoKind, DemoSource> = {
  hello: {
    lang: "tsx",
    title: "最小播放",
    code: `import { useRef } from "react";
import { LottiePlayer } from "@/components/LottiePlayer";

export function Hello() {
  const ref = useRef(null);
  return (
    <>
      <LottiePlayer src="/animations/rocket.json" lottieRef={ref} />
      <button onClick={() => ref.current?.pause()}>暂停</button>
      <button onClick={() => ref.current?.play()}>播放</button>
    </>
  );
}`,
  },
  playback: {
    lang: "tsx",
    title: "play / pause / stop",
    code: `// loop={false} 播完会触发 complete
ref.current?.play()
ref.current?.pause()
ref.current?.stop()
ref.current?.goToAndPlay(0, true) // isFrame=true`,
  },
  "speed-loop": {
    lang: "tsx",
    title: "速度与循环",
    code: `const [speed, setSpeed] = useState(1)
const [loop, setLoop] = useState(true)

useEffect(() => {
  ref.current?.setSpeed(speed)
}, [speed])

<LottiePlayer key={String(loop)} loop={loop} lottieRef={ref} src={src} />`,
  },
  segments: {
    lang: "tsx",
    title: "playSegments",
    code: `// force=true 打断当前段落
ref.current?.playSegments([0, 30], true)
ref.current?.playSegments([30, 60], true)
ref.current?.playSegments([60, 90], true)`,
  },
  events: {
    lang: "tsx",
    title: "complete / loopComplete",
    code: `<LottiePlayer
  loop={false}
  onComplete={() => setLog("complete")}
  onLoopComplete={() => setLog("loopComplete")}
  src={src}
/>`,
  },
  hover: {
    lang: "tsx",
    title: "hover 播放",
    code: `<div
  onMouseEnter={() => ref.current?.play()}
  onMouseLeave={() => ref.current?.goToAndStop(0, true)}
  onFocus={() => ref.current?.play()}
  onBlur={() => ref.current?.goToAndStop(0, true)}
>
  <LottiePlayer lottieRef={ref} autoplay={false} loop={false} src={src} />
</div>
// 触屏务必提供 click 等价`,
  },
  "click-toggle": {
    lang: "tsx",
    title: "状态驱动切换",
    code: `const [on, setOn] = useState(false)

// 状态在 React；动画只是表现
<button onClick={() => setOn(v => !v)}>
  {on ? "已喜欢" : "点赞"}
</button>
{on && <LottiePlayer src={heart} loop={false} />}`,
  },
  "progress-scrub": {
    lang: "ts",
    title: "scrub 映射帧",
    code: `function scrub(ref, p: number, totalFrames: number) {
  const frame = Math.round(
    Math.min(1, Math.max(0, p)) * (totalFrames - 1)
  )
  ref.current?.goToAndStop(frame, true)
}

// <input type="range" onChange={e => scrub(ref, +e.target.value, 90)} />`,
  },
  theme: {
    lang: "tsx",
    title: "主题容器（示意）",
    code: `// 简单方案：容器 token 变色
// 真改 JSON fill → 见 recolor 课 + recolorLottieHex
<div className={themeRing}>
  <LottiePlayer src={pulse} />
</div>`,
  },
  "reduced-motion": {
    lang: "ts",
    title: "prefers-reduced-motion",
    code: `const reduce = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches

if (reduce) {
  ref.current?.goToAndStop(lastFrame, true)
} else {
  ref.current?.play()
}`,
  },
  "multi-state": {
    lang: "tsx",
    title: "四态切换",
    code: `type S = "idle" | "loading" | "success" | "error"
const [state, setState] = useState<S>("idle")

const src = {
  idle: pulse, loading, success, error
}[state]

<LottiePlayer key={state} src={src} loop={state==="loading"} />`,
  },
  "loading-ux": {
    lang: "tsx",
    title: "加载完成反馈",
    code: `const [phase, setPhase] = useState<"idle"|"load"|"done">("idle")

function start() {
  setPhase("load")
  setTimeout(() => setPhase("done"), 1600)
}

{phase === "load" && <LottiePlayer src={loading} />}
{phase === "done" && <LottiePlayer src={success} loop={false} />}`,
  },
  micro: {
    lang: "tsx",
    title: "微交互：点赞 + 庆祝",
    code: `{liked && <LottiePlayer src={heart} loop={false} />}
{celebrate && <LottiePlayer src={confetti} loop={false} />}
// 庆祝只留给关键节点，勿每次点击`,
  },
  "inspect-json": {
    lang: "ts",
    title: "读取元数据",
    code: `onDataReady={(m) => {
  // m.fr / m.frames / m.layers / m.markers
  setMeta(m)
}}`,
  },
  challenge: {
    lang: "txt",
    title: "上线自检清单",
    code: `□ 离屏 pause
□ loop 语义正确
□ reduced-motion 兜底
□ JSON 内容哈希
□ complete 推进业务状态`,
  },
  markers: {
    lang: "ts",
    title: "按 marker 名跳转",
    code: `function frameOf(markers, name: string) {
  const m = markers.find(x => x.cm === name)
  if (!m) throw new Error(name)
  return m.tm
}

ref.current?.goToAndStop(frameOf(markers, "half"), true)`,
  },
  direction: {
    lang: "ts",
    title: "正放 / 倒放",
    code: `function setOpen(open: boolean) {
  ref.current?.setDirection(open ? 1 : -1)
  ref.current?.play()
}`,
  },
  sequence: {
    lang: "ts",
    title: "complete 串联",
    code: `// load → ok → party
onComplete={() => {
  if (step === "ok") setStep("party")
  else if (step === "party") setStep("idle")
}}`,
  },
  "scroll-drive": {
    lang: "ts",
    title: "可见性驱动",
    code: `const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) ref.current?.play()
  else ref.current?.pause()
}, { threshold: 0.35 })

io.observe(el)
// unmount: io.disconnect()`,
  },
  renderer: {
    lang: "ts",
    title: "svg | canvas",
    code: `lottie.loadAnimation({
  container,
  renderer: "canvas", // or "svg"
  loop: true,
  autoplay: true,
  animationData,
})`,
  },
  optimize: {
    lang: "txt",
    title: "瘦身优先级",
    code: `1 删隐藏图层
2 少位图、压缩 assets
3 降 fr（UI 30fps 常够）
4 JSON 压缩 + 文件名哈希
5 离屏 pause；限制同屏实例`,
  },
  recolor: {
    lang: "ts",
    title: "运行时改色",
    code: `import { recolorLottieHex } from "@/lib/lottie-recolor"

const themed = recolorLottieHex(rawJson, "#6366f1")
// <LottiePlayer animationData={themed} />`,
  },
  "kit-like": {
    lang: "tsx",
    title: "LottieLikeToggle",
    code: `import { LottieLikeToggle } from "@/components/kit/LottieLikeToggle"

<LottieLikeToggle
  onChange={(liked) => console.log(liked)}
/>
// 状态在组件内；可受控扩展`,
  },
  "kit-async": {
    lang: "tsx",
    title: "LottieAsyncSlot",
    code: `import { LottieAsyncSlot } from "@/components/kit/LottieAsyncSlot"

<LottieAsyncSlot delayMs={1200} />
// idle → loading → success | error`,
  },
};

export function getDemoSource(kind: DemoKind): DemoSource {
  return DEMO_SOURCES[kind];
}
