import {
  Award,
  BookMarked,
  BookOpen,
  BookX,
  Boxes,
  Code2,
  FlaskConical,
  LayoutDashboard,
  Library,
  Map,
  Images,
  Server,
  type LucideIcon,
} from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { LESSONS, TRACKS } from "@/data/lessons";

export const TRACK_META: Record<
  Lesson["track"],
  { order: number; label: string; blurb: string }
> = {
  基础: { order: 1, label: "① 入门", blurb: "格式 · 播放 · 段落 · 事件" },
  进阶: { order: 2, label: "② 进阶", blurb: "主题 · markers · 改色 · 图层" },
  交互: { order: 3, label: "③ 交互", blurb: "hover · 状态 · scrub · 滚动" },
  工程: { order: 4, label: "④ 工程", blurb: "a11y · 性能 · React · 工作流" },
  实战: { order: 5, label: "⑤ 实战", blurb: "加载 · 微交互 · 上线 · 面试" },
  组件: { order: 6, label: "⑥ 组件", blurb: "可复用点赞 / 四态" },
  生态: { order: 7, label: "⑦ 生态", blurb: "dotLottie · 工具 · MCP · 许可" },
};

export function trackLabel(track: string) {
  return (TRACK_META as Record<string, { label: string }>)[track]?.label ?? track;
}

export function orderedTracks(): Lesson["track"][] {
  return [...TRACKS].sort(
    (a, b) =>
      ((TRACK_META as Record<string, { order: number }>)[a]?.order ?? 99) -
      ((TRACK_META as Record<string, { order: number }>)[b]?.order ?? 99),
  );
}

export function getValidCompleted(completed: string[]): string[] {
  const set = new Set(LESSONS.map((l) => l.slug));
  return completed.filter((s) => set.has(s));
}

export function completedCount(completed: string[]): number {
  return getValidCompleted(completed).length;
}

export function progressPercent(completed: string[]): number {
  if (!LESSONS.length) return 0;
  return Math.round((completedCount(completed) / LESSONS.length) * 100);
}

export function isAllComplete(completed: string[]): boolean {
  return LESSONS.every((l) => completed.includes(l.slug));
}

export function getContinueLesson(completed: string[]): Lesson {
  return (
    LESSONS.find((l) => !completed.includes(l.slug)) ??
    LESSONS[LESSONS.length - 1]!
  );
}

export function getContinueHref(completed: string[]): {
  kind: "lesson" | "certificate";
  slug?: string;
} {
  if (isAllComplete(completed)) return { kind: "certificate" };
  return { kind: "lesson", slug: getContinueLesson(completed).slug };
}

export type NavItem = {
  to:
    | "/"
    | "/docs"
    | "/cheatsheet"
    | "/studio"
    | "/playground"
    | "/lab"
    | "/hub"
    | "/mistakes"
    | "/certificate"
    | "/gallery"
    | "/kit"
    | "/ecosystem";
  label: string;
  hint?: string;
  icon: LucideIcon;
};

export const NAV_PRIMARY: NavItem[] = [
  { to: "/docs", label: "文档", hint: "查 · 官方 llms 对照", icon: Library },
  { to: "/studio", label: "工坊", hint: "练 · 动画闯关", icon: Server },
  { to: "/hub", label: "进度", hint: "我 · 学习中心", icon: LayoutDashboard },
];

export const NAV_TOOLS: NavItem[] = [
  { to: "/playground", label: "Playground", hint: "播放器试验", icon: Code2 },
  { to: "/gallery", label: "图鉴", hint: "产品模式", icon: Images },
  { to: "/kit", label: "组件库", hint: "可复制组件", icon: Boxes },
  { to: "/ecosystem", label: "生态地图", hint: "官方六份 llms", icon: Map },
  { to: "/cheatsheet", label: "速查表", hint: "API 扫一眼", icon: BookMarked },
  { to: "/lab", label: "练习场", hint: "刷测验题", icon: FlaskConical },
  { to: "/mistakes", label: "错题本", hint: "错题重练", icon: BookX },
  { to: "/certificate", label: "结业证书", hint: "掌握后解锁", icon: Award },
];

export const NAV_HOME: NavItem = {
  to: "/",
  label: "学 · 首页",
  hint: "路径与大纲",
  icon: BookOpen,
};
