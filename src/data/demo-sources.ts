import type { DemoKind } from "@/data/lessons";

export type DemoSource = {
  lang: string;
  title: string;
  code: string;
};

const DEMO_SOURCES: Record<DemoKind, DemoSource> = {
  hello: {
    lang: "tsx",
    title: "Hello",
    code: "import { LottiePlayer } from \"@/components/LottiePlayer\"\n<LottiePlayer src=\"/animations/pulse.json\" style={{ width: 160 }} />",
  },
  playback: {
    lang: "ts",
    title: "playback",
    code: "ref.play(); ref.pause(); ref.stop()\nref.goToAndPlay(0, true)",
  },
  "speed-loop": {
    lang: "ts",
    title: "speed/loop",
    code: "anim.setSpeed(1.5)\nanim.loop = true",
  },
  segments: {
    lang: "ts",
    title: "segments",
    code: "anim.playSegments([0, 30], true)",
  },
  events: {
    lang: "ts",
    title: "events",
    code: "anim.addEventListener(\"complete\", onDone)\n// data_ready · loopComplete · enterFrame",
  },
  hover: {
    lang: "tsx",
    title: "hover",
    code: "onMouseEnter={() => ref.play()}\nonMouseLeave={() => ref.goToAndStop(0, true)}",
  },
  "click-toggle": {
    lang: "tsx",
    title: "toggle",
    code: "const [on, setOn] = useState(false)\n// switch animation or segments",
  },
  "progress-scrub": {
    lang: "ts",
    title: "scrub",
    code: "const frame = p * (op - ip)\nanim.goToAndStop(frame, true)",
  },
  theme: {
    lang: "tsx",
    title: "theme container",
    code: "// container color scheme\n// or setTheme / recolor",
  },
  "reduced-motion": {
    lang: "ts",
    title: "a11y",
    code: "const reduce = matchMedia(\n  \"(prefers-reduced-motion: reduce)\"\n).matches\n// show static if reduce",
  },
  "multi-state": {
    lang: "ts",
    title: "states",
    code: "type S = \"idle\"|\"loading\"|\"success\"|\"error\"\n// map S → src or segments",
  },
  "loading-ux": {
    lang: "tsx",
    title: "loading UX",
    code: "// idle → loading → ok|err\n// wire loadError",
  },
  micro: {
    lang: "tsx",
    title: "micro",
    code: "// short feedback on click\n// interruptible",
  },
  "inspect-json": {
    lang: "ts",
    title: "meta",
    code: "const frames = data.op - data.ip\nconst sec = frames / data.fr",
  },
  challenge: {
    lang: "txt",
    title: "checklist",
    code: "size · device · a11y · destroy\ncache · license · feature support",
  },
  markers: {
    lang: "ts",
    title: "markers",
    code: "const m = data.markers.find(x => x.cm === \"loop\")\nanim.goToAndPlay(m.tm, true)",
  },
  direction: {
    lang: "ts",
    title: "direction",
    code: "anim.setDirection(-1)\n// DotLottie: mode \"bounce\"|\"reverse\"",
  },
  sequence: {
    lang: "ts",
    title: "sequence",
    code: "on complete → play next\n// cancel on unmount",
  },
  "scroll-drive": {
    lang: "ts",
    title: "IO",
    code: "new IntersectionObserver(([e]) => {\n  e.isIntersecting ? play() : pause()\n})",
  },
  renderer: {
    lang: "ts",
    title: "renderer",
    code: "// lottie-web: svg | canvas\n// dotlottie-web: canvas core",
  },
  optimize: {
    lang: "txt",
    title: "optimize",
    code: "drop hidden layers\nless bitmaps · Optimizer\nto .lottie · hash cache",
  },
  recolor: {
    lang: "ts",
    title: "recolor",
    code: "// walk fills/strokes hex\n// or official setTheme",
  },
  "kit-like": {
    lang: "tsx",
    title: "LikeToggle",
    code: "<LottieLikeToggle onChange={...} />",
  },
  "kit-async": {
    lang: "tsx",
    title: "AsyncSlot",
    code: "<LottieAsyncSlot delayMs={1200} />",
  },
  dotlottie: {
    lang: "ts",
    title: "DotLottie",
    code: "import { DotLottie } from \"@lottiefiles/dotlottie-web\"\nnew DotLottie({ canvas, src, autoplay, loop })\n// destroy()",
  },
  "layer-map": {
    lang: "ts",
    title: "ty",
    code: "// 0 precomp 1 solid 2 image 3 null\n// 4 shape 5 text 6 audio 13 camera",
  },
  "state-machine": {
    lang: "ts",
    title: "SM",
    code: "loadStateMachine(id)\nstartStateMachine()\npostEvent(\"String: click\")",
  },
  "platform-matrix": {
    lang: "txt",
    title: "packages",
    code: "Web @lottiefiles/dotlottie-web\nReact @lottiefiles/dotlottie-react\niOS dotlottie-ios\nAndroid dotlottie-android",
  },
  "official-map": {
    lang: "txt",
    title: "官方 llms 入口",
    code: "https://lottiefiles.com/llms.txt\nhttps://developers.lottiefiles.com/llms.txt\nhttps://developers.lottiefiles.com/dotlottie-players-web-llms.txt\nhttps://developers.lottiefiles.com/dotlottie-players-mobile-llms.txt\nhttps://developers.lottiefiles.com/dotlottiejs-llms.txt\nhttps://developers.lottiefiles.com/relottie-llms.txt",
  },
  "tool-chain": {
    lang: "txt",
    title: "工具链",
    code: "Creator → Editor/Previewer\n→ Optimizer / to-dotLottie\n→ Workspace handoff\n→ Players + Feature Support",
  },
  "mcp-tools": {
    lang: "txt",
    title: "MCP tools",
    code: "operations_list\nschema_search\nschema_details\ngraphql_execute\n// https://mcp.lottiefiles.com/mcp",
  },
  "license-card": {
    lang: "txt",
    title: "许可检查",
    code: "1. 来源（free / marketplace）\n2. Simple License or plan commercial\n3. 禁止竞争动画库",
  },
  "layout-fit": {
    lang: "ts",
    title: "layout",
    code: "new DotLottie({\n  canvas, src,\n  layout: { fit: \"cover\", align: [0.5, 0.5] },\n  backgroundColor: \"#000\",\n})",
  },
  "multi-anim": {
    lang: "ts",
    title: "loadAnimation",
    code: "const list = dotLottie.manifest.animations\ndotLottie.loadAnimation(list[0].id)",
  },
  "dotlottie-js": {
    lang: "ts",
    title: "dotlottie-js",
    code: "import { DotLottie } from \"@dotlottie/dotlottie-js\"\nconst dl = new DotLottie()\ndl.addAnimation({ id: \"main\", data })\ndl.addTheme({ id: \"dark\", data: theme })\nawait dl.build()\nawait dl.download(\"out.lottie\")",
  },
  "relottie-pipe": {
    lang: "ts",
    title: "reLottie",
    code: "import { relottie } from \"@lottiefiles/relottie\"\nimport meta from \"@lottiefiles/relottie-metadata\"\nconst file = await relottie().use(meta).process(json)\n// file.data.metadata · hasExpressions",
  },
  "framework-wc": {
    lang: "tsx",
    title: "框架封装",
    code: "// React\nimport { DotLottieReact } from \"@lottiefiles/dotlottie-react\"\n// WC\n// <dotlottie-player src autoplay loop />",
  },
  "worker-perf": {
    lang: "ts",
    title: "Worker",
    code: "import { DotLottieWorker } from \"@lottiefiles/dotlottie-web\"\nconst a = new DotLottieWorker({ canvas, src, workerId: \"w1\" })\nawait a.play()\n// destroy on unmount",
  },
  integrations: {
    lang: "txt",
    title: "插件",
    code: "AE · Figma · Webflow · Framer · Canva\nhttps://lottiefiles.com/integrations",
  },
  "expr-security": {
    lang: "txt",
    title: "表达式安全",
    code: "1. bake expressions in AE\n2. detect hasExpressions (reLottie)\n3. Feature Support matrix\n4. degrade to static",
  },
};

export function getDemoSource(kind: DemoKind): DemoSource {
  return DEMO_SOURCES[kind];
}
