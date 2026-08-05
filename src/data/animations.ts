/** Local animation assets under /public/animations */
export const ANIMATIONS = {
  pulse: "/animations/pulse.json",
  progress: "/animations/progress.json",
  loading: "/animations/loading.json",
  success: "/animations/success.json",
  empty: "/animations/empty.json",
  confetti: "/animations/confetti.json",
  error: "/animations/error.json",
  rocket: "/animations/rocket.json",
  heart: "/animations/heart.json",
  like: "/animations/like.json",
} as const;

export type AnimationKey = keyof typeof ANIMATIONS;

export const PLAYGROUND_PRESETS: {
  id: AnimationKey;
  label: string;
  desc: string;
}[] = [
  { id: "pulse", label: "脉冲圆", desc: "最简几何 · 理解循环与透明度" },
  { id: "progress", label: "进度条", desc: "时间轴驱动的属性动画" },
  { id: "loading", label: "加载", desc: "常见 Loading 反馈" },
  { id: "success", label: "成功", desc: "完成态反馈" },
  { id: "empty", label: "空状态", desc: "Empty State 插画" },
  { id: "heart", label: "点赞心", desc: "微交互经典" },
  { id: "confetti", label: "彩带", desc: "庆祝时刻" },
  { id: "error", label: "错误", desc: "失败态反馈" },
  { id: "rocket", label: "火箭", desc: "开屏 / 引导" },
];
