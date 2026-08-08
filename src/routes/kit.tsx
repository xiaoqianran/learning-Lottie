import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { LottieLikeToggle } from "@/components/kit/LottieLikeToggle";
import { LottieAsyncSlot } from "@/components/kit/LottieAsyncSlot";
import { LottieRecolorPreview } from "@/components/kit/LottieRecolorPreview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Boxes, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/kit")({
  component: KitPage,
});

const ITEMS = [
  {
    id: "like",
    title: "LottieLikeToggle",
    desc: "点赞 / 收藏开关。状态在 React，动画只表现。",
    lesson: "kit-like",
    code: `import { LottieLikeToggle } from "@/components/kit/LottieLikeToggle";

export function Example() {
  return (
    <LottieLikeToggle
      onChange={(liked) => console.log("liked", liked)}
    />
  );
}`,
  },
  {
    id: "async",
    title: "LottieAsyncSlot",
    desc: "异步四态槽：idle → loading → success | error。",
    lesson: "kit-async",
    code: `import { LottieAsyncSlot } from "@/components/kit/LottieAsyncSlot";

export function Example() {
  return <LottieAsyncSlot delayMs={1200} />;
}`,
  },
  {
    id: "recolor",
    title: "LottieRecolorPreview",
    desc: "拉取 JSON 后运行时改 fill/stroke，预览主题色。",
    lesson: "recolor-runtime",
    code: `import { LottieRecolorPreview } from "@/components/kit/LottieRecolorPreview";
import { recolorLottieHex } from "@/lib/lottie-recolor";

// 预览组件
<LottieRecolorPreview />

// 或自己改色
const themed = recolorLottieHex(rawJson, "#6366f1");`,
  },
] as const;

function KitPage() {
  const [active, setActive] = useState<(typeof ITEMS)[number]["id"]>("like");
  const current = ITEMS.find((x) => x.id === active) ?? ITEMS[0];

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Boxes className="h-3.5 w-3.5" />
          Kit · v3
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          可复用组件库
        </h1>
        <p className="mt-1 text-sm text-muted">
          把课程里的模式收成 drop-in 组件：复制代码，接到你的项目
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[11rem_1fr]">
        <ul className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
          {ITEMS.map((item) => (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  active === item.id
                    ? "bg-primary-soft text-primary"
                    : "text-muted hover:bg-surface-2 hover:text-fg",
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        <section className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
            <h2 className="font-display text-lg font-semibold text-fg">
              {current.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{current.desc}</p>
            <div className="mt-4 rounded-lg border border-border bg-surface-2 p-4">
              {current.id === "like" ? <LottieLikeToggle /> : null}
              {current.id === "async" ? <LottieAsyncSlot /> : null}
              {current.id === "recolor" ? <LottieRecolorPreview /> : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
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
              <Link to="/gallery" className="no-underline">
                <Button size="sm" variant="secondary">
                  模式图鉴
                </Button>
              </Link>
            </div>
          </div>
          <CodeBlock code={current.code} title="复制到项目" lang="tsx" />
        </section>
      </div>
    </div>
  );
}
