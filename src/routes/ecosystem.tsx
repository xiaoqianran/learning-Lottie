import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Globe2, BookOpen, Cpu, Package, Bot, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotLottiePlayer } from "@/components/DotLottiePlayer";
import { ANIMATIONS } from "@/data/animations";

export const Route = createFileRoute("/ecosystem")({
  component: EcosystemPage,
});

type LinkItem = {
  title: string;
  href: string;
  desc: string;
  tag?: string;
};

const SECTIONS: { title: string; icon: typeof Globe2; items: LinkItem[] }[] = [
  {
    title: "官方 llms.txt（权威 AI 索引）",
    icon: Bot,
    items: [
      {
        title: "LottieFiles 平台 llms.txt",
        href: "https://lottiefiles.com/llms.txt",
        desc: "产品 · 格式 · 状态机 · 主题 · 玩家 · MCP · 集成 · 许可 · FAQ",
        tag: "llms.txt",
      },
      {
        title: "Developer Portal llms.txt",
        href: "https://developers.lottiefiles.com/llms.txt",
        desc: "Lottie/dotLottie 格式 · players · reLottie · dotlottie-js",
        tag: "llms.txt",
      },
      {
        title: "Web Players llms",
        href: "https://developers.lottiefiles.com/dotlottie-players-web-llms.txt",
        desc: "DotLottie Web API · layout · theme · SM · Worker · 框架封装",
        tag: "llms.txt",
      },
      {
        title: "Mobile Players llms",
        href: "https://developers.lottiefiles.com/dotlottie-players-mobile-llms.txt",
        desc: "iOS · Android · React Native 接入与最佳实践",
        tag: "llms.txt",
      },
      {
        title: "dotLottie-JS llms",
        href: "https://developers.lottiefiles.com/dotlottiejs-llms.txt",
        desc: "程序化创建 .lottie · 主题 · 状态机 · build/export",
        tag: "llms.txt",
      },
      {
        title: "reLottie llms",
        href: "https://developers.lottiefiles.com/relottie-llms.txt",
        desc: "LAST AST · 元数据 · 特性提取 · 表达式安全标记",
        tag: "llms.txt",
      },
    ],
  },
  {
    title: "权威规范与格式",
    icon: BookOpen,
    items: [
      {
        title: "Lottie 人类可读文档",
        href: "https://lottiefiles.github.io/lottie-docs/",
        desc: "格式原理、贝塞尔、预合成、渲染提示",
        tag: "format",
      },
      {
        title: "Lottie JSON Schema",
        href: "https://lottiefiles.github.io/lottie-docs/schema/",
        desc: "完整 schema：layers / assets / markers / slots",
        tag: "schema",
      },
      {
        title: "Lottie Animation Community Spec",
        href: "https://lottie.github.io/lottie-spec/latest/",
        desc: "社区规范子集，跨实现兼容基线",
        tag: "spec",
      },
      {
        title: "dotLottie v2 规范",
        href: "https://dotlottie.io/spec/2.0/",
        desc: ".lottie 压缩包、多动画、主题、状态机",
        tag: "dotLottie",
      },
      {
        title: "dotLottie v1（历史）",
        href: "https://dotlottie.io/spec/1.0/",
        desc: "旧版规范；新项目优先 v2",
        tag: "legacy",
      },
    ],
  },
  {
    title: "官方玩家与运行时",
    icon: Cpu,
    items: [
      {
        title: "Developer Portal / Docs",
        href: "https://docs.lottiefiles.com/",
        desc: "Create · Runtimes · Formats 文档门户",
      },
      {
        title: "dotLottie Player 总览",
        href: "https://developers.lottiefiles.com/docs/dotlottie-player/",
        desc: "全平台官方运行时入口",
      },
      {
        title: "airbnb/lottie-web",
        href: "https://github.com/airbnb/lottie-web",
        desc: "经典 Web 运行时（本站 LottiePlayer）",
      },
      {
        title: "Airbnb Lottie Docs",
        href: "https://lottie.airbnb.tech/",
        desc: "跨平台 Lottie 总览",
      },
    ],
  },
  {
    title: "工具 · 转换 · 创作",
    icon: Wrench,
    items: [
      {
        title: "Lottie Creator",
        href: "https://lottiefiles.com/lottie-creator",
        desc: "时间轴 · AI Motion Copilot · 可视化 SM/主题",
      },
      {
        title: "Lottie Editor / Previewer",
        href: "https://lottiefiles.com/lottie-editor",
        desc: "在线改色优化 · 预览交互",
      },
      {
        title: "SVG → Lottie",
        href: "https://lottiefiles.com/tools/svg-to-lottie",
        desc: "图标插画转动画",
      },
      {
        title: "Lottie → dotLottie",
        href: "https://lottiefiles.com/tools/lottie-to-dotlottie",
        desc: "生产压缩包",
      },
      {
        title: "Lottie Optimizer",
        href: "https://lottiefiles.com/tools/lottie-json-to-optimized-lottie-json",
        desc: "瘦身 JSON",
      },
      {
        title: "After Effects 插件",
        href: "https://lottiefiles.com/plugins/after-effects",
        desc: "官方导出（Bodymovin 技术栈）",
      },
      {
        title: "Feature Support Checker",
        href: "https://help.lottiefiles.com/hc/en-us/articles/15171713588761",
        desc: "特性跨平台可用性",
      },
    ],
  },
  {
    title: "平台 · MCP · 许可",
    icon: Package,
    items: [
      {
        title: "LottieFiles MCP",
        href: "https://docs.lottiefiles.com/en/platform/mcp",
        desc: "远程 MCP · GraphQL · OAuth 2.1",
        tag: "AI",
      },
      {
        title: "MCP 入口",
        href: "https://lottiefiles.com/mcp",
        desc: "https://mcp.lottiefiles.com/mcp",
      },
      {
        title: "Integrations",
        href: "https://lottiefiles.com/integrations",
        desc: "Figma · Webflow · Framer · Canva …",
      },
      {
        title: "Lottie Simple License",
        href: "https://lottiefiles.com/page/license",
        desc: "免费动画商用条款（不可做竞争库）",
        tag: "legal",
      },
      {
        title: "Pricing",
        href: "https://lottiefiles.com/pricing",
        desc: "套餐与商用授权以官网为准",
      },
    ],
  },
];

function EcosystemPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Globe2 className="h-3.5 w-3.5" />
          Ecosystem · v5
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          官方生态地图
        </h1>
        <p className="mt-1 text-sm text-muted">
          对齐 LottieFiles 六份 llms.txt + LottieDocs + dotLottie Spec + MCP。
          本页是权威外链导航，不替代官方规范。
        </p>
      </header>

      <section className="mb-8 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
          <div>
            <h2 className="font-display text-base font-semibold text-fg">
              同文件 · 双运行时
            </h2>
            <p className="mt-1 text-sm text-muted">
              经典 <code className="font-mono text-xs">lottie-web</code> 与官方{" "}
              <code className="font-mono text-xs">@lottiefiles/dotlottie-web</code>
              。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/lesson/$slug"
                params={{ slug: "dotlottie-player" }}
                className="no-underline"
              >
                <Button size="sm">dotLottie 课</Button>
              </Link>
              <Link
                to="/lesson/$slug"
                params={{ slug: "mcp-ai" }}
                className="no-underline"
              >
                <Button size="sm" variant="secondary">
                  MCP / AI
                </Button>
              </Link>
              <Link
                to="/lesson/$slug"
                params={{ slug: "relottie" }}
                className="no-underline"
              >
                <Button size="sm" variant="secondary">
                  reLottie
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center rounded-lg border border-border bg-surface-2 p-3">
            <DotLottiePlayer
              src={ANIMATIONS.pulse}
              style={{ width: 140, height: 140 }}
            />
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-border bg-primary-soft/40 p-4">
        <h2 className="font-display text-sm font-semibold text-fg">
          本站也有 llms.txt
        </h2>
        <p className="mt-1 text-sm text-muted">
          AI 可抓取本站索引：{" "}
          <a
            className="text-primary underline-offset-2 hover:underline"
            href={`${import.meta.env.BASE_URL}llms.txt`}
          >
            llms.txt
          </a>
          {" · "}
          <a
            className="text-primary underline-offset-2 hover:underline"
            href={`${import.meta.env.BASE_URL}llms-full.txt`}
          >
            llms-full.txt
          </a>
          。规范冲突时以官方为准。
        </p>
      </section>

      <div className="space-y-8">
        {SECTIONS.map((sec) => (
          <section key={sec.title}>
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-fg">
              <sec.icon className="h-4 w-4 text-primary" />
              {sec.title}
            </h2>
            <ul className="space-y-2">
              {sec.items.map((item) => (
                <li key={item.href + item.title}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-xl border border-border bg-surface p-3 no-underline transition-colors hover:border-primary/40 hover:bg-surface-2"
                  >
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-subtle group-hover:text-primary" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-fg">{item.title}</span>
                        {item.tag ? (
                          <span className="rounded-full bg-surface-3 px-2 py-0.5 font-mono text-[10px] text-muted">
                            {item.tag}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <h2 className="font-display text-base font-semibold text-fg">
          本站相关课程
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "ecosystem",
            "mcp-ai",
            "tools-converters",
            "integrations",
            "licensing",
            "dotlottie-js",
            "relottie",
            "expressions-security",
            "layout-fit",
            "multi-animation",
            "framework-players",
            "layer-types",
            "dotlottie-intro",
            "dotlottie-player",
            "state-machines",
            "theming-slots",
            "platform-map",
            "feature-support",
          ].map((slug) => (
            <Link
              key={slug}
              to="/lesson/$slug"
              params={{ slug }}
              className="rounded-full border border-border bg-bg px-3 py-1 text-xs text-fg no-underline hover:border-primary/40"
            >
              {slug}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
