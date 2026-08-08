import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ANIMATIONS } from "@/data/animations";
import { LottiePlayer } from "@/components/LottiePlayer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Images, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

type Pattern = {
  id: string;
  title: string;
  desc: string;
  when: string;
  anim: keyof typeof ANIMATIONS;
  loop: boolean;
  lesson?: string;
};

const PATTERNS: Pattern[] = [
  {
    id: "loading",
    title: "加载反馈",
    desc: "请求进行中的循环动画，完成后立刻切成功/错误。",
    when: "列表刷新、提交表单、骨架之后的短等待",
    anim: "loading",
    loop: true,
    lesson: "loading-ux",
  },
  {
    id: "success",
    title: "成功确认",
    desc: "一次性播放，complete 后可跳转或关闭。",
    when: "支付成功、保存完成、任务勾选",
    anim: "success",
    loop: false,
    lesson: "multi-state",
  },
  {
    id: "error",
    title: "错误提示",
    desc: "失败态要克制；可搭配文案与重试按钮。",
    when: "网络错误、校验失败、权限不足",
    anim: "error",
    loop: false,
    lesson: "multi-state",
  },
  {
    id: "empty",
    title: "空状态",
    desc: "无数据时的插画，循环要慢、勿抢注意力。",
    when: "空收件箱、无搜索结果、新账号首页",
    anim: "empty",
    loop: true,
    lesson: "micro-interactions",
  },
  {
    id: "like",
    title: "点赞微交互",
    desc: "状态在 React，动画只表现；注意连点锁。",
    when: "收藏、喜欢、关注",
    anim: "heart",
    loop: false,
    lesson: "click-toggle",
  },
  {
    id: "celebrate",
    title: "庆祝时刻",
    desc: "高光节点用一次 confetti，勿每次点击都放。",
    when: "升级、首单、成就解锁",
    anim: "confetti",
    loop: false,
    lesson: "micro-interactions",
  },
  {
    id: "progress",
    title: "进度 / scrub",
    desc: "用进度映射帧，适合步骤与滚动叙事。",
    when: "引导步骤、落地页画卷、上传进度",
    anim: "progress",
    loop: false,
    lesson: "scrub",
  },
  {
    id: "onboarding",
    title: "开屏 / 引导",
    desc: "体积与时长要控；可跳过；reduced-motion 兜底。",
    when: "App 首次启动、功能介绍",
    anim: "rocket",
    loop: true,
    lesson: "intro",
  },
];

function GalleryPage() {
  const [active, setActive] = useState(PATTERNS[0].id);
  const current = PATTERNS.find((p) => p.id === active) ?? PATTERNS[0];

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Images className="h-3.5 w-3.5" />
          Gallery · v2
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          产品模式图鉴
        </h1>
        <p className="mt-1 text-sm text-muted">
          常见 Lottie 用法速览：何时用、怎么控、链到对应课程
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[12rem_1fr]">
        <ul className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
          {PATTERNS.map((p) => (
            <li key={p.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(p.id)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  active === p.id
                    ? "bg-primary-soft text-primary"
                    : "text-muted hover:bg-surface-2 hover:text-fg",
                )}
              >
                {p.title}
              </button>
            </li>
          ))}
        </ul>

        <section className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex min-h-[220px] items-center justify-center bg-surface-2 p-6">
            <LottiePlayer
              key={current.id}
              src={ANIMATIONS[current.anim]}
              loop={current.loop}
              style={{ width: 200, height: 180 }}
            />
          </div>
          <div className="space-y-3 p-4 sm:p-5">
            <h2 className="font-display text-lg font-semibold text-fg">
              {current.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted">{current.desc}</p>
            <div className="rounded-lg bg-surface-2 px-3 py-2 text-sm">
              <span className="text-xs font-medium uppercase tracking-wider text-subtle">
                适用场景
              </span>
              <p className="mt-1 text-fg">{current.when}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {current.lesson ? (
                <Link
                  to="/lesson/$slug"
                  params={{ slug: current.lesson }}
                  className="no-underline"
                >
                  <Button size="sm">
                    相关课程
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              ) : null}
              <Link to="/playground" className="no-underline">
                <Button size="sm" variant="secondary">
                  去 Playground 试
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
