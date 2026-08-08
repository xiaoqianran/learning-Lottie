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
  | "kit-async"
  | "dotlottie"
  | "layer-map"
  | "state-machine"
  | "platform-matrix"
  | "official-map"
  | "tool-chain"
  | "mcp-tools"
  | "license-card"
  | "layout-fit"
  | "multi-anim"
  | "dotlottie-js"
  | "relottie-pipe"
  | "framework-wc"
  | "worker-perf"
  | "integrations"
  | "expr-security";

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
  track: "基础" | "进阶" | "交互" | "工程" | "实战" | "组件" | "生态";
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
        body: "Lottie 是 Airbnb 开源的动画运行时：把 After Effects（经 Bodymovin / LottieFiles for AE）导出的 JSON，在 Web / iOS / Android / Flutter 上以矢量方式播放。",
      },
      {
        type: "text",
        title: "对比",
        body: "GIF：体积大、不可交互、分辨率差。\nMP4：需要解码器、难做透明与状态控制。\nCSS/SVG 手写：适合简单过渡，复杂时间轴成本高。\nLottie：设计师出稿，工程师控制 play / pause / 速度 / 段落 / 事件。\ndotLottie（官方首选下一代）：压缩包内可含多动画、主题、状态机。",
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
        body: "官方 FAQ：Lottie 比 GIF 约 10× 更小且可缩放；离线可播。生产优先考虑 .lottie + 官方 players。",
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
        body: "v：Bodymovin 版本\nfr：帧率\nip / op：入点 / 出点（帧）\nw / h：画布宽高\nlayers：图层数组（形状、图片、预合成等）\nassets：图片与预合成资源\nmarkers / slots：命名标记与主题插槽（进阶）",
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
        body: "完整 schema：lottiefiles.github.io/lottie-docs/schema/。LAC Spec 是跨实现兼容的最小化子集。",
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
ref.current?.goToAndPlay(0, true);`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "p1",
            question: "goToAndPlay 第二参 true 表示？",
            options: ["循环", "按帧定位", "倒放", "销毁"],
            answer: 1,
            explain: "isFrame=true 按帧跳转。",
          },
          {
            id: "p2",
            question: "播完停在末帧常见做法？",
            options: ["loop=true", "loop=false + 不 stop", "删 JSON", "必须视频"],
            answer: 1,
            explain: "非循环播完停在最后一帧。",
          },
        ],
      },
    ],
  },
  {
    slug: "speed-loop",
    title: "速度与循环",
    summary: "setSpeed · loop · 产品节奏。",
    level: "入门",
    track: "基础",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "节奏",
        body: "加载圈可稍快（1.2–1.5×）；成功勾可选播一次；微交互别过快导致「闪一下看不清」。",
      },
      {
        type: "demo",
        kind: "speed-loop",
        title: "动手：速度 / 循环",
        hint: "拖速度、切换循环，体感差异。",
      },
      {
        type: "code",
        title: "API",
        lang: "ts",
        code: `anim.setSpeed(1.5);
anim.loop = true; // 或 load 时 loop: true`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sl1",
            question: "setSpeed(2) 含义？",
            options: ["两倍速", "两帧", "循环两次", "倒放"],
            answer: 0,
            explain: "相对默认 1 的倍率。",
          },
          {
            id: "sl2",
            question: "成功勾动画通常？",
            options: ["无限循环", "播一次", "必须 10×", "禁止 pause"],
            answer: 1,
            explain: "完成反馈常 loop=false。",
          },
        ],
      },
    ],
  },
  {
    slug: "segments",
    title: "段落播放",
    summary: "playSegments · 同一文件多段 UI 状态。",
    level: "入门",
    track: "基础",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "为何段落",
        body: "一个 JSON 可含 intro / loop / outro。用 playSegments([in,out], force) 切段，比拆成多个文件更省请求。",
      },
      {
        type: "demo",
        kind: "segments",
        title: "动手：切段",
        hint: "点不同段落按钮。",
      },
      {
        type: "code",
        title: "段落",
        lang: "ts",
        code: `// force=true 打断当前播放
anim.playSegments([0, 30], true);
anim.playSegments([30, 60], true);`,
      },
      {
        type: "tip",
        body: "帧号难维护时改用 markers（见 markers 课）。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sg1",
            question: "playSegments 第二参 force？",
            options: ["强制打断当前", "强制循环", "强制 canvas", "无意义"],
            answer: 0,
            explain: "true 立刻切到新段。",
          },
          {
            id: "sg2",
            question: "段落帧号从哪来？",
            options: ["随便写", "AE 时间轴 / markers", "CSS", "随机"],
            answer: 1,
            explain: "与设计师对齐时间轴。",
          },
        ],
      },
    ],
  },
  {
    slug: "events",
    title: "事件回调",
    summary: "complete / loopComplete / enterFrame · 串联逻辑。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "关键事件",
        body: "DOMLoaded / data_ready：可开始控制。\ncomplete：非循环播完（串联下一步）。\nloopComplete：每圈一次。\nenterFrame：每帧，逻辑必须极轻。",
      },
      {
        type: "demo",
        kind: "events",
        title: "动手：看事件日志",
        hint: "观察 complete / loop 等输出。",
      },
      {
        type: "code",
        title: "订阅",
        lang: "ts",
        code: `anim.addEventListener("complete", () => goNext());
anim.addEventListener("loopComplete", () => count++);
// 卸载时 removeEventListener`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ev1",
            question: "串联「播完再请求」用？",
            options: ["enterFrame 狂轮询", "complete", "setSpeed", "fr 字段"],
            answer: 1,
            explain: "complete 表示一轮结束。",
          },
          {
            id: "ev2",
            question: "enterFrame 里应避免？",
            options: ["轻量读 currentFrame", "重 DOM 操作", "什么都不做", "日志节流"],
            answer: 1,
            explain: "每帧重活会掉帧。",
          },
        ],
      },
    ],
  },
  {
    slug: "hover-interact",
    title: "悬停交互",
    summary: "hover 播 · 触屏兜底 · 微反馈。",
    level: "进阶",
    track: "交互",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "模式",
        body: "桌面：mouseenter play / mouseleave stop 或反向。\n触屏无 hover：提供 click / focus 等价路径。",
      },
      {
        type: "demo",
        kind: "hover",
        title: "动手：悬停播放",
        hint: "移入播放，移出复位；点按亦可。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "hv1",
            question: "触屏设备 hover ？",
            options: ["永远可靠", "需 click/focus 兜底", "禁止 Lottie", "只能 GIF"],
            answer: 1,
            explain: "无持续 hover 状态。",
          },
          {
            id: "hv2",
            question: "离开时常见？",
            options: ["goToAndStop(0)", "删除节点", "setSpeed(99)", "location.reload"],
            answer: 0,
            explain: "复位到起始帧。",
          },
        ],
      },
    ],
  },
  {
    slug: "click-toggle",
    title: "点击切换",
    summary: "点赞 / 收藏 · 两态或段落。",
    level: "进阶",
    track: "交互",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "两态",
        body: "liked 用不同段落或不同 JSON；切换时 goToAndPlay 对应段。",
      },
      {
        type: "demo",
        kind: "click-toggle",
        title: "动手：点击切换",
        hint: "点动画在两态间切换。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ct1",
            question: "收藏态建议？",
            options: ["无限循环闪烁", "切到 liked 段并停/微循环", "必须视频", "禁止动画"],
            answer: 1,
            explain: "状态清晰可辨。",
          },
          {
            id: "ct2",
            question: "乐观 UI？",
            options: ["等服务器才动", "先切态再请求，失败回滚", "只能同步阻塞", "无"],
            answer: 1,
            explain: "微交互常见乐观更新。",
          },
        ],
      },
    ],
  },
  {
    slug: "scrub",
    title: "进度拖拽",
    summary: "scrub · goToAndStop · 与滑块同步。",
    level: "进阶",
    track: "交互",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "映射",
        body: "progress ∈ [0,1] → frame = ip + progress * (op-ip)；用 goToAndStop(frame, true)。",
      },
      {
        type: "demo",
        kind: "progress-scrub",
        title: "动手：拖进度",
        hint: "拖滑块看帧同步。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sc1",
            question: "scrub 主 API？",
            options: ["goToAndStop", "setSpeed only", "destroy", "alert"],
            answer: 0,
            explain: "停在指定帧。",
          },
          {
            id: "sc2",
            question: "拖动中是否持续 play？",
            options: ["通常 pause/stop 在帧上", "必须满速 play", "必须 Worker", "禁止"],
            answer: 0,
            explain: "用户拖进度时停在帧上。",
          },
        ],
      },
    ],
  },
  {
    slug: "multi-state",
    title: "多状态槽",
    summary: "idle / loading / success / error · 产品四态。",
    level: "进阶",
    track: "交互",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "模式",
        body: "A. 多 JSON 换源\nB. 单 JSON 多段落\nC. 官方 State Machine（见状态机课）\n空态也要有（empty）。",
      },
      {
        type: "demo",
        kind: "multi-state",
        title: "动手：四态切换",
        hint: "模拟请求成功/失败。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ms1",
            question: "loading 态常见？",
            options: ["loop 加载动画", "必须 error", "无动画", "只静态图永远"],
            answer: 0,
            explain: "等待反馈。",
          },
          {
            id: "ms2",
            question: "error 态应？",
            options: ["无反馈", "明确错误动画 + 可重试", "无限 loading", "白屏"],
            answer: 1,
            explain: "可恢复路径。",
          },
        ],
      },
    ],
  },
  {
    slug: "theme",
    title: "主题与色板",
    summary: "深浅色 · 品牌色 · 与 UI 一致。",
    level: "进阶",
    track: "进阶",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "策略",
        body: "1）导出两套 JSON\n2）运行时 recolor（本站 recolor 课）\n3）官方 theming/slots（.lottie 内主题）\n选 3 做设计系统；选 2 做简单图标。",
      },
      {
        type: "demo",
        kind: "theme",
        title: "动手：切换主题容器",
        hint: "背景/色板变化时动画是否仍和谐。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tm1",
            question: "设计系统多主题优先？",
            options: ["手改十份无关联 JSON", "dotLottie theming", "只 CSS filter 糊弄", "放弃动画"],
            answer: 1,
            explain: "官方主题链路。",
          },
          {
            id: "tm2",
            question: "简单单色图标？",
            options: ["必须 SM", "运行时 recolor 可", "必须 iOS", "必须 MCP"],
            answer: 1,
            explain: "小场景够用。",
          },
        ],
      },
    ],
  },
  {
    slug: "markers",
    title: "Markers 命名段",
    summary: "tm + cm · 告别魔法帧号。",
    level: "进阶",
    track: "进阶",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "为什么",
        body: "playSegments([12,48]) 难维护。AE 导出 markers（tm 帧 + cm 名称），运行时按名定位。",
      },
      {
        type: "demo",
        kind: "markers",
        title: "动手：按 marker 跳转",
        hint: "点命名标记。",
      },
      {
        type: "code",
        title: "查找",
        lang: "ts",
        code: `const m = data.markers?.find((x) => x.cm === "loop");
if (m) anim.goToAndPlay(m.tm, true);`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mk1",
            question: "cm 字段是？",
            options: ["颜色", "标记名称", "压缩率", "相机"],
            answer: 1,
            explain: "comment/name。",
          },
          {
            id: "mk2",
            question: "markers 优势？",
            options: ["设计与工程同名", "更大文件必然", "禁止循环", "只 Android"],
            answer: 0,
            explain: "协作契约。",
          },
        ],
      },
    ],
  },
  {
    slug: "direction",
    title: "倒放与方向",
    summary: "setDirection · bounce 模式对照。",
    level: "进阶",
    track: "进阶",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "方向",
        body: "lottie-web：setDirection(1|-1)。\ndotLottie：mode 可为 forward / reverse / bounce。\nbounce = 来回播，适合呼吸/弹性微动效。",
      },
      {
        type: "demo",
        kind: "direction",
        title: "动手：正放 / 倒放",
        hint: "切换方向观察。",
      },
      {
        type: "code",
        title: "dotLottie mode",
        lang: "ts",
        code: `new DotLottie({ canvas, src, mode: "bounce", loop: true });
// 或 setMode("reverse")`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "dr1",
            question: "setDirection(-1)？",
            options: ["倒放", "双倍速", "销毁", "改主题"],
            answer: 0,
            explain: "反向时间轴。",
          },
          {
            id: "dr2",
            question: "bounce 模式？",
            options: ["只播一帧", "来回播放", "必须 Worker", "仅 iOS"],
            answer: 1,
            explain: "forward+reverse 循环。",
          },
        ],
      },
    ],
  },
  {
    slug: "sequence",
    title: "串联编排",
    summary: "complete 链式 · 多段叙事。",
    level: "进阶",
    track: "进阶",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "编排",
        body: "A 播完 → B → C。用 complete 回调或 async 队列；注意卸载取消。",
      },
      {
        type: "demo",
        kind: "sequence",
        title: "动手：三段串联",
        hint: "看自动进入下一段。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sq1",
            question: "串联关键事件？",
            options: ["complete", "fr", "w/h", "v"],
            answer: 0,
            explain: "非循环结束。",
          },
          {
            id: "sq2",
            question: "卸载时？",
            options: ["继续队列", "取消监听与队列", "setSpeed(0)", "无"],
            answer: 1,
            explain: "防泄漏与 setState。",
          },
        ],
      },
    ],
  },
  {
    slug: "scroll-drive",
    title: "滚动与可见性",
    summary: "IntersectionObserver · 离屏 pause。",
    level: "进阶",
    track: "交互",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "策略",
        body: "进入视口 play，离开 pause。\ndotLottie 默认 renderConfig.freezeOnOffscreen 可冻结离屏渲染。",
      },
      {
        type: "demo",
        kind: "scroll-drive",
        title: "动手：滚动驱动",
        hint: "滚出视口应暂停。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sd1",
            question: "离屏仍 play 的问题？",
            options: ["更省电", "耗 CPU/电", "自动主题", "无"],
            answer: 1,
            explain: "浪费资源。",
          },
          {
            id: "sd2",
            question: "Web API？",
            options: ["IntersectionObserver", "alert", "eval", "document.write"],
            answer: 0,
            explain: "可见性检测。",
          },
        ],
      },
    ],
  },
  {
    slug: "renderer",
    title: "渲染器选择",
    summary: "svg vs canvas · 取舍。",
    level: "实战",
    track: "工程",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "取舍",
        body: "SVG：DOM、易 CSS/无障碍命中、复杂图层可能慢。\nCanvas：像素、粒子多更稳；dotlottie-web 走 canvas 核心。\n先 SVG，重场景再 canvas / Worker。",
      },
      {
        type: "demo",
        kind: "renderer",
        title: "动手：对比渲染路径",
        hint: "本站双运行时对照。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rd1",
            question: "UI 图标默认？",
            options: ["svg 优先", "必须 WebGL", "必须 GIF", "禁止 canvas"],
            answer: 0,
            explain: "清晰可交互。",
          },
          {
            id: "rd2",
            question: "dotlottie-web 主渲染？",
            options: ["canvas 核心", "仅 table", "仅 iframe", "仅 Flash"],
            answer: 0,
            explain: "高性能 canvas 管线。",
          },
        ],
      },
    ],
  },
  {
    slug: "optimize",
    title: "体积与优化",
    summary: "清图层 · 少位图 · 官方 Optimizer。",
    level: "实战",
    track: "工程",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "清单",
        body: "· 导出前清隐藏图层\n· 慎用位图，优先矢量\n· 表达式 bake\n· 列表勿每项巨型 Lottie\n· 官方 Lottie Optimizer / 转 .lottie 压缩\n· 哈希文件名缓存",
      },
      {
        type: "demo",
        kind: "optimize",
        title: "动手：体积意识",
        hint: "对比「元数据」与优化方向。",
      },
      {
        type: "tip",
        body: "工具：lottiefiles.com/tools/lottie-json-to-optimized-lottie-json · lottie-to-dotlottie。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "op1",
            question: "体积杀手常见？",
            options: ["markers 名", "大图 assets", "fr=30", "loop 布尔"],
            answer: 1,
            explain: "位图撑大。",
          },
          {
            id: "op2",
            question: "生产压缩优先？",
            options: ["改成 4K PNG 序列", "Optimizer / .lottie", "嵌 10 份字体", "开表达式"],
            answer: 1,
            explain: "官方工具链。",
          },
        ],
      },
    ],
  },
  {
    slug: "a11y",
    title: "无障碍",
    summary: "reduced-motion · 语义 · 焦点。",
    level: "实战",
    track: "工程",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "要点",
        body: "prefers-reduced-motion：静态帧或静态图。\n装饰动画 aria-hidden；信息性动画要文本等价。\n可点击区域足够大。",
      },
      {
        type: "demo",
        kind: "reduced-motion",
        title: "动手：减弱动态",
        hint: "模拟 reduced-motion。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "a1",
            question: "reduced-motion 时？",
            options: ["强制 10× 速", "静态/极简", "更大位图", "自动 MCP"],
            answer: 1,
            explain: "尊重系统偏好。",
          },
          {
            id: "a2",
            question: "纯装饰 Lottie？",
            options: ["aria-hidden=true", "必须 live region 每帧", "title=全部 JSON", "无"],
            answer: 0,
            explain: "避免噪音。",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: "性能工程",
    summary: "离屏 · destroy · Worker · 列表。",
    level: "实战",
    track: "工程",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "法则",
        body: "不可见 pause/destroy。\n列表虚拟化，勿 N 个重动画。\nDotLottieWorker 卸主线程。\nuseFrameInterpolation=false 可换性能。\n移动端进后台 pause。",
      },
      {
        type: "demo",
        kind: "worker-perf",
        title: "动手：性能开关对照",
        hint: "理解 Worker / 插值 / 离屏冻结。",
      },
      {
        type: "code",
        title: "Worker",
        lang: "ts",
        code: `import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

const a = new DotLottieWorker({
  canvas, src, autoplay: true, workerId: "w1",
});
await a.play(); // Worker API 多为 async`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pf1",
            question: "卸载必须？",
            options: ["destroy", "只 display:none", "忽略", "location.reload"],
            answer: 0,
            explain: "释放循环与 canvas。",
          },
          {
            id: "pf2",
            question: "多动画卡顿优先试？",
            options: ["DotLottieWorker", "删掉所有 pause", "eval", "同步 XHR"],
            answer: 0,
            explain: "卸主线程。",
          },
        ],
      },
    ],
  },
  {
    slug: "react-integration",
    title: "React 接入",
    summary: "lottie-react · SSR · 封装。",
    level: "实战",
    track: "工程",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "路径",
        body: "经典：lottie-react + lottie-web。\n官方：@lottiefiles/dotlottie-react。\nSSR：客户端挂载；dynamic ssr:false。\n封装：统一 size / reduced-motion / destroy。",
      },
      {
        type: "demo",
        kind: "framework-wc",
        title: "动手：框架 / CDN 选型",
        hint: "React / Vue / Svelte / WC 对照。",
      },
      {
        type: "code",
        title: "官方 React",
        lang: "tsx",
        code: `import { DotLottieReact } from "@lottiefiles/dotlottie-react";

<DotLottieReact src="/a.lottie" autoplay loop
  dotLottieRefCallback={(inst) => { ref.current = inst; }}
/>`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ri1",
            question: "官方 React 包？",
            options: ["@lottiefiles/dotlottie-react", "left-pad", "jquery", "无"],
            answer: 0,
            explain: "官方封装。",
          },
          {
            id: "ri2",
            question: "Next SSR？",
            options: ["任意 window 顶层 new", "客户端挂载", "必须 PHP", "禁止"],
            answer: 1,
            explain: "避免服务端 DOM。",
          },
        ],
      },
    ],
  },
  {
    slug: "workflow",
    title: "设计协作流",
    summary: "AE → 插件 → 评审 → 接入 → 回归。",
    level: "实战",
    track: "工程",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "流水线",
        body: "1. AE / Creator 出稿\n2. LottieFiles for AE（基于 Bodymovin）或 Creator 导出\n3. Previewer 验状态机/主题\n4. Optimizer / 转 .lottie\n5. 工程接入 + Feature Support\n6. 真机与 reduced-motion 回归",
      },
      {
        type: "demo",
        kind: "tool-chain",
        title: "动手：工具链地图",
        hint: "点选各阶段官方工具。",
      },
      {
        type: "tip",
        body: "Bodymovin 是导出技术底层；LottieFiles for AE 是官方插件（预览/分享/分析更完整）。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "wf1",
            question: "AE 官方导出插件？",
            options: ["LottieFiles for After Effects", "Photoshop only", "Excel", "无"],
            answer: 0,
            explain: "官方 AE 插件。",
          },
          {
            id: "wf2",
            question: "接入前建议？",
            options: ["跳过测试", "Previewer + 特性检查", "只看文件名", "随机"],
            answer: 1,
            explain: "减少线上翻车。",
          },
        ],
      },
    ],
  },
  {
    slug: "loading-ux",
    title: "加载 UX",
    summary: "骨架 · 超时 · 失败态。",
    level: "实战",
    track: "实战",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "体验",
        body: "首屏：小 loading Lottie 或骨架。\n超时：切 error + 重试。\nloadError 事件要接。",
      },
      {
        type: "demo",
        kind: "loading-ux",
        title: "动手：加载体验",
        hint: "模拟慢网与失败。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lu1",
            question: "动画 404 时？",
            options: ["白屏无提示", "loadError + 降级 UI", "死循环请求", "忽略"],
            answer: 1,
            explain: "优雅降级。",
          },
          {
            id: "lu2",
            question: "首屏大 Lottie？",
            options: ["永远内联 5MB", "懒加载 / 压缩 / 延后", "禁止 pause", "必须 60 个"],
            answer: 1,
            explain: "性能预算。",
          },
        ],
      },
    ],
  },
  {
    slug: "micro-interactions",
    title: "微交互",
    summary: "按钮 · 点赞 · 轻反馈时长。",
    level: "实战",
    track: "实战",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "原则",
        body: "短（200–600ms 体感）、可打断、不挡主路径、可 reduced-motion 关闭。",
      },
      {
        type: "demo",
        kind: "micro",
        title: "动手：微交互",
        hint: "快速点按反馈。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mi1",
            question: "微交互时长？",
            options: ["越长越好", "短而清晰", "必须 30s", "禁止"],
            answer: 1,
            explain: "不拖沓。",
          },
          {
            id: "mi2",
            question: "连点？",
            options: ["队列播 20 次", "可打断/合并", "崩溃", "忽略全部"],
            answer: 1,
            explain: "防堆积。",
          },
        ],
      },
    ],
  },
  {
    slug: "pitfalls",
    title: "常见坑",
    summary: "字体 · 蒙版 · destroy · CORS · 表达式。",
    level: "实战",
    track: "实战",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "坑列表",
        body: "· 字体未嵌入 → 错位/方框\n· 蒙版/效果导出丢失\n· 大图 assets\n· 未 destroy 泄漏\n· CDN 缓存旧 JSON\n· CORS 拦跨域\n· 表达式部分运行时不支持\n· 主线程掉帧",
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：排错清单",
        hint: "当作发布门禁。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pt1",
            question: "跨域 JSON 失败先查？",
            options: ["CORS / 路径", "改 React 版本", "关 HTTPS", "删 markers"],
            answer: 0,
            explain: "网络与权限。",
          },
          {
            id: "pt2",
            question: "组件卸载？",
            options: ["destroy", "不管", "double play", "setSpeed(99)"],
            answer: 0,
            explain: "防泄漏。",
          },
        ],
      },
    ],
  },
  {
    slug: "checklist",
    title: "上线清单",
    summary: "发布前 12 项自检。",
    level: "实战",
    track: "实战",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "清单",
        body: "1 体积预算\n2 真机抽检\n3 reduced-motion\n4 失败降级\n5 destroy\n6 离屏 pause\n7 哈希缓存\n8 Feature Support\n9 深色主题\n10 触屏路径\n11 许可合规\n12 无障碍文案",
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：勾选门禁",
        hint: "全部过再合并。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cl1",
            question: "上线前许可？",
            options: ["可忽略", "核对 Lottie Simple / 套餐商用", "必须开源全部", "无"],
            answer: 1,
            explain: "商用合规。",
          },
          {
            id: "cl2",
            question: "特性矩阵？",
            options: ["Feature Support Checker", "抛硬币", "只看颜色", "忽略 iOS"],
            answer: 0,
            explain: "官方检查器。",
          },
        ],
      },
    ],
  },
  {
    slug: "recolor-runtime",
    title: "运行时改色",
    summary: "遍历 fill/stroke · 工程 recolor。",
    level: "进阶",
    track: "进阶",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "适用",
        body: "几何图标、单色品牌。深度遍历 layers 改 fc/sc。渐变/复杂插图优先官方 theming。",
      },
      {
        type: "demo",
        kind: "recolor",
        title: "动手：改色预览",
        hint: "换 hex 看实时结果。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rc1",
            question: "recolor 改的是？",
            options: ["运行时 JSON 颜色", "服务器 OS", "DNS", "TLS"],
            answer: 0,
            explain: "内存中的动画数据。",
          },
          {
            id: "rc2",
            question: "复杂品牌主题更推荐？",
            options: ["只手写 filter", "官方 slots/theming", "禁止", "十份 GIF"],
            answer: 1,
            explain: "设计系统级。",
          },
        ],
      },
    ],
  },
  {
    slug: "kit-like",
    title: "组件：点赞开关",
    summary: "可复用 LikeToggle。",
    level: "实战",
    track: "组件",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "封装点",
        body: "状态、动画、无障碍标签、onChange 回调一次封装。",
      },
      {
        type: "demo",
        kind: "kit-like",
        title: "动手：点赞组件",
        hint: "来自 /kit。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "kl1",
            question: "组件库价值？",
            options: ["重复造轮子", "统一交互与 a11y", "更大包必然坏", "无"],
            answer: 1,
            explain: "一致性。",
          },
          {
            id: "kl2",
            question: "业务回调？",
            options: ["onChange", "eval", "document.write", "alert only"],
            answer: 0,
            explain: "标准受控/非受控扩展。",
          },
        ],
      },
    ],
  },
  {
    slug: "kit-async",
    title: "组件：异步四态槽",
    summary: "AsyncSlot · 请求态映射。",
    level: "实战",
    track: "组件",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "映射",
        body: "idle→loading→success|error。超时与重试是产品逻辑，动画只是皮肤。",
      },
      {
        type: "demo",
        kind: "kit-async",
        title: "动手：异步槽",
        hint: "模拟请求。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ka1",
            question: "四态最少包括？",
            options: ["idle/load/ok/err", "只有 play", "只有 pause", "只有 fr"],
            answer: 0,
            explain: "完整异步体验。",
          },
          {
            id: "ka2",
            question: "超时？",
            options: ["永远 loading", "切 error 可重试", "崩溃", "忽略"],
            answer: 1,
            explain: "可恢复。",
          },
        ],
      },
    ],
  },
  {
    slug: "interview-lottie",
    title: "面试要点",
    summary: "原理 · 取舍 · 性能 · 生态。",
    level: "实战",
    track: "实战",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "高频",
        body: "JSON 矢量时间轴 vs GIF/视频；播放控制；段落/markers；a11y；性能 destroy/离屏；dotLottie 主题与状态机；特性支持差异。",
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：自检题",
        hint: "能否讲清取舍。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "iv1",
            question: "Lottie 本质？",
            options: ["视频编解码", "矢量动画 JSON + 运行时", "仅 CSS", "仅 GIF"],
            answer: 1,
            explain: "描述 + 原生绘制。",
          },
          {
            id: "iv2",
            question: "dotLottie 相对 JSON？",
            options: ["不能压缩", "可打包多动画/主题/SM", "只能 Android", "禁止 Web"],
            answer: 1,
            explain: "生产格式。",
          },
        ],
      },
    ],
  },
  {
    slug: "layer-types",
    title: "图层类型深潜",
    summary: "ty 0–5 · 预合成 / 形状 / 图片 / 文本 · schema。",
    level: "进阶",
    track: "进阶",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "ty 枚举",
        body: "顶层 Animation：v/fr/ip/op/w/h/assets/layers/markers/slots…\nty：0 预合成 · 1 纯色 · 2 图片 · 3 空 · 4 形状 · 5 文本 · 6 音频 · 13 相机…\n详见 LottieDocs Schema。",
      },
      {
        type: "demo",
        kind: "layer-map",
        title: "动手：读 layers",
        hint: "切换动画看 ty。",
      },
      {
        type: "tip",
        body: "人类可读：lottiefiles.github.io/lottie-docs/（贝塞尔、预合成、渲染提示）。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ly1",
            question: "ty=4 通常是？",
            options: ["形状层", "音频", "相机", "字体文件"],
            answer: 0,
            explain: "shape layer。",
          },
          {
            id: "ly2",
            question: "预合成 ty？",
            options: ["0", "99", "7", "-1"],
            answer: 0,
            explain: "precomp。",
          },
        ],
      },
    ],
  },
  {
    slug: "lottie-vs-dotlottie",
    title: "JSON vs dotLottie",
    summary: "单文件 JSON 与 .lottie 压缩包 · 何时升级。",
    level: "入门",
    track: "生态",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "对照",
        body: "JSON：明文、易 diff、单动画为主。\n.lottie：ZIP+Deflate，可多动画、主题、状态机、资源内嵌；官方首选生产格式。\n玩家均可播两者。",
      },
      {
        type: "demo",
        kind: "dotlottie",
        title: "动手：双运行时",
        hint: "同一 JSON 用两条管线。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "vd1",
            question: ".lottie 实质？",
            options: ["MP4", "压缩归档", "EXE", "CSV"],
            answer: 1,
            explain: "ZIP 系归档。",
          },
          {
            id: "vd2",
            question: "需要主题+SM 时？",
            options: ["坚持裸 JSON 复制 N 份", "升级 .lottie", "改 GIF", "关动画"],
            answer: 1,
            explain: "生产能力。",
          },
        ],
      },
    ],
  },
  {
    slug: "dotlottie-intro",
    title: "dotLottie 导读",
    summary: "多动画 · 主题 · 状态机 · 生产格式。",
    level: "进阶",
    track: "生态",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "核心能力",
        body: "1）Multi-animations：一个文件多个动画，按需解压。\n2）Theming：slots/主题切换颜色与属性。\n3）State Machines：无代码/低代码交互图。\n规范：dotlottie.io/spec/2.0/（推荐 v2）。",
      },
      {
        type: "demo",
        kind: "dotlottie",
        title: "动手：DotLottie canvas",
        hint: "本站用官方包渲染。",
      },
      {
        type: "tip",
        body: "设计侧 Creator 做 SM 与主题；工程侧 setTheme / loadStateMachine / loadAnimation。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "di1",
            question: "状态机主要解决？",
            options: ["压缩算法", "交互状态与过渡", "只改 fr", "替换 React"],
            answer: 1,
            explain: "交互状态图。",
          },
          {
            id: "di2",
            question: "主题切换更推荐？",
            options: ["复制 10 份 JSON 手改", "dotLottie theming / slots", "每次重导 GIF", "忽略深色模式"],
            answer: 1,
            explain: "单文件多主题。",
          },
        ],
      },
    ],
  },
  {
    slug: "dotlottie-player",
    title: "官方 Web 播放器",
    summary: "DotLottie API · 事件 · layout · Worker。",
    level: "实战",
    track: "工程",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "安装与核心",
        body: "npm i @lottiefiles/dotlottie-web\nnew DotLottie({ canvas, src|data, loop, autoplay, mode, themeId, layout, renderConfig })\n方法：play/pause/stop/setSpeed/setLoop/setMode/setFrame/setSegment/setTheme/loadAnimation…\n事件：load/play/complete/loop/frame/loadError/stateEntered…\n卸载：destroy()。",
      },
      {
        type: "demo",
        kind: "dotlottie",
        title: "动手：官方玩家",
        hint: "对比 LottiePlayer 与 DotLottiePlayer。",
      },
      {
        type: "code",
        title: "最小示例",
        lang: "ts",
        code: `import { DotLottie } from "@lottiefiles/dotlottie-web";

const dotLottie = new DotLottie({
  canvas: document.querySelector("#c")!,
  src: "/anim.json", // or .lottie
  autoplay: true,
  loop: true,
  layout: { fit: "contain", align: [0.5, 0.5] },
});
dotLottie.addEventListener("loadError", (e) => console.error(e));
// unmount: dotLottie.destroy()`,
      },
      {
        type: "tip",
        body: "框架封装自动 destroy；手动实例必须自己清。CDN：jsDelivr ESM 亦可。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "dp1",
            question: "卸载时必须？",
            options: ["忽略", "destroy()", "只 hide canvas", "location.reload"],
            answer: 1,
            explain: "释放 canvas 与循环。",
          },
          {
            id: "dp2",
            question: "play 应在？",
            options: ["任意时刻乱调", "load 之后", "仅 SSR", "仅 Node"],
            answer: 1,
            explain: "资源就绪后。",
          },
        ],
      },
    ],
  },
  {
    slug: "layout-fit",
    title: "Layout 与适配",
    summary: "fit · align · backgroundColor · 画布。",
    level: "进阶",
    track: "工程",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "layout",
        body: "fit：contain（默认）| cover | fill | fit-width | fit-height | none\nalign：[x,y]，[0,0] 左上，[0.5,0.5] 居中\nbackgroundColor：画布底色\nCSS 负责外框尺寸，layout 负责动画如何落入 canvas。",
      },
      {
        type: "demo",
        kind: "layout-fit",
        title: "动手：fit 模式对照",
        hint: "切换 contain/cover/fill 理解裁切。",
      },
      {
        type: "code",
        title: "配置",
        lang: "ts",
        code: `new DotLottie({
  canvas, src,
  layout: { fit: "cover", align: [0.5, 1] },
  backgroundColor: "#0b0b0f",
});`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lf1",
            question: "完整显示不裁切优先？",
            options: ["contain", "cover 必裁", "fill 必变形", "none 拉伸随意"],
            answer: 0,
            explain: "letterbox。",
          },
          {
            id: "lf2",
            question: "align [0.5,0.5]？",
            options: ["居中", "左上", "右下", "无效"],
            answer: 0,
            explain: "中心对齐。",
          },
        ],
      },
    ],
  },
  {
    slug: "multi-animation",
    title: "多动画清单",
    summary: "manifest.animations · loadAnimation。",
    level: "进阶",
    track: "生态",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "能力",
        body: "一个 .lottie 可含多个动画 id。load 后读 manifest.animations，用 loadAnimation(id) 切换，按需解压省 CPU。",
      },
      {
        type: "demo",
        kind: "multi-anim",
        title: "动手：多动画概念台",
        hint: "模拟清单切换（教学用本地多 JSON 类比）。",
      },
      {
        type: "code",
        title: "切换",
        lang: "ts",
        code: `dotLottie.addEventListener("load", () => {
  const list = dotLottie.manifest?.animations ?? [];
  if (list[0]) dotLottie.loadAnimation(list[0].id);
});`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ma1",
            question: "切换包内动画 API？",
            options: ["loadAnimation(id)", "alert", "eval", "setTimeout only"],
            answer: 0,
            explain: "官方 API。",
          },
          {
            id: "ma2",
            question: "为何打包多动画？",
            options: ["故意更大", "一次分发/按需解压", "禁止主题", "只 GIF"],
            answer: 1,
            explain: "交付与性能。",
          },
        ],
      },
    ],
  },
  {
    slug: "theming-slots",
    title: "官方主题与 slots",
    summary: "token 主题 · setTheme · 对比 recolor。",
    level: "进阶",
    track: "生态",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "两条路",
        body: "A. 工程 recolor：遍历 fill/stroke。\nB. 官方 Theming：设计时 slots/主题，运行时 setTheme('dark') / themeId，支持更多属性，打进 .lottie。",
      },
      {
        type: "demo",
        kind: "recolor",
        title: "动手：工程改色（本站）",
        hint: "官方主题需内置 themes 的 .lottie；此处建立直觉。",
      },
      {
        type: "code",
        title: "官方 API",
        lang: "ts",
        code: `new DotLottie({ canvas, src: "brand.lottie", themeId: "dark" });
dotLottie.setTheme("light");
dotLottie.resetTheme();`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "th1",
            question: "设计系统多主题优先？",
            options: ["每次导出 N 份无关联 JSON", "dotLottie theming / slots", "只用 CSS filter", "禁止动画"],
            answer: 1,
            explain: "官方主题链路。",
          },
          {
            id: "th2",
            question: "简单单色图标？",
            options: ["只能 Creator", "运行时 recolor 也可", "必须状态机", "必须 Worker"],
            answer: 1,
            explain: "小场景够用。",
          },
        ],
      },
    ],
  },
  {
    slug: "state-machines",
    title: "状态机概念",
    summary: "states · transitions · inputs · 与手写对照。",
    level: "进阶",
    track: "交互",
    minutes: 11,
    blocks: [
      {
        type: "text",
        title: "官方模型",
        body: "State Machines：状态、迁移、触发（click/hover/数据）。\n玩家：loadStateMachine(id) → startStateMachine() → postEvent(...)。\n事件：stateEntered / transition。\nCreator 可视化编辑，跨端同一逻辑。",
      },
      {
        type: "demo",
        kind: "state-machine",
        title: "动手：概念对照",
        hint: "左侧手写 React 状态；右侧官方 SM 职责。",
      },
      {
        type: "code",
        title: "玩家侧",
        lang: "ts",
        code: `dotLottie.addEventListener("load", () => {
  if (dotLottie.loadStateMachine("my-fsm")) {
    dotLottie.startStateMachine();
  }
});
dotLottie.postEvent("String: click");`,
      },
      {
        type: "tip",
        body: "无 .lottie SM 时，React 状态 + playSegments 仍是正确工程实践。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sm1",
            question: "postEvent 用于？",
            options: ["压缩 JSON", "驱动状态机迁移", "改 basepath", "生成 GIF"],
            answer: 1,
            explain: "向 SM 投递输入/事件。",
          },
          {
            id: "sm2",
            question: "无官方 SM 文件时？",
            options: ["无法做交互", "应用层状态机 + 段落/多源仍可", "必须原生 App", "只能 hover"],
            answer: 1,
            explain: "本站多课即此模式。",
          },
        ],
      },
    ],
  },
  {
    slug: "dotlottie-js",
    title: "dotLottie-JS 打包",
    summary: "程序化创建 .lottie · 主题 · 状态机。",
    level: "实战",
    track: "工程",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "定位",
        body: "@dotlottie/dotlottie-js：在 Node/浏览器创建与修改 .lottie（v2）。\naddAnimation / addTheme / addStateMachine → build() → toBlob/download。\nCI 可把多 JSON 打成生产包。",
      },
      {
        type: "demo",
        kind: "dotlottie-js",
        title: "动手：打包流水线示意",
        hint: "步骤卡：加动画 → 主题 → SM → build。",
      },
      {
        type: "code",
        title: "创建包",
        lang: "ts",
        code: `import { DotLottie } from "@dotlottie/dotlottie-js";

const dl = new DotLottie();
dl.addAnimation({ id: "main", data: lottieJson, loop: true });
dl.addTheme({ id: "dark", data: themeDark });
dl.addStateMachine({ id: "btn", data: smJson });
await dl.build();
const blob = await dl.toBlob();`,
      },
      {
        type: "tip",
        body: "fromURL / fromArrayBuffer 可加载既有包；merge 合并多实例（id 冲突会抛错）。V1 类无主题/SM。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "dj1",
            question: "导出前必须？",
            options: ["build()", "只 console.log", "删 animations", "关网络"],
            answer: 0,
            explain: "finalize 归档。",
          },
          {
            id: "dj2",
            question: "包内加主题？",
            options: ["addTheme", "setInterval", "alert", "CSS only 永久"],
            answer: 0,
            explain: "程序化主题。",
          },
        ],
      },
    ],
  },
  {
    slug: "relottie",
    title: "reLottie 与 LAST",
    summary: "AST 管线 · 元数据 · 安全表达式标记。",
    level: "实战",
    track: "工程",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "是什么",
        body: "reLottie 基于 unified：parse → transform → stringify。\nLAST = Lottie AST（unist）。\n插件：metadata、extract-features、自定义改 fr/颜色。\nRoot.hasExpressions 提示表达式安全风险。",
      },
      {
        type: "demo",
        kind: "relottie-pipe",
        title: "动手：管线示意",
        hint: "parse → plugin → stringify。",
      },
      {
        type: "code",
        title: "元数据",
        lang: "ts",
        code: `import { relottie } from "@lottiefiles/relottie";
import relottieMetadata from "@lottiefiles/relottie-metadata";

const file = await relottie()
  .use(relottieMetadata)
  .process(lottieJsonString);
console.log(file.data.metadata);`,
      },
      {
        type: "tip",
        body: "CLI：@lottiefiles/relottie-cli。表达式不会被 reLottie 执行，但播放器若执行则危险——用 hasExpressions 门禁。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "rl1",
            question: "LAST 是？",
            options: ["视频格式", "Lottie 抽象语法树", "仅 CSS", "DNS 记录"],
            answer: 1,
            explain: "AST。",
          },
          {
            id: "rl2",
            question: "hasExpressions 用途？",
            options: ["加速 GIF", "安全/兼容门禁", "改域名", "无"],
            answer: 1,
            explain: "识别表达式风险。",
          },
        ],
      },
    ],
  },
  {
    slug: "expressions-security",
    title: "表达式与安全",
    summary: "expressions · 兼容 · 不可信资源。",
    level: "实战",
    track: "工程",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "风险",
        body: "AE 表达式导出后，部分运行时不支持或性能差。\n若运行时执行表达式，不可信 Lottie 可能带来安全问题。\n策略：设计侧 bake；CI 用 reLottie 检测；Feature Support 核对。",
      },
      {
        type: "demo",
        kind: "expr-security",
        title: "动手：风险清单",
        hint: "发布前勾选。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ex1",
            question: "不可信动画来源？",
            options: ["盲目执行一切", "检测表达式 + 沙箱/拒绝", "eval 包一层", "关 HTTPS"],
            answer: 1,
            explain: "纵深防御。",
          },
          {
            id: "ex2",
            question: "兼容优先？",
            options: ["全依赖表达式", "bake 关键动画", "只 iOS 表达式", "忽略矩阵"],
            answer: 1,
            explain: "跨端稳定。",
          },
        ],
      },
    ],
  },
  {
    slug: "platform-map",
    title: "跨端玩家地图",
    summary: "Web / iOS / Android / RN · 选型。",
    level: "实战",
    track: "生态",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "官方矩阵",
        body: "Web: dotlottie-web / react / vue / svelte / wc\nMobile: dotlottie-ios / android / react-native\n历史：lottie-ios / lottie-android / lottie-web 仍广泛\nFlutter 等见 Developer Portal。\nRN 需 metro 识别 .lottie；iOS 用 SPM；Android JitPack。",
      },
      {
        type: "demo",
        kind: "platform-matrix",
        title: "动手：选型表",
        hint: "按平台点选推荐包名。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pm1",
            question: "React Web 官方新玩家？",
            options: ["@lottiefiles/dotlottie-react", "left-pad", "只允许 CDN jQuery", "无"],
            answer: 0,
            explain: "官方 React 封装。",
          },
          {
            id: "pm2",
            question: "特性是否各端一致？",
            options: ["永远 100% 一致", "要用 Feature Support 核对", "只有 GIF 一致", "iOS 不支持 Lottie"],
            answer: 1,
            explain: "表达式/效果等有差异。",
          },
        ],
      },
    ],
  },
  {
    slug: "framework-players",
    title: "框架封装与 CDN",
    summary: "React/Vue/Svelte/WC · 属性对照。",
    level: "实战",
    track: "工程",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "共性 props",
        body: "src / data / autoplay / loop / speed / mode / segment / backgroundColor / themeId / useFrameInterpolation / renderConfig\nReact：dotLottieRefCallback\nVue：getDotLottieInstance()\nSvelte：dotLottieRefCallback\nWC：<dotlottie-player> + el.dotLottie",
      },
      {
        type: "demo",
        kind: "framework-wc",
        title: "动手：封装对照",
        hint: "选框架看接入片段。",
      },
      {
        type: "code",
        title: "Web Component",
        lang: "html",
        code: `<script type="module"
  src="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@latest/dist/dotlottie-web.js">
</script>
<dotlottie-player src="a.lottie" autoplay loop
  style="width:200px;height:200px"></dotlottie-player>`,
      },
      {
        type: "quiz",
        questions: [
          {
            id: "fw1",
            question: "无框架页面可用？",
            options: ["dotlottie-wc / CDN", "必须 React", "必须 Swift", "必须 Excel"],
            answer: 0,
            explain: "Web Component。",
          },
          {
            id: "fw2",
            question: "封装卸载？",
            options: ["框架自动 destroy", "永不清理", "必须手动 eval", "无 API"],
            answer: 0,
            explain: "官方封装处理。",
          },
        ],
      },
    ],
  },
  {
    slug: "feature-support",
    title: "特性支持与取舍",
    summary: "表达式 · 遮罩 · 字体 · 兼容性检查。",
    level: "实战",
    track: "工程",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "工程清单",
        body: "导出前：避免不支持效果；字体嵌入或降级；位图压缩。\n接入前：Feature Support Checker + 真机。\n运行时：reduced-motion、离屏 pause、失败态。\nLAC Spec = 跨实现最小兼容集；完整能力看 LottieDocs schema。",
      },
      {
        type: "demo",
        kind: "challenge",
        title: "动手：兼容自检",
        hint: "当发布门禁。",
      },
      {
        type: "tip",
        body: "help.lottiefiles.com · Feature Support Checker。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "fs1",
            question: "复杂表达式风险？",
            options: ["无风险", "部分运行时不支持或性能差", "自动变 GIF", "只影响文件名"],
            answer: 1,
            explain: "需核对支持矩阵。",
          },
          {
            id: "fs2",
            question: "字体问题表现？",
            options: ["更清晰", "错位/方框/回退字体", "自动加 markers", "强制 canvas"],
            answer: 1,
            explain: "需嵌入或改设计。",
          },
        ],
      },
    ],
  },
  {
    slug: "tools-converters",
    title: "官方工具与转换",
    summary: "Creator · Editor · Optimizer · 转换器。",
    level: "入门",
    track: "生态",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "工具箱",
        body: "Creator：时间轴 + AI Motion Copilot + 可视化 SM/主题\nEditor：在线改色/优化\nPreviewer：状态机与主题预览\n转换：SVG→Lottie · Lottie→dotLottie · Optimizer · Lottie→GIF\nAI：Prompt→Vector、栅格转矢量",
      },
      {
        type: "demo",
        kind: "tool-chain",
        title: "动手：工具链导航",
        hint: "每个节点对应官网能力。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tc1",
            question: "JSON 瘦身官方工具？",
            options: ["Lottie Optimizer", "删掉 play", "关 WiFi", "改扩展名 .mp4"],
            answer: 0,
            explain: "官方优化器。",
          },
          {
            id: "tc2",
            question: "要 .lottie 生产包？",
            options: ["Lottie to dotLottie 转换 / JS 打包", "只能手写 ZIP 魔改", "禁止", "改 MIME 即可"],
            answer: 0,
            explain: "官方转换或 dotlottie-js。",
          },
        ],
      },
    ],
  },
  {
    slug: "integrations",
    title: "集成与插件",
    summary: "Figma · Webflow · Framer · Canva · AE。",
    level: "入门",
    track: "生态",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "插件目录",
        body: "Figma：设计稿内导入导出管理\nWebflow / Framer：站点无代码嵌入\nCanva：平面设计使用\nAE：导出主路径\n完整目录：lottiefiles.com/integrations",
      },
      {
        type: "demo",
        kind: "integrations",
        title: "动手：集成地图",
        hint: "按角色选工具。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ig1",
            question: "设计师在 Figma？",
            options: ["LottieFiles Figma 插件", "必须写 C++", "禁止", "只用 Excel"],
            answer: 0,
            explain: "官方 Figma 插件。",
          },
          {
            id: "ig2",
            question: "无代码建站？",
            options: ["Webflow/Framer 插件", "必须汇编", "只能邮件", "无"],
            answer: 0,
            explain: "官方集成。",
          },
        ],
      },
    ],
  },
  {
    slug: "mcp-ai",
    title: "MCP 与 AI 代理",
    summary: "LottieFiles MCP · Creator MCP · llms.txt。",
    level: "实战",
    track: "生态",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "官方 AI 入口",
        body: "1）站点 llms.txt：给 LLM 的结构化索引（平台 / 开发者 / players / js / relottie）\n2）远程 MCP：https://mcp.lottiefiles.com/mcp · OAuth 2.1+PKCE · 工具 operations_list / schema_search / schema_details / graphql_execute\n3）Creator MCP：本地创作层（图层/关键帧）\n4）本站 llms.txt：课程索引，规范仍以官方为准",
      },
      {
        type: "demo",
        kind: "mcp-tools",
        title: "动手：MCP 工具卡",
        hint: "理解四个远程工具职责。",
      },
      {
        type: "code",
        title: "官方 llms 入口",
        lang: "txt",
        code: `https://lottiefiles.com/llms.txt
https://developers.lottiefiles.com/llms.txt
https://developers.lottiefiles.com/dotlottie-players-web-llms.txt
https://developers.lottiefiles.com/dotlottie-players-mobile-llms.txt
https://developers.lottiefiles.com/dotlottiejs-llms.txt
https://developers.lottiefiles.com/relottie-llms.txt
https://docs.lottiefiles.com/en/platform/mcp`,
      },
      {
        type: "tip",
        body: "爬取动画做竞品库被 ToS / Simple License 禁止。尊重 rate limit。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mc1",
            question: "远程 MCP 作用？",
            options: ["让 AI 用自然语言查工作区/GraphQL", "替代 HTTPS", "压缩视频", "屏蔽一切爬虫"],
            answer: 0,
            explain: "官方 MCP 服务器。",
          },
          {
            id: "mc2",
            question: "llms.txt？",
            options: ["给 LLM 的站点索引", "TLS 证书", "仅人类 PDF", "病毒"],
            answer: 0,
            explain: "llmstxt.org 约定。",
          },
        ],
      },
    ],
  },
  {
    slug: "licensing",
    title: "许可与商用",
    summary: "Lottie Simple License · 套餐 · 合规。",
    level: "实战",
    track: "实战",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "要点",
        body: "Lottie Simple License：免费动画通常可商用、修改、分发，无需署名；不可用于打造竞争动画库/同类服务。\nMarketplace / 套餐：Team/Org/Enterprise 含完整商用授权；Individual 偏个人/非商用——以官网定价页为准。\n上线前记录资源来源与许可。",
      },
      {
        type: "demo",
        kind: "license-card",
        title: "动手：许可检查卡",
        hint: "发布前自问三件事。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "lc1",
            question: "Simple License 禁止？",
            options: ["合理商用 UI", "做竞争动画库服务", "修改颜色", "内部分发"],
            answer: 1,
            explain: "竞品库/同类服务受限。",
          },
          {
            id: "lc2",
            question: "商用套餐以？",
            options: ["聊天记录", "官网 Pricing / 资产许可页", "猜", "忽略"],
            answer: 1,
            explain: "官方条款为准。",
          },
        ],
      },
    ],
  },
  {
    slug: "ecosystem",
    title: "官方生态与 llms.txt",
    summary: "六份官方 llms · 本站索引 · 不落后官网。",
    level: "入门",
    track: "生态",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "发现官方知识",
        body: "LottieFiles 平台 llms.txt：产品/格式/状态机/主题/玩家/MCP/集成/许可\nDeveloper Portal llms.txt：格式 · reLottie · players · dotlottie-js\n拆分 llms：web players / mobile players / dotlottiejs / relottie\n格式：LottieDocs + LAC Spec + JSON Schema + dotLottie v2\n本站：/learning-Lottie/llms.txt",
      },
      {
        type: "demo",
        kind: "official-map",
        title: "动手：官方索引地图",
        hint: "点开各类权威源。",
      },
      {
        type: "tip",
        body: "学习站覆盖「概念 + 可交互 + 工程决策」；规范细节永远链官方 schema/spec。冲突时以官方为准。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ec1",
            question: "llms.txt 作用？",
            options: ["屏蔽爬虫", "给 LLM 结构化站点索引", "替代 HTTPS", "压缩视频"],
            answer: 1,
            explain: "AI 友好站点地图。",
          },
          {
            id: "ec2",
            question: "格式细节冲突时？",
            options: ["以博客为准", "以官方 schema/spec 为准", "以聊天记录为准", "随机"],
            answer: 1,
            explain: "权威源优先。",
          },
        ],
      },
    ],
  },
];

export const TRACKS = ["基础", "进阶", "交互", "工程", "实战", "组件", "生态"] as const;

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
