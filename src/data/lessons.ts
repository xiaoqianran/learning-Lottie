export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "hello"
  | "playback"
  | "speed-loop"
  | "segments"
  | "events"
  | "hover"
  | "click-toggle"
  | "progress-scrub"
  | "theme"
  | "reduced-motion"
  | "multi-state"
  | "loading-ux"
  | "micro"
  | "inspect-json"
  | "challenge"
  | "markers"
  | "direction"
  | "sequence"
  | "scroll-drive"
  | "renderer"
  | "optimize"
  | "recolor"
  | "kit-like"
  | "kit-async";



export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: "基础" | "进阶" | "交互" | "工程" | "实战" | "组件";
  minutes: number;
  blocks: LessonBlock[];
};


export const LESSONS: Lesson[] = [
  {
    slug: "intro",
    title: "Lottie 是什么",
    summary: "矢量动画 JSON · 跨平台 · 为什么比 GIF/视频更适合 UI。",
    level: "入门",
    track: "基础",
    minutes: 6,
    blocks: [
      {
        type: "text",
        title: "一句话",
        body: "Lottie 是 Airbnb 开源的动画运行时：把 After Effects（经 Bodymovin 插件）导出的 JSON，在 Web / iOS / Android / Flutter 上以矢量方式播放。",
      },
      {
        type: "text",
        title: "对比",
        body: "GIF：体积大、不可交互、分辨率差。\nMP4：需要解码器、难做透明与状态控制。\nCSS/SVG 手写：适合简单过渡，复杂时间轴成本高。\nLottie：设计师出稿，工程师控制 play / pause / 速度 / 段落 / 事件。",
      },
      {
        type: "demo",
        kind: "hello",
        title: "动手：第一段 Lottie",
        hint: "这是一段本地 JSON 动画。右侧可暂停 / 重播。",
      },
      {
        type: "code",
        title: "React 最小示例",
        lang: "tsx",
        code: `import Lottie from "lottie-react";
import pulse from "./pulse.json";

export function Hello() {
  return <Lottie animationData={pulse} loop autoplay style={{ width: 160 }} />;
}`,
      },
      {
        type: "tip",
        body: "本教程用 React + lottie-react 演示；核心 API 与 lottie-web 一致，换到 Vue / 原生同样适用。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "i1",
            question: "Lottie 动画的载体格式通常是？",
            options: ["MP4", "JSON", "GIF only", "PNG 序列必须"],
            answer: 1,
            explain: "Bodymovin 导出 JSON，运行时解析绘制。",
          },
          {
            id: "i2",
            question: "相对 GIF，Lottie 的核心优势？",
            options: ["只能播放一次", "可交互控制 + 矢量缩放", "只能静态", "必须联网"],
            answer: 1,
            explain: "可缩放、可控制进度与事件，体积通常更小。",
          },
        ],
      },
    ],
  },
  {
    slug: "json-structure",
    title: "JSON 结构速览",
    summary: "v / fr / ip / op / layers · 读懂一份动画文件。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "顶层字段",
        body: "v：Bodymovin 版本\nfr：帧率\nip / op：入点 / 出点（帧）\nw / h：画布宽高\nlayers：图层数组（形状、图片、预合成等）\nassets：图片与预合成资源",
      },
      {
        type: "demo",
        kind: "inspect-json",
        title: "动手：查看关键字段",
        hint: "切换动画，观察帧率、时长与图层数。",
      },
      {
        type: "code",
        title: "读取元数据",
        lang: "ts",
        code: `function meta(data: { fr: number; ip: number; op: number; layers: unknown[] }) {
  const frames = data.op - data.ip;
  const seconds = frames / data.fr;
  return { frames, seconds, layers: data.layers.length };
}`,
      },
      {
        type: "tip",
        body: "不要手改复杂 JSON。改交互与主题优先用运行时 API；改内容回 AE 重导出。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "j1",
            question: "op - ip 表示？",
            options: ["颜色数", "总帧数（大致）", "文件大小", "图层深度"],
            answer: 1,
            explain: "出点减入点 ≈ 动画帧长度。",
          },
          {
            id: "j2",
            question: "图层数据主要在？",
            options: ["layers", "fonts only", "css", "html"],
            answer: 0,
            explain: "layers 数组描述时间轴与形状。",
          },
        ],
      },
    ],
  },
  {
    slug: "playback",
    title: "播放控制",
    summary: "play / pause / stop / goToAndPlay · 掌握基础控制。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "控制面",
        body: "产品里几乎总是要：加载完自动播、用户点一下再播、成功态播完停在最后一帧。这些都靠实例方法完成。",
      },
      {
        type: "demo",
        kind: "playback",
        title: "动手：播放控制台",
        hint: "试 play / pause / stop / 跳到开头。",
      },
      {
        type: "code",
        title: "lottie-react ref",
        lang: "tsx",
        code: `const ref = useRef<LottieRefCurrentProps>(null);

<Lottie lottieRef={ref} animationData={data} loop={false} />

ref.current?.play();
ref.current?.pause();
ref.current?.stop();
ref.current?.goToAndPlay(0, true); // 帧, isFrame`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "p1",
            question: "成功勾播完后常做？",
            options: ["无限循环", "停在末帧", "立刻销毁 DOM", "改成 GIF"],
            answer: 1,
            explain: "loop=false + 末帧保留状态。",
          },
          {
            id: "p2",
            question: "goToAndPlay 第二参数 true 表示？",
            options: ["秒", "按帧定位", "倒放", "静音"],
            answer: 1,
            explain: "isFrame=true 时首参是帧。",
          },
        ],
      },
    ],
  },
  {
    slug: "speed-loop",
    title: "速度与循环",
    summary: "setSpeed · loop · 方向 · 什么时候不该循环。",
    level: "入门",
    track: "基础",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "原则",
        body: "Loading / 背景装饰：可循环。\n成功、错误、引导步骤：通常播一次。\n速度：默认 1；反馈过慢可 1.2–1.5，过快会显得廉价。",
      },
      {
        type: "demo",
        kind: "speed-loop",
        title: "动手：速度与循环",
        hint: "拖动速度，切换 loop，观察体感差异。",
      },
      {
        type: "code",
        title: "设置速度",
        lang: "tsx",
        code: `ref.current?.setSpeed(1.25);
// 负速度可倒放（视版本与资源支持）
ref.current?.setDirection(-1);`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "s1",
            question: "支付成功勾最合适？",
            options: ["无限 loop", "播一次", "必须 3 倍速", "必须倒放"],
            answer: 1,
            explain: "状态反馈播一次即可。",
          },
          {
            id: "s2",
            question: "setSpeed(2) 表示？",
            options: ["两倍速", "两帧", "循环两次", "延迟 2s"],
            answer: 0,
            explain: "相对默认 1 的倍速。",
          },
        ],
      },
    ],
  },
  {
    slug: "segments",
    title: "段落与帧区间",
    summary: "playSegments · 用同一文件做多状态图标。",
    level: "入门",
    track: "基础",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "为什么用段落",
        body: "一份 JSON 可以包含「关→开」「开→关」两段。用 playSegments([from, to], forceFlag) 只播需要的区间，比加载两个文件更省。",
      },
      {
        type: "demo",
        kind: "segments",
        title: "动手：段落播放",
        hint: "点按钮只播放指定帧区间。",
      },
      {
        type: "code",
        title: "playSegments",
        lang: "ts",
        code: `// 播放 0–30 帧，强制打断当前
ref.current?.playSegments([0, 30], true);
// 队列多段
ref.current?.playSegments([[0, 20], [40, 60]], true);`,
      },
      {
        type: "tip",
        body: "和设计师约定帧标记（markers）或文档化区间，避免魔法数字散落代码。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "g1",
            question: "playSegments 主要用途？",
            options: ["压缩 JSON", "只播指定帧区间", "改颜色", "上传 AE"],
            answer: 1,
            explain: "同一资源多状态。",
          },
          {
            id: "g2",
            question: "forceFlag=true？",
            options: ["忽略错误", "打断当前立即播新段", "强制 loop", "强制静音"],
            answer: 1,
            explain: "立即切换段落。",
          },
        ],
      },
    ],
  },
  {
    slug: "events",
    title: "事件与完成回调",
    summary: "DOMLoaded · complete · loopComplete · enterFrame。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "常用事件",
        body: "DOMLoaded / data_ready：资源就绪。\ncomplete：非循环播完。\nloopComplete：循环一圈结束。\nenterFrame：每帧（慎用，注意性能）。",
      },
      {
        type: "demo",
        kind: "events",
        title: "动手：事件日志",
        hint: "播放并观察事件流；complete 时会提示。",
      },
      {
        type: "code",
        title: "onComplete",
        lang: "tsx",
        code: `<Lottie
  animationData={data}
  loop={false}
  onComplete={() => setStep("done")}
  onLoopComplete={() => console.log("loop")}
/>`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "e1",
            question: "非循环播完触发？",
            options: ["complete", "loopComplete only", "error only", "scroll"],
            answer: 0,
            explain: "complete / onComplete。",
          },
          {
            id: "e2",
            question: "enterFrame 注意？",
            options: ["可随便写重逻辑", "每帧触发，逻辑要轻", "只触发一次", "浏览器禁止"],
            answer: 1,
            explain: "高频回调，避免重计算。",
          },
        ],
      },
    ],
  },
  {
    slug: "hover-interact",
    title: "悬停与指针交互",
    summary: "鼠标进入播放、离开回退 · 图标微动效。",
    level: "进阶",
    track: "交互",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "模式",
        body: "悬停播放、离开倒回或停在中间帧。适合导航图标、卡片装饰。触屏无 hover，要准备 click / press 兜底。",
      },
      {
        type: "demo",
        kind: "hover",
        title: "动手：Hover 播放",
        hint: "鼠标移入播放，移出暂停并回到开头（移动端可点按）。",
      },
      {
        type: "code",
        title: "hover 控制",
        lang: "tsx",
        code: `function HoverIcon() {
  const ref = useRef<LottieRefCurrentProps>(null);
  return (
    <div
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => {
        ref.current?.pause();
        ref.current?.goToAndStop(0, true);
      }}
    >
      <Lottie lottieRef={ref} animationData={data} loop autoplay={false} />
    </div>
  );
}`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "h1",
            question: "仅 hover 交互的问题？",
            options: ["触屏无 hover", "JSON 变大", "无法循环", "颜色固定"],
            answer: 0,
            explain: "需要 click/focus 等价交互。",
          },
          {
            id: "h2",
            question: "离开时 goToAndStop(0) 作用？",
            options: ["加速", "复位到起始帧", "删除图层", "改 fr"],
            answer: 1,
            explain: "回到初始姿态。",
          },
        ],
      },
    ],
  },
  {
    slug: "click-toggle",
    title: "点击切换状态",
    summary: "收藏 / 开关 / 播放按钮的双向动画。",
    level: "进阶",
    track: "交互",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "状态机思路",
        body: "UI 状态 on/off 映射到两段动画或正放/倒放。状态以你的 React state 为准，动画只是表现层。",
      },
      {
        type: "demo",
        kind: "click-toggle",
        title: "动手：点赞切换",
        hint: "点击切换 liked；动画播一次。",
      },
      {
        type: "code",
        title: "状态驱动",
        lang: "tsx",
        code: `const [on, setOn] = useState(false);
useEffect(() => {
  if (on) ref.current?.playSegments([0, 30], true);
  else ref.current?.playSegments([30, 60], true);
}, [on]);`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "c1",
            question: "切换按钮的真实状态应存在？",
            options: ["只在 Lottie 内部", "应用 state / 后端", "JSON 文件名", "CSS only"],
            answer: 1,
            explain: "动画是表现，状态在应用层。",
          },
          {
            id: "c2",
            question: "点太快连点怎么办？",
            options: ["忽略", "防抖或播完再接受", "删动画", "必须 loop"],
            answer: 1,
            explain: "避免段落打架；可用 isPlaying 锁。",
          },
        ],
      },
    ],
  },
  {
    slug: "scrub",
    title: "进度 scrub",
    summary: "goToAndStop · 用滚动或滑杆驱动帧。",
    level: "进阶",
    track: "交互",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "场景",
        body: "落地页滚动叙事、步骤指示器、自定义进度。用百分比映射到帧：frame = p * (op - ip)。",
      },
      {
        type: "demo",
        kind: "progress-scrub",
        title: "动手：滑杆 scrub",
        hint: "拖动进度条，动画跟着手指走。",
      },
      {
        type: "code",
        title: "映射帧",
        lang: "ts",
        code: `function scrub(ref: LottieRef, p: number, totalFrames: number) {
  const frame = Math.round(Math.min(1, Math.max(0, p)) * (totalFrames - 1));
  ref.current?.goToAndStop(frame, true);
}`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "r1",
            question: "scrub 时通常？",
            options: ["保持 autoplay", "goToAndStop 定位", "必须 setSpeed(0)", "删 layers"],
            answer: 1,
            explain: "手动定位帧，不自动播。",
          },
          {
            id: "r2",
            question: "滚动叙事注意？",
            options: ["每像素重载 JSON", "节流 + 缓存实例", "禁用 GPU", "改成 GIF"],
            answer: 1,
            explain: "单实例 + rAF/节流。",
          },
        ],
      },
    ],
  },
  {
    slug: "multi-state",
    title: "多状态图标",
    summary: "空 / 加载 / 成功 / 错误 四态一套反馈。",
    level: "进阶",
    track: "交互",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "产品模式",
        body: "同一槽位根据异步状态切换不同 Lottie 或同一文件不同段落。切换时注意卸载旧实例，避免音频/循环泄漏（Lottie 本身无音频，但 rAF 仍在）。",
      },
      {
        type: "demo",
        kind: "multi-state",
        title: "动手：四态切换",
        hint: "模拟请求：idle → loading → success / error。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "m1",
            question: "异步按钮反馈常见序列？",
            options: ["success→loading", "idle→loading→success/error", "error 永远 loop", "只要 GIF"],
            answer: 1,
            explain: "标准异步反馈链。",
          },
          {
            id: "m2",
            question: "状态切换时？",
            options: ["叠加多个 loop loading", "替换并停掉上一实例", "忽略 complete", "强制 10x 速"],
            answer: 1,
            explain: "避免多个动画同时跑。",
          },
        ],
      },
    ],
  },
  {
    slug: "theme",
    title: "主题与颜色",
    summary: "设计 token · 替换填充色 · 深浅色适配。",
    level: "进阶",
    track: "进阶",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "策略",
        body: "1）导出时用中性色，运行时用 lottie-colorify 等改色。\n2）深浅色各导出一套（可控但体积翻倍）。\n3）简单图标优先用 CSS/SVG，把 Lottie 留给复杂动态。",
      },
      {
        type: "demo",
        kind: "theme",
        title: "动手：主题预览",
        hint: "切换强调色，观察容器与叠加层（真实改 JSON 色需遍历 layers）。",
      },
      {
        type: "code",
        title: "思路：遍历改 fill",
        lang: "ts",
        code: `// 简化示意：生产请用成熟改色库或设计约定
function recolor(data: any, rgba: number[]) {
  const clone = structuredClone(data);
  // 递归 layers / shapes 找 ty==='fl' 改 c.k
  return clone;
}`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "t1",
            question: "深浅色适配更稳妥？",
            options: ["运行时乱改所有层", "设计约定 + 可控改色/双资源", "只用 GIF", "忽略对比度"],
            answer: 1,
            explain: "约定与可控方案更稳。",
          },
          {
            id: "t2",
            question: "极简图标更推荐？",
            options: ["必上 Lottie", "SVG/图标字体可能更合适", "必须 AE", "必须视频"],
            answer: 1,
            explain: "Lottie 适合有时间轴的动态。",
          },
        ],
      },
    ],
  },
  {
    slug: "markers",
    title: "Markers 命名标记",
    summary: "用 markers 代替魔法数字帧 · 与设计对齐。",
    level: "进阶",
    track: "进阶",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "为什么需要 markers",
        body: "playSegments([12, 48]) 里的数字难维护。AE / Bodymovin 可导出 markers（tm 帧 + cm 名称）。运行时按名字定位，设计和工程说同一种语言。",
      },
      {
        type: "demo",
        kind: "markers",
        title: "动手：按标记跳转",
        hint: "点击标记名，跳到对应帧（本教程为 progress / rocket 注入了教学 markers）。",
      },
      {
        type: "code",
        title: "按名取帧",
        lang: "ts",
        code: `type Marker = { tm: number; cm: string };

function frameOf(markers: Marker[], name: string) {
  const m = markers.find((x) => x.cm === name);
  if (!m) throw new Error(\`missing marker: \${name}\`);
  return m.tm;
}

ref.current?.goToAndPlay(frameOf(markers, "launch"), true);`,
      },
      {
        type: "tip",
        body: "段落播放可用相邻 markers：from = idle.tm，to = launch.tm。约定命名：idle / open / close / success。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mk1",
            question: "marker 的 tm 通常表示？",
            options: ["毫秒时间戳", "帧时间", "图层 id", "颜色"],
            answer: 1,
            explain: "tm 是时间轴上的帧位置。",
          },
          {
            id: "mk2",
            question: "比硬编码 [12,48] 更好的做法？",
            options: ["随机帧", "用 markers 命名", "只用 setTimeout", "删掉段落"],
            answer: 1,
            explain: "命名标记可随设计改时间轴而不改业务语义。",
          },
        ],
      },
    ],
  },
  {
    slug: "direction",
    title: "正放与倒放",
    summary: "setDirection · 开关闭合 · 收藏取消。",
    level: "进阶",
    track: "进阶",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "一套动画两种状态",
        body: "很多 UI 只需「打开」时间轴：正向播 = 打开，反向播 = 关闭。比维护两份 JSON 更省。注意：倒放时 complete 时机与 loop 行为要自己测。",
      },
      {
        type: "demo",
        kind: "direction",
        title: "动手：方向切换",
        hint: "切换正放 / 倒放，观察动画方向。",
      },
      {
        type: "code",
        title: "方向控制",
        lang: "ts",
        code: `function setOpen(open: boolean) {
  const dir = open ? 1 : -1;
  ref.current?.setDirection(dir);
  ref.current?.play();
}`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "d1",
            question: "setDirection(-1) 表示？",
            options: ["加速", "倒放", "销毁", "改 renderer"],
            answer: 1,
            explain: "-1 反向播放。",
          },
          {
            id: "d2",
            question: "倒放适合？",
            options: ["开关/抽屉闭合", "永久 loading", "替代所有状态机", "必须 canvas"],
            answer: 0,
            explain: "对称开合最常见。",
          },
        ],
      },
    ],
  },
  {
    slug: "sequence",
    title: "动画串联",
    summary: "complete 链式 · 编排多段反馈。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "编排思路",
        body: "复杂反馈往往是：loading → success → confetti。用 complete 事件推进下一步，或显式状态机。不要用一串魔法 setTimeout 硬拼。",
      },
      {
        type: "demo",
        kind: "sequence",
        title: "动手：三步串联",
        hint: "点击开始：加载 → 成功 → 庆祝。",
      },
      {
        type: "code",
        title: "状态机串联",
        lang: "ts",
        code: `type Step = "load" | "ok" | "party" | "done";

// onComplete of current step → next step
function next(step: Step): Step | null {
  if (step === "load") return "ok";
  if (step === "ok") return "party";
  if (step === "party") return "done";
  return null;
}`,
      },
      {
        type: "tip",
        body: "串联时务必销毁或停掉上一段，避免多个 loop loading 叠在一起。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sq1",
            question: "推进下一步更可靠的信号？",
            options: ["随意 delay", "complete / 明确超时", "hover", "随机"],
            answer: 1,
            explain: "用完成事件或可控超时。",
          },
          {
            id: "sq2",
            question: "多段串联时？",
            options: ["全部 loop 叠加", "单槽位切换并清理", "永不 complete", "忽略状态"],
            answer: 1,
            explain: "单槽位 + 清理是稳妥模式。",
          },
        ],
      },
    ],
  },
  {
    slug: "scroll-drive",
    title: "滚动与可见性驱动",
    summary: "IntersectionObserver · 离屏暂停 · 滚动 scrub。",
    level: "进阶",
    track: "交互",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "两种模式",
        body: "1）可见才播放：IO 进入 viewport → play，离开 → pause。\n2）滚动叙事：用 scroll progress 映射帧（goToAndStop）。落地页「画卷」常用第二种。",
      },
      {
        type: "demo",
        kind: "scroll-drive",
        title: "动手：可见性驱动",
        hint: "模拟进入/离开视口；离开时暂停以省 CPU。",
      },
      {
        type: "code",
        title: "IntersectionObserver",
        lang: "ts",
        code: `const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) ref.current?.play();
  else ref.current?.pause();
}, { threshold: 0.35 });

io.observe(container);
// unmount: io.disconnect()`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sd1",
            question: "离屏动画建议？",
            options: ["继续全速 loop", "pause / 降频", "重新 fetch JSON", "改成 GIF"],
            answer: 1,
            explain: "省电省主线程。",
          },
          {
            id: "sd2",
            question: "滚动叙事帧定位用？",
            options: ["play() only", "goToAndStop(frame)", "必须 setDirection", "window.open"],
            answer: 1,
            explain: "按进度 scrub 帧。",
          },
        ],
      },
    ],
  },
  {
    slug: "renderer",
    title: "SVG 与 Canvas 渲染",
    summary: "清晰度 · 性能 · 何时换 renderer。",
    level: "进阶",
    track: "工程",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "怎么选",
        body: "SVG：默认首选，清晰、易与 CSS 混排、图层可检。\nCanvas：大量路径/粒子时往往更省 DOM，但清晰度与无障碍/检索较差。\nHTML renderer 少用。先 SVG，性能 profiling 后再换。",
      },
      {
        type: "demo",
        kind: "renderer",
        title: "动手：切换 renderer",
        hint: "同一 JSON 在 SVG / Canvas 下播放，体感对比。",
      },
      {
        type: "code",
        title: "指定 renderer",
        lang: "ts",
        code: `lottie.loadAnimation({
  container,
  renderer: "canvas", // or "svg"
  loop: true,
  autoplay: true,
  animationData,
});`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rn1",
            question: "默认更推荐？",
            options: ["canvas 永远", "svg 优先", "html only", "不用 renderer"],
            answer: 1,
            explain: "SVG 通用性最好。",
          },
          {
            id: "rn2",
            question: "极重粒子场景可考虑？",
            options: ["只能 GIF", "canvas", "必须 iframe", "关掉硬件加速永远"],
            answer: 1,
            explain: "Canvas 有时更合适。",
          },
        ],
      },
    ],
  },
  {
    slug: "optimize",
    title: "体积与性能优化",
    summary: "瘦身清单 · 图层 · 位图 · 缓存哈希。",
    level: "实战",
    track: "工程",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "瘦身优先级",
        body: "1）删隐藏/未用图层与效果\n2）能矢量别位图；位图压缩并进 assets\n3）降 fr（UI 反馈 30fps 常够）\n4）缩短时长、少用模糊/阴影\n5）JSON 压缩 + 文件名内容哈希\n6）离屏 pause；同屏实例数设上限",
      },
      {
        type: "demo",
        kind: "optimize",
        title: "动手：体积体检",
        hint: "查看各预设的近似体积与图层数，建立「贵不贵」直觉。",
      },
      {
        type: "code",
        title: "构建期哈希",
        lang: "ts",
        code: `// Vite: import animUrl from "./hero.json?url"
// 产出 /assets/hero-a1b2c3.json —— 更新即换 URL，缓存安全`,
      },
      {
        type: "tip",
        body: "单文件 UI 反馈建议盯紧 50–150KB；开屏/插画可放宽，但要懒加载。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "op1",
            question: "体积暴涨常见原因？",
            options: ["markers 太多", "大图 assets / 未删图层", "setSpeed", "basepath"],
            answer: 1,
            explain: "位图与冗余图层是大头。",
          },
          {
            id: "op2",
            question: "更新动画用户仍看旧版？",
            options: ["正常", "缺内容哈希/缓存策略", "只能清 cookie", "Lottie 锁死"],
            answer: 1,
            explain: "用哈希文件名或版本 query。",
          },
        ],
      },
    ],
  },
  {
    slug: "a11y",

    title: "无障碍与 reduced-motion",
    summary: "prefers-reduced-motion · aria · 静态兜底。",
    level: "进阶",
    track: "工程",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "必须做",
        body: "系统开启「减少动态效果」时：停在关键帧或换静态图。装饰动画 aria-hidden；信息性动画要有文本等价。",
      },
      {
        type: "demo",
        kind: "reduced-motion",
        title: "动手：减少动态",
        hint: "切换开关模拟 prefers-reduced-motion。",
      },
      {
        type: "code",
        title: "检测",
        lang: "ts",
        code: `const reduce = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (reduce) {
  ref.current?.goToAndStop(lastFrame, true);
} else {
  ref.current?.play();
}`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "a1",
            question: "reduced-motion 开启时？",
            options: ["强制更炫", "减少或停在静态帧", "忽略", "必须 60fps"],
            answer: 1,
            explain: "尊重系统偏好。",
          },
          {
            id: "a2",
            question: "纯装饰动画？",
            options: ["aria-hidden=true", "必须 live region", "role=alert", "强制 focus"],
            answer: 0,
            explain: "避免读屏噪音。",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: "性能与体积",
    summary: "压缩 · 表达式 · 图片层 · 同时实例数。",
    level: "进阶",
    track: "工程",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "清单",
        body: "· 导出前清理隐藏图层与无用属性\n· 慎用位图层，优先矢量\n· 复杂表达式在 AE 侧 bake\n· 列表里不要每项一个大 Lottie\n· 不可见时 pause / destroy\n· 用 lottie-optimizer / 压缩 JSON",
      },
      {
        type: "code",
        title: "可见性",
        lang: "tsx",
        code: `useEffect(() => {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) ref.current?.play();
    else ref.current?.pause();
  });
  if (el) io.observe(el);
  return () => io.disconnect();
}, []);`,
      },
      {
        type: "tip",
        body: "首屏关键动画可内联 JSON；次要动画懒加载 fetch，避免阻塞主包。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "f1",
            question: "列表 50 项每项大 Lottie？",
            options: ["完美", "性能风险，应静态/共享/虚拟化", "必须", "只增体积无CPU"],
            answer: 1,
            explain: "实例与 rAF 成本高。",
          },
          {
            id: "f2",
            question: "离屏动画建议？",
            options: ["继续 play", "pause/destroy", "setSpeed(99)", "复制 10 份"],
            answer: 1,
            explain: "省 CPU。",
          },
        ],
      },
    ],
  },
  {
    slug: "react-integration",
    title: "React 集成",
    summary: "lottie-react · SSR · 动态 import · 类型。",
    level: "进阶",
    track: "工程",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "注意 SSR",
        body: "Lottie 依赖 DOM/canvas。在 TanStack Start / Next 等 SSR 环境：客户端再挂载，或 dynamic(..., { ssr: false })。",
      },
      {
        type: "code",
        title: "安全挂载",
        lang: "tsx",
        code: `const [ready, setReady] = useState(false);
useEffect(() => setReady(true), []);
if (!ready) return <div className="h-40 bg-surface-2" />;
return <Lottie animationData={data} />;`,
      },
      {
        type: "code",
        title: "动态加载 JSON",
        lang: "tsx",
        code: `const [data, setData] = useState(null);
useEffect(() => {
  fetch("/animations/loading.json")
    .then((r) => r.json())
    .then(setData);
}, []);`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "re1",
            question: "SSR 直接渲染 Lottie 风险？",
            options: ["无风险", "window/DOM 不可用导致报错", "只是慢", "颜色不对"],
            answer: 1,
            explain: "需客户端挂载。",
          },
          {
            id: "re2",
            question: "大 JSON 推荐？",
            options: ["全打进主包", "按需 fetch / 路由级拆分", "Base64 进 CSS", "改 GIF"],
            answer: 1,
            explain: "控制首包。",
          },
        ],
      },
    ],
  },
  {
    slug: "workflow",
    title: "设计到工程工作流",
    summary: "AE → Bodymovin → 评审 → 接入 → 回归。",
    level: "进阶",
    track: "工程",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "协作约定",
        body: "1. 设计给帧标记与状态说明\n2. 导出命名：icon-like-v3.json\n3. 工程师在 Playground 验收速度/循环/末帧\n4. 写入 Story 或本课 Demo\n5. 线上监控体积与主线程长任务",
      },
      {
        type: "tip",
        body: "不支持的特性（部分效果、表达式、字体）要在导出阶段发现，而不是上线后。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "w1",
            question: "版本文件名建议？",
            options: ["final-final.json", "带语义版本/用途", "1.json", "新建文件夹 (1)"],
            answer: 1,
            explain: "可追溯。",
          },
          {
            id: "w2",
            question: "不支持的 AE 特性应？",
            options: ["上线碰运气", "导出阶段验证", "忽略设计师", "只靠 CSS 覆盖"],
            answer: 1,
            explain: "在工具链早期暴露问题。",
          },
        ],
      },
    ],
  },
  {
    slug: "loading-ux",
    title: "实战：加载体验",
    summary: "骨架 + Lottie loading · 超时 · 取消。",
    level: "实战",
    track: "实战",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "体验原则",
        body: "短请求（<300ms）可不闪 loading。中等请求显示 Lottie。长请求提供取消与文案。成功切换到 success 段或静态勾。",
      },
      {
        type: "demo",
        kind: "loading-ux",
        title: "动手：模拟加载",
        hint: "点「发起请求」，观察 loading → 结果。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lx1",
            question: "极短请求立刻上 loading？",
            options: ["总是好", "可能闪烁，可延迟显示", "必须 GIF", "禁止动画"],
            answer: 1,
            explain: "延迟显示避免闪。",
          },
          {
            id: "lx2",
            question: "加载失败应？",
            options: ["继续 loop loading", "错误态 + 可重试", "白屏", "关闭网页"],
            answer: 1,
            explain: "明确错误与行动点。",
          },
        ],
      },
    ],
  },
  {
    slug: "micro-interactions",
    title: "实战：微交互",
    summary: "点赞、开关、成功反馈的节奏。",
    level: "实战",
    track: "实战",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "节奏",
        body: "微交互要快（通常 200–500ms 体感），可打断，状态以数据为准。庆祝类（彩带）少而精，避免每次点击都放烟花。",
      },
      {
        type: "demo",
        kind: "micro",
        title: "动手：微交互组合",
        hint: "点赞与提交成功反馈。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mi1",
            question: "微交互时长体感？",
            options: ["尽量 5 秒+", "短而清晰", "必须 loop", "无限制"],
            answer: 1,
            explain: "短反馈不挡操作。",
          },
          {
            id: "mi2",
            question: "每次表单输入都放彩带？",
            options: ["很好", "过度，应克制", "必须", "无障碍要求"],
            answer: 1,
            explain: "庆祝留给关键成功点。",
          },
        ],
      },
    ],
  },
  {
    slug: "pitfalls",
    title: "常见坑",
    summary: "透明 · 字体 · 表达式 · 内存 · 缓存。",
    level: "实战",
    track: "实战",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "高频问题",
        body: "· 字体未嵌入导致错位\n· 蒙版/效果导出丢失\n· 大图 assets 暴体积\n· 组件卸载未 destroy\n· CDN 缓存旧 JSON\n· 在低端机主线程掉帧",
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：找问题",
        hint: "对照清单自检一段动画接入。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pi1",
            question: "卸载组件时？",
            options: ["可不管", "销毁/停动画，防泄漏", "复制实例", "setSpeed(0) 即可永久"],
            answer: 1,
            explain: "清理 rAF 与监听。",
          },
          {
            id: "pi2",
            question: "JSON 更新用户仍看旧版？",
            options: ["正常永久", "缓存/哈希文件名问题", "Lottie bug only", "必须清 cookies"],
            answer: 1,
            explain: "用内容哈希或版本 query。",
          },
        ],
      },
    ],
  },
  {
    slug: "checklist",
    title: "上线检查清单",
    summary: "验收表 · 从设计到生产。",
    level: "实战",
    track: "实战",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "上线前",
        body: "□ 循环策略正确\n□ 完成回调会推进业务状态\n□ reduced-motion 有兜底\n□ 体积可接受（单文件建议 < 150–300KB，视场景）\n□ 深浅色对比度\n□ 移动端触控目标 ≥ 44px\n□ 失败态与慢网\n□ 卸载无泄漏",
      },
      {
        type: "tip",
        body: "完成全部课程后，去「动画工坊」做闯关，并在「结业证明」查看进度。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ch1",
            question: "上线检查最不该漏？",
            options: ["只看桌面 Chrome", "reduced-motion 与移动端", "只看设计稿颜色", "忽略 complete"],
            answer: 1,
            explain: "真实用户环境多样。",
          },
          {
            id: "ch2",
            question: "业务状态推进应挂钩？",
            options: ["随机 setTimeout", "动画 complete / 明确超时", "仅 hover", "仅 CSS"],
            answer: 1,
            explain: "用完成事件或可靠超时，别写死魔法延迟。",
          },
        ],
      },
    ],
  },
  {
    slug: "recolor-runtime",
    title: "运行时改色",
    summary: "遍历 fill/stroke · 主题色 · 深浅适配思路。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "何时运行时改色",
        body: "图标类几何动画、品牌色多主题、不想导出 N 份 JSON 时。复杂插画/渐变/图片层请回 AE 或双资源。",
      },
      {
        type: "demo",
        kind: "recolor",
        title: "动手：真改 JSON 色",
        hint: "切换色板，fills/strokes 会被 recolorLottieHex 重写。",
      },
      {
        type: "code",
        title: "本站工具",
        lang: "ts",
        code: `import { recolorLottieHex } from "@/lib/lottie-recolor";

const themed = recolorLottieHex(raw, "#6366f1");
// <LottiePlayer animationData={themed} />`,
      },
      {
        type: "tip",
        body: "改色前 structuredClone；缓存「原 JSON + hex → 结果」避免每帧深拷贝。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rc1",
            question: "recolor 主要改？",
            options: ["fr 帧率", "fl/st 的颜色通道", "文件名", "basepath"],
            answer: 1,
            explain: "遍历形状填充/描边颜色。",
          },
          {
            id: "rc2",
            question: "复杂插画更推荐？",
            options: ["暴力改所有层", "设计约定或双资源", "必须 canvas", "忽略对比度"],
            answer: 1,
            explain: "运行时改色适合可控几何图标。",
          },
        ],
      },
    ],
  },
  {
    slug: "kit-like",
    title: "组件：点赞开关",
    summary: "状态在 React · Lottie 只表现 · 可复用。",
    level: "实战",
    track: "组件",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "封装原则",
        body: "对外暴露 liked / onChange；内部决定何时 play 心形。业务只关心布尔状态。",
      },
      {
        type: "demo",
        kind: "kit-like",
        title: "动手：LottieLikeToggle",
        hint: "这是 kit 里的即用组件。",
      },
      {
        type: "code",
        title: "使用",
        lang: "tsx",
        code: `import { LottieLikeToggle } from "@/components/kit/LottieLikeToggle";

<LottieLikeToggle onChange={(liked) => save(liked)} />`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "kl1",
            question: "liked 真相应存在？",
            options: ["只在 Lottie 内部", "应用 state", "JSON markers", "CSS only"],
            answer: 1,
            explain: "动画是表现层。",
          },
          {
            id: "kl2",
            question: "封装组件的好处？",
            options: ["无法测试", "多页面复用同一交互", "必须 SSR 失败", "体积必然翻倍"],
            answer: 1,
            explain: "交互一致性与复用。",
          },
        ],
      },
    ],
  },
  {
    slug: "kit-async",
    title: "组件：异步四态槽",
    summary: "idle/loading/success/error 模板组件。",
    level: "实战",
    track: "组件",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "异步反馈模板",
        body: "表单提交、支付、保存都可套四态槽。切换时用 key 换实例，避免 loop loading 残留。",
      },
      {
        type: "demo",
        kind: "kit-async",
        title: "动手：LottieAsyncSlot",
        hint: "跑通成功 / 失败路径。",
      },
      {
        type: "code",
        title: "使用",
        lang: "tsx",
        code: `import { LottieAsyncSlot } from "@/components/kit/LottieAsyncSlot";

<LottieAsyncSlot delayMs={1200} />`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ka1",
            question: "状态切换时？",
            options: ["叠加多个 loading", "替换并停掉上一实例", "忽略 error", "强制 10x"],
            answer: 1,
            explain: "单槽位切换。",
          },
          {
            id: "ka2",
            question: "成功态通常？",
            options: ["永久 loop", "播一次 + complete 回调", "必须 hover", "不能有文案"],
            answer: 1,
            explain: "一次性反馈。",
          },
        ],
      },
    ],
  },
  {
    slug: "interview-lottie",
    title: "面试串讲",
    summary: "原理 · 取舍 · 性能 · 落地经验。",
    level: "实战",
    track: "实战",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "一分钟版",
        body: "Lottie = AE 时间轴导出的 JSON + 运行时矢量绘制。比 GIF 可控、比纯手写 SVG 动画更适合复杂时间轴。代价是包体、主线程与设计/工程协作成本。",
      },
      {
        type: "text",
        title: "常被追问",
        body: "· SVG vs Canvas 怎么选？\n· 如何做 reduced-motion？\n· 如何避免离屏耗电？\n· 主题色如何适配？\n· 和 Rive / CSS 如何取舍？\n· 如何做缓存与版本更新？",
      },
      {
        type: "tip",
        body: "用本站工坊与图鉴举 1 个真实场景（四态请求 / 点赞）比背 API 更有说服力。",
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：面试前自检",
        hint: "把清单当成面试检查表过一遍。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "iv1",
            question: "Lottie 相对 GIF 的核心优势？",
            options: ["不能交互", "可控制进度/事件 + 矢量缩放", "必须更大", "只能 Android"],
            answer: 1,
            explain: "可控与清晰度。",
          },
          {
            id: "iv2",
            question: "性能答法应提到？",
            options: ["只谈设计美观", "离屏 pause、实例数、体积、renderer", "永远 canvas", "禁止 JSON"],
            answer: 1,
            explain: "工程向的完整答案。",
          },
        ],
      },
    ],
  },
];

export const TRACKS = ["基础", "进阶", "交互", "工程", "实战", "组件"] as const;


export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const i = getLessonIndex(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function getLessonsByTrack(track: Lesson["track"]) {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions(): Array<
  QuizQuestion & { lessonSlug: string; lessonTitle: string }
> {
  const out: Array<
    QuizQuestion & { lessonSlug: string; lessonTitle: string }
  > = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({
            ...q,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
          });
        }
      }
    }
  }
  return out;
}
