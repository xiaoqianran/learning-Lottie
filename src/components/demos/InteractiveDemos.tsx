import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { DemoKind } from "@/data/lessons";
import { ANIMATIONS, PLAYGROUND_PRESETS, type AnimationKey } from "@/data/animations";
import { LottiePlayer } from "@/components/LottiePlayer";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { getDemoSource } from "@/data/demo-sources";
import { LottieLikeToggle } from "@/components/kit/LottieLikeToggle";
import { LottieAsyncSlot } from "@/components/kit/LottieAsyncSlot";
import { LottieRecolorPreview } from "@/components/kit/LottieRecolorPreview";
import { DotLottiePlayer } from "@/components/DotLottiePlayer";
import { cn } from "@/lib/utils";

import {
  Pause,
  Play,
  RotateCcw,
  Square,
  Heart,
  Loader2,
  CheckCircle2,
  XCircle,
  Code2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function InteractiveDemo({
  kind,
  title,
  hint,
}: {
  kind: DemoKind;
  title: string;
  hint?: string;
}) {
  const [showSource, setShowSource] = useState(true);
  const source = getDemoSource(kind);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            交互 Demo · 代码即组件
          </p>
          <h3 className="mt-0.5 font-display text-base font-semibold text-fg">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSource((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted transition-colors hover:text-fg"
          >
            <Code2 className="h-3.5 w-3.5" />
            对应源码
            {showSource ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
          <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] text-primary">
            live
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        {hint ? <p className="mb-4 text-sm text-muted">{hint}</p> : null}
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-sm bg-primary-soft px-1.5 py-0.5 font-mono text-[10px] text-primary">
            A · 运行结果
          </span>
          <span className="text-xs text-muted">
            下方源码等价实现后的可交互界面
          </span>
        </div>
        <DemoBody kind={kind} />
        {showSource ? (
          <div className="mt-5 border-t border-border pt-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                B · 对应源码
              </span>
              <span className="text-xs text-muted">
                与上方 Demo 同一套逻辑 — 读 B，操作 A
              </span>
            </div>
            <CodeBlock
              code={source.code}
              title={source.title}
              lang={source.lang}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function DemoBody({ kind }: { kind: DemoKind }) {
  switch (kind) {
    case "hello":
      return <HelloDemo />;
    case "playback":
      return <PlaybackDemo />;
    case "speed-loop":
      return <SpeedLoopDemo />;
    case "segments":
      return <SegmentsDemo />;
    case "events":
      return <EventsDemo />;
    case "hover":
      return <HoverDemo />;
    case "click-toggle":
      return <ClickToggleDemo />;
    case "progress-scrub":
      return <ScrubDemo />;
    case "theme":
      return <ThemeDemo />;
    case "reduced-motion":
      return <ReducedMotionDemo />;
    case "multi-state":
      return <MultiStateDemo />;
    case "loading-ux":
      return <LoadingUxDemo />;
    case "micro":
      return <MicroDemo />;
    case "inspect-json":
      return <InspectDemo />;
    case "challenge":
      return <ChallengeDemo />;
    case "markers":
      return <MarkersDemo />;
    case "direction":
      return <DirectionDemo />;
    case "sequence":
      return <SequenceDemo />;
    case "scroll-drive":
      return <ScrollDriveDemo />;
    case "renderer":
      return <RendererDemo />;
    case "optimize":
      return <OptimizeDemo />;
    case "recolor":
      return <LottieRecolorPreview />;
    case "kit-like":
      return <LottieLikeToggle />;
    case "kit-async":
      return <LottieAsyncSlot />;
    case "dotlottie":
      return <DotLottieDemo />;
    case "layer-map":
      return <LayerMapDemo />;
    case "state-machine":
      return <StateMachineConceptDemo />;
    case "platform-matrix":
      return <PlatformMatrixDemo />;
    case "official-map":
      return <OfficialMapDemo />;
    case "tool-chain":
      return <ToolChainDemo />;
    case "mcp-tools":
      return <McpToolsDemo />;
    case "license-card":
      return <LicenseCardDemo />;
    case "layout-fit":
      return <LayoutFitDemo />;
    case "multi-anim":
      return <MultiAnimDemo />;
    case "dotlottie-js":
      return <DotlottieJsDemo />;
    case "relottie-pipe":
      return <RelottiePipeDemo />;
    case "framework-wc":
      return <FrameworkWcDemo />;
    case "worker-perf":
      return <WorkerPerfDemo />;
    case "integrations":
      return <IntegrationsDemo />;
    case "expr-security":
      return <ExprSecurityDemo />;
    default:
      return null;
  }
}

function Stage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[180px] items-center justify-center rounded-lg border border-border bg-surface-2 p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function HelloDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Stage>
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.pulse}
          style={{ width: 160, height: 160 }}
        />
      </Stage>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => ref.current?.play()}>
          <Play className="h-3.5 w-3.5" /> 播
        </Button>
        <Button size="sm" variant="secondary" onClick={() => ref.current?.pause()}>
          <Pause className="h-3.5 w-3.5" /> 停
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            ref.current?.stop();
            ref.current?.goToAndPlay(0, true);
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" /> 重播
        </Button>
      </div>
    </div>
  );
}

function PlaybackDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  return (
    <div>
      <Stage>
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.rocket}
          loop={false}
          style={{ width: 180, height: 180 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <Button size="sm" onClick={() => ref.current?.play()}>
          <Play className="h-3.5 w-3.5" /> play
        </Button>
        <Button size="sm" variant="secondary" onClick={() => ref.current?.pause()}>
          <Pause className="h-3.5 w-3.5" /> pause
        </Button>
        <Button size="sm" variant="secondary" onClick={() => ref.current?.stop()}>
          <Square className="h-3.5 w-3.5" /> stop
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => ref.current?.goToAndPlay(0, true)}
        >
          goTo 0
        </Button>
      </div>
    </div>
  );
}

function SpeedLoopDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  useEffect(() => {
    ref.current?.setSpeed(speed);
  }, [speed]);
  return (
    <div>
      <Stage>
        <LottiePlayer
          key={String(loop)}
          lottieRef={ref}
          src={ANIMATIONS.loading}
          loop={loop}
          style={{ width: 140, height: 140 }}
        />
      </Stage>
      <div className="mt-3 space-y-2">
        <label className="flex items-center gap-2 text-sm text-muted">
          speed {speed.toFixed(1)}
          <input
            type="range"
            min={0.25}
            max={3}
            step={0.25}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <Button size="sm" variant="secondary" onClick={() => setLoop((v) => !v)}>
          loop: {String(loop)}
        </Button>
      </div>
    </div>
  );
}

function SegmentsDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const segs: [string, [number, number]][] = [
    ["intro", [0, 30]],
    ["mid", [30, 60]],
    ["end", [60, 90]],
  ];
  return (
    <div>
      <Stage>
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.progress}
          loop={false}
          autoplay={false}
          style={{ width: 160, height: 100 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        {segs.map(([name, seg]) => (
          <Button
            key={name}
            size="sm"
            variant="secondary"
            onClick={() => ref.current?.playSegments(seg, true)}
          >
            {name} [{seg[0]},{seg[1]}]
          </Button>
        ))}
      </div>
    </div>
  );
}

function EventsDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [log, setLog] = useState<string[]>([]);
  const push = (m: string) => setLog((L) => [m, ...L].slice(0, 6));
  return (
    <div>
      <Stage>
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.success}
          loop={false}
          autoplay={false}
          style={{ width: 140, height: 140 }}
          onDataReady={() => push("data_ready")}
          onComplete={() => push("complete")}
          onLoopComplete={() => push("loopComplete")}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            ref.current?.stop();
            ref.current?.goToAndPlay(0, true);
          }}
        >
          播放一次
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setLog([])}>
          清日志
        </Button>
      </div>
      <ul className="mt-2 font-mono text-[11px] text-muted">
        {log.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

function HoverDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  return (
    <Stage>
      <div
        onMouseEnter={() => ref.current?.play()}
        onMouseLeave={() => {
          ref.current?.pause();
          ref.current?.goToAndStop(0, true);
        }}
        onClick={() => ref.current?.play()}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.heart}
          loop
          autoplay={false}
          style={{ width: 140, height: 140 }}
        />
        <span className="text-xs text-muted">hover / click</span>
      </div>
    </Stage>
  );
}

function ClickToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="rounded-xl border border-border bg-surface-2 p-4"
      >
        <LottiePlayer
          key={String(on)}
          src={on ? ANIMATIONS.heart : ANIMATIONS.pulse}
          loop={on}
          style={{ width: 120, height: 120 }}
        />
      </button>
      <span className="font-mono text-xs text-muted">liked={String(on)}</span>
    </div>
  );
}

function ScrubDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [p, setP] = useState(0);
  return (
    <div>
      <Stage>
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.progress}
          autoplay={false}
          loop={false}
          style={{ width: 180, height: 100 }}
        />
      </Stage>
      <input
        className="mt-3 w-full"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={p}
        onChange={(e) => {
          const v = Number(e.target.value);
          setP(v);
          const frames = 90;
          ref.current?.goToAndStop(v * frames, true);
        }}
      />
      <p className="mt-1 font-mono text-[11px] text-muted">progress={p.toFixed(2)}</p>
    </div>
  );
}

function ThemeDemo() {
  const [dark, setDark] = useState(false);
  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-colors",
        dark ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900",
      )}
    >
      <Stage className={dark ? "border-zinc-700 bg-zinc-800" : ""}>
        <LottiePlayer src={ANIMATIONS.pulse} style={{ width: 140, height: 140 }} />
      </Stage>
      <Button size="sm" className="mt-3" onClick={() => setDark((v) => !v)}>
        {dark ? "浅色容器" : "深色容器"}
      </Button>
    </div>
  );
}

function ReducedMotionDemo() {
  const [reduce, setReduce] = useState(false);
  return (
    <div>
      <Stage>
        {reduce ? (
          <div className="flex h-[140px] w-[140px] items-center justify-center rounded-lg bg-surface-3 text-sm text-muted">
            静态帧 / 图标
          </div>
        ) : (
          <LottiePlayer src={ANIMATIONS.loading} style={{ width: 140, height: 140 }} />
        )}
      </Stage>
      <Button
        size="sm"
        className="mt-3"
        variant="secondary"
        onClick={() => setReduce((v) => !v)}
      >
        prefers-reduced-motion: {String(reduce)}
      </Button>
    </div>
  );
}

function MultiStateDemo() {
  type S = "idle" | "loading" | "success" | "error";
  const [s, setS] = useState<S>("idle");
  const map: Record<S, string> = {
    idle: ANIMATIONS.pulse,
    loading: ANIMATIONS.loading,
    success: ANIMATIONS.success,
    error: ANIMATIONS.error,
  };
  return (
    <div>
      <Stage>
        <LottiePlayer
          key={s}
          src={map[s]}
          loop={s === "loading" || s === "idle"}
          style={{ width: 120, height: 120 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        {(["idle", "loading", "success", "error"] as S[]).map((k) => (
          <Button
            key={k}
            size="sm"
            variant={s === k ? "default" : "secondary"}
            onClick={() => setS(k)}
          >
            {k}
          </Button>
        ))}
      </div>
    </div>
  );
}

function LoadingUxDemo() {
  const [phase, setPhase] = useState<"idle" | "loading" | "ok" | "err">("idle");
  return (
    <div>
      <Stage className="flex-col gap-2">
        {phase === "idle" && <span className="text-sm text-muted">准备请求</span>}
        {phase === "loading" && (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <LottiePlayer src={ANIMATIONS.loading} style={{ width: 100, height: 100 }} />
          </>
        )}
        {phase === "ok" && (
          <>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <LottiePlayer
              src={ANIMATIONS.success}
              loop={false}
              style={{ width: 100, height: 100 }}
            />
          </>
        )}
        {phase === "err" && (
          <>
            <XCircle className="h-5 w-5 text-red-500" />
            <LottiePlayer
              src={ANIMATIONS.error}
              loop={false}
              style={{ width: 100, height: 100 }}
            />
          </>
        )}
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            setPhase("loading");
            setTimeout(() => setPhase("ok"), 1200);
          }}
        >
          成功路径
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setPhase("loading");
            setTimeout(() => setPhase("err"), 1200);
          }}
        >
          失败路径
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setPhase("idle")}>
          重置
        </Button>
      </div>
    </div>
  );
}

function MicroDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setN((x) => x + 1)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2"
      >
        <Heart className="h-4 w-4 text-primary" />
        轻点
        <LottiePlayer
          key={n}
          src={ANIMATIONS.heart}
          loop={false}
          style={{ width: 36, height: 36 }}
        />
      </button>
      <span className="font-mono text-xs text-muted">clicks={n}</span>
    </div>
  );
}

function InspectDemo() {
  const [key, setKey] = useState<AnimationKey>("pulse");
  const [meta, setMeta] = useState<string>("…");
  useEffect(() => {
    let c = false;
    (async () => {
      const res = await fetch(ANIMATIONS[key]);
      const data = await res.json();
      if (c) return;
      const frames = (data.op ?? 0) - (data.ip ?? 0);
      setMeta(
        `fr=${data.fr} · frames≈${frames} · layers=${data.layers?.length ?? 0} · w×h=${data.w}×${data.h}`,
      );
    })();
    return () => {
      c = true;
    };
  }, [key]);
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {PLAYGROUND_PRESETS.slice(0, 6).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setKey(p.id)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs",
              key === p.id ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
            )}
          >
            {p.id}
          </button>
        ))}
      </div>
      <Stage>
        <LottiePlayer src={ANIMATIONS[key]} style={{ width: 120, height: 120 }} />
      </Stage>
      <p className="mt-2 font-mono text-[11px] text-muted">{meta}</p>
    </div>
  );
}

function ChallengeDemo() {
  const items = [
    "体积预算 OK",
    "真机抽检",
    "reduced-motion",
    "loadError 降级",
    "destroy 卸载",
    "离屏 pause",
    "许可来源记录",
    "Feature Support",
  ];
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it}>
          <button
            type="button"
            onClick={() => setDone((d) => ({ ...d, [it]: !d[it] }))}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm",
              done[it] ? "bg-primary-soft text-primary" : "bg-surface-2 text-muted",
            )}
          >
            <span className="font-mono text-xs">{done[it] ? "[x]" : "[ ]"}</span>
            {it}
          </button>
        </li>
      ))}
    </ul>
  );
}

function MarkersDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const marks = [
    { cm: "start", tm: 0 },
    { cm: "mid", tm: 45 },
    { cm: "end", tm: 80 },
  ];
  return (
    <div>
      <Stage>
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.rocket}
          autoplay={false}
          loop={false}
          style={{ width: 150, height: 150 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        {marks.map((m) => (
          <Button
            key={m.cm}
            size="sm"
            variant="secondary"
            onClick={() => ref.current?.goToAndPlay(m.tm, true)}
          >
            {m.cm} @ {m.tm}
          </Button>
        ))}
      </div>
    </div>
  );
}

function DirectionDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  useEffect(() => {
    ref.current?.setDirection(dir);
    ref.current?.play();
  }, [dir]);
  return (
    <div>
      <Stage>
        <LottiePlayer
          lottieRef={ref}
          src={ANIMATIONS.progress}
          style={{ width: 180, height: 100 }}
        />
      </Stage>
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          variant={dir === 1 ? "default" : "secondary"}
          onClick={() => setDir(1)}
        >
          forward
        </Button>
        <Button
          size="sm"
          variant={dir === -1 ? "default" : "secondary"}
          onClick={() => setDir(-1)}
        >
          reverse
        </Button>
      </div>
    </div>
  );
}

function SequenceDemo() {
  const steps = [ANIMATIONS.loading, ANIMATIONS.success, ANIMATIONS.confetti] as const;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= steps.length - 1) return;
    const t = setTimeout(() => setI((x) => x + 1), 1600);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <div>
      <Stage>
        <LottiePlayer
          key={i}
          src={steps[i]}
          loop={i === 0}
          style={{ width: 120, height: 120 }}
        />
      </Stage>
      <p className="mt-2 font-mono text-xs text-muted">
        step {i + 1}/{steps.length}
      </p>
      <Button size="sm" className="mt-2" variant="secondary" onClick={() => setI(0)}>
        重跑串联
      </Button>
    </div>
  );
}

function ScrollDriveDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const box = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVis(e.isIntersecting);
        if (e.isIntersecting) ref.current?.play();
        else ref.current?.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div>
      <p className="mb-2 text-xs text-muted">
        向下滚一点再滚回来 · visible={String(vis)}
      </p>
      <div className="h-24 overflow-y-auto rounded-lg border border-border p-2">
        <div className="h-16 text-xs text-muted">… 滚动区 …</div>
        <div ref={box}>
          <Stage>
            <LottiePlayer
              lottieRef={ref}
              src={ANIMATIONS.pulse}
              style={{ width: 100, height: 100 }}
            />
          </Stage>
        </div>
        <div className="h-24 text-xs text-muted">… 底部 …</div>
      </div>
    </div>
  );
}

function RendererDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Stage className="flex-col gap-1">
        <p className="text-xs text-muted">lottie-web SVG</p>
        <LottiePlayer src={ANIMATIONS.pulse} style={{ width: 120, height: 120 }} />
      </Stage>
      <Stage className="flex-col gap-1">
        <p className="text-xs text-muted">dotlottie-web canvas</p>
        <DotLottiePlayer src={ANIMATIONS.pulse} style={{ width: 120, height: 120 }} />
      </Stage>
    </div>
  );
}

function OptimizeDemo() {
  const [key, setKey] = useState<AnimationKey>("rocket");
  const [kb, setKb] = useState("…");
  useEffect(() => {
    let c = false;
    (async () => {
      const res = await fetch(ANIMATIONS[key]);
      const buf = await res.arrayBuffer();
      if (c) return;
      setKb(`${(buf.byteLength / 1024).toFixed(1)} KB`);
    })();
    return () => {
      c = true;
    };
  }, [key]);
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {(["pulse", "loading", "rocket", "confetti"] as AnimationKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKey(k)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs",
              key === k ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <Stage>
        <LottiePlayer src={ANIMATIONS[key]} style={{ width: 120, height: 120 }} />
      </Stage>
      <p className="mt-2 font-mono text-xs text-muted">
        raw ≈ {kb} · 生产用 Optimizer / .lottie
      </p>
    </div>
  );
}

function DotLottieDemo() {
  const [srcKey, setSrcKey] = useState<AnimationKey>("pulse");
  const [status, setStatus] = useState("idle");
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Stage className="flex-col gap-2">
          <p className="text-xs text-muted">lottie-web · SVG</p>
          <LottiePlayer src={ANIMATIONS[srcKey]} style={{ width: 140, height: 140 }} />
        </Stage>
        <Stage className="flex-col gap-2">
          <p className="text-xs text-muted">dotlottie-web · canvas</p>
          <DotLottiePlayer
            key={srcKey}
            src={ANIMATIONS[srcKey]}
            style={{ width: 140, height: 140 }}
            onLoad={() => setStatus("load")}
            onError={() => setStatus("error")}
          />
        </Stage>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["pulse", "loading", "success", "heart"] as AnimationKey[]).map((k) => (
          <Button
            key={k}
            size="sm"
            variant={srcKey === k ? "default" : "secondary"}
            onClick={() => {
              setSrcKey(k);
              setStatus("idle");
            }}
          >
            {k}
          </Button>
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted">dotLottie status: {status}</p>
    </div>
  );
}

function LayerMapDemo() {
  const [key, setKey] = useState<AnimationKey>("rocket");
  const [rows, setRows] = useState<
    { ty: number; nm: string; ip: number; op: number }[]
  >([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(ANIMATIONS[key]);
      const data = (await res.json()) as {
        layers?: { ty?: number; nm?: string; ip?: number; op?: number }[];
      };
      if (cancelled) return;
      setRows(
        (data.layers ?? []).slice(0, 12).map((L) => ({
          ty: L.ty ?? -1,
          nm: L.nm ?? "(unnamed)",
          ip: L.ip ?? 0,
          op: L.op ?? 0,
        })),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  const tyName: Record<number, string> = {
    0: "precomp",
    1: "solid",
    2: "image",
    3: "null",
    4: "shape",
    5: "text",
    6: "audio",
    13: "camera",
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(["pulse", "progress", "rocket", "heart"] as AnimationKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKey(k)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs",
              key === k ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[18rem] text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="py-1.5 pr-2">ty</th>
              <th className="py-1.5 pr-2">kind</th>
              <th className="py-1.5 pr-2">name</th>
              <th className="py-1.5">ip–op</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1.5 pr-2 font-mono">{r.ty}</td>
                <td className="py-1.5 pr-2 font-mono text-primary">
                  {tyName[r.ty] ?? "?"}
                </td>
                <td className="max-w-[8rem] truncate py-1.5 pr-2">{r.nm}</td>
                <td className="py-1.5 font-mono">
                  {r.ip}–{r.op}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-muted">官方枚举见 schema · all-layers</p>
    </div>
  );
}

function StateMachineConceptDemo() {
  type S = "idle" | "hover" | "active";
  const [state, setState] = useState<S>("idle");
  const src =
    state === "hover"
      ? ANIMATIONS.loading
      : state === "active"
        ? ANIMATIONS.success
        : ANIMATIONS.pulse;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-xs font-medium text-muted">手写应用状态机</p>
        <Stage className="flex-col gap-2">
          <LottiePlayer
            key={state}
            src={src}
            loop={state !== "active"}
            style={{ width: 120, height: 100 }}
          />
          <span className="font-mono text-xs">state = {state}</span>
        </Stage>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["idle", "hover", "active"] as S[]).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={state === s ? "default" : "secondary"}
              onClick={() => setState(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface-2 p-3 text-sm text-muted">
        <p className="font-medium text-fg">官方 State Machine</p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed">
          <li>states / transitions 定义在 .lottie 内</li>
          <li>loadStateMachine → startStateMachine</li>
          <li>postEvent 驱动迁移</li>
          <li>跨 Web/iOS/Android 同一逻辑</li>
          <li>无 SM 文件时用左侧手写模式即可</li>
        </ul>
      </div>
    </div>
  );
}

function PlatformMatrixDemo() {
  const rows = [
    { plat: "Web / JS", pkg: "@lottiefiles/dotlottie-web" },
    { plat: "React", pkg: "@lottiefiles/dotlottie-react" },
    { plat: "Vue", pkg: "@lottiefiles/dotlottie-vue" },
    { plat: "Svelte", pkg: "@lottiefiles/dotlottie-svelte" },
    { plat: "Web Component", pkg: "@lottiefiles/dotlottie-wc" },
    { plat: "iOS", pkg: "dotlottie-ios" },
    { plat: "Android", pkg: "dotlottie-android" },
    { plat: "React Native", pkg: "dotlottie-react-native" },
    { plat: "经典 Web", pkg: "lottie-web / lottie-react" },
  ];
  const [pick, setPick] = useState(0);
  return (
    <div>
      <ul className="space-y-1">
        {rows.map((r, i) => (
          <li key={r.plat}>
            <button
              type="button"
              onClick={() => setPick(i)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm",
                pick === i ? "bg-primary-soft text-primary" : "hover:bg-surface-2",
              )}
            >
              <span>{r.plat}</span>
              <code className="font-mono text-[11px] opacity-80">{r.pkg}</code>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">
        当前：{rows[pick].plat} →{" "}
        <code className="font-mono">{rows[pick].pkg}</code>
      </p>
    </div>
  );
}

function OfficialMapDemo() {
  const links = [
    { t: "平台 llms.txt", h: "https://lottiefiles.com/llms.txt" },
    { t: "开发者 llms.txt", h: "https://developers.lottiefiles.com/llms.txt" },
    {
      t: "Web players llms",
      h: "https://developers.lottiefiles.com/dotlottie-players-web-llms.txt",
    },
    {
      t: "Mobile players llms",
      h: "https://developers.lottiefiles.com/dotlottie-players-mobile-llms.txt",
    },
    {
      t: "dotlottie-js llms",
      h: "https://developers.lottiefiles.com/dotlottiejs-llms.txt",
    },
    {
      t: "reLottie llms",
      h: "https://developers.lottiefiles.com/relottie-llms.txt",
    },
    { t: "LottieDocs", h: "https://lottiefiles.github.io/lottie-docs/" },
    { t: "dotLottie v2", h: "https://dotlottie.io/spec/2.0/" },
    { t: "MCP 文档", h: "https://docs.lottiefiles.com/en/platform/mcp" },
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <ul className="max-h-56 space-y-1 overflow-y-auto">
        {links.map((l, idx) => (
          <li key={l.h}>
            <button
              type="button"
              onClick={() => setI(idx)}
              className={cn(
                "w-full rounded-md px-3 py-2 text-left text-sm",
                i === idx ? "bg-primary-soft text-primary" : "hover:bg-surface-2",
              )}
            >
              {l.t}
            </button>
          </li>
        ))}
      </ul>
      <a
        className="mt-3 block break-all font-mono text-[11px] text-primary underline-offset-2 hover:underline"
        href={links[i].h}
        target="_blank"
        rel="noreferrer"
      >
        {links[i].h}
      </a>
    </div>
  );
}

function ToolChainDemo() {
  const steps = [
    { n: "创作", d: "Creator / AE 插件 / AI Motion Copilot" },
    { n: "编辑", d: "Editor 改色 · Previewer 验 SM/主题" },
    { n: "优化", d: "Optimizer · SVG→Lottie · →.lottie" },
    { n: "交付", d: "Workspace 协作 · 版本 · 状态" },
    { n: "接入", d: "dotLottie players · Feature Support" },
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {steps.map((s, idx) => (
          <button
            key={s.n}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs",
              i === idx ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
            )}
          >
            {idx + 1}. {s.n}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-border bg-surface-2 p-3 text-sm">
        <p className="font-medium text-fg">{steps[i].n}</p>
        <p className="mt-1 text-muted">{steps[i].d}</p>
      </div>
    </div>
  );
}

function McpToolsDemo() {
  const tools = [
    { id: "operations_list", d: "列出可用 GraphQL 操作" },
    { id: "schema_search", d: "搜索 schema 字段" },
    { id: "schema_details", d: "查看类型详情" },
    { id: "graphql_execute", d: "执行查询/变更（鉴权）" },
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] text-muted">
        mcp.lottiefiles.com/mcp · OAuth 2.1 + PKCE
      </p>
      <ul className="space-y-1">
        {tools.map((t, idx) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setI(idx)}
              className={cn(
                "flex w-full flex-col rounded-md px-3 py-2 text-left",
                i === idx ? "bg-primary-soft" : "hover:bg-surface-2",
              )}
            >
              <code className="font-mono text-xs text-primary">{t.id}</code>
              <span className="text-xs text-muted">{t.d}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LicenseCardDemo() {
  const qs = [
    "资源来自官方免费库还是 Marketplace？",
    "是否 Lottie Simple License / 套餐商用？",
    "是否用于竞争动画库或同类服务？（通常禁止）",
  ];
  const [ok, setOk] = useState<Record<number, boolean>>({});
  return (
    <ul className="space-y-2">
      {qs.map((q, i) => (
        <li key={q}>
          <button
            type="button"
            onClick={() => setOk((o) => ({ ...o, [i]: !o[i] }))}
            className={cn(
              "w-full rounded-lg border px-3 py-2 text-left text-sm",
              ok[i]
                ? "border-primary/40 bg-primary-soft text-fg"
                : "border-border bg-surface-2 text-muted",
            )}
          >
            <span className="font-mono text-xs">{ok[i] ? "✓" : "○"}</span> {q}
          </button>
        </li>
      ))}
    </ul>
  );
}

function LayoutFitDemo() {
  const fits = ["contain", "cover", "fill"] as const;
  const [fit, setFit] = useState<(typeof fits)[number]>("contain");
  return (
    <div>
      <div className="mx-auto flex h-40 w-full max-w-xs items-center justify-center overflow-hidden rounded-lg border border-border bg-zinc-900">
        <div
          className={cn(
            "bg-primary/20",
            fit === "contain" && "h-28 w-28",
            fit === "cover" && "h-full w-full min-h-[10rem]",
            fit === "fill" && "h-full w-full scale-x-125",
          )}
        >
          <LottiePlayer
            src={ANIMATIONS.pulse}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {fits.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={fit === f ? "default" : "secondary"}
            onClick={() => setFit(f)}
          >
            fit: {f}
          </Button>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-muted">
        示意 CSS 裁切；真实 API 为 DotLottie layout.fit
      </p>
    </div>
  );
}

function MultiAnimDemo() {
  const list = [
    { id: "idle", src: ANIMATIONS.pulse },
    { id: "load", src: ANIMATIONS.loading },
    { id: "ok", src: ANIMATIONS.success },
  ];
  const [id, setId] = useState("idle");
  const cur = list.find((x) => x.id === id)!;
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] text-muted">
        manifest.animations ≈ [{list.map((x) => x.id).join(", ")}]
      </p>
      <Stage>
        <LottiePlayer key={id} src={cur.src} style={{ width: 120, height: 120 }} />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        {list.map((a) => (
          <Button
            key={a.id}
            size="sm"
            variant={id === a.id ? "default" : "secondary"}
            onClick={() => setId(a.id)}
          >
            loadAnimation("{a.id}")
          </Button>
        ))}
      </div>
    </div>
  );
}

function DotlottieJsDemo() {
  const steps = [
    "new DotLottie()",
    "addAnimation",
    "addTheme",
    "addStateMachine",
    "build()",
    "toBlob/download",
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <ol className="space-y-1">
        {steps.map((s, idx) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => setI(idx)}
              className={cn(
                "w-full rounded-md px-3 py-1.5 text-left font-mono text-xs",
                idx <= i ? "bg-primary-soft text-primary" : "bg-surface-2 text-muted",
              )}
            >
              {idx + 1}. {s}
            </button>
          </li>
        ))}
      </ol>
      <Button
        size="sm"
        className="mt-3"
        onClick={() => setI((x) => Math.min(steps.length - 1, x + 1))}
      >
        下一步
      </Button>
      <Button size="sm" variant="secondary" className="ml-2 mt-3" onClick={() => setI(0)}>
        重置
      </Button>
    </div>
  );
}

function RelottiePipeDemo() {
  const stages = [
    { n: "parse", d: "JSON → LAST 树" },
    { n: "metadata", d: "尺寸 / fr / 时长" },
    { n: "extract-features", d: "图层/形状特性" },
    { n: "transform", d: "自定义插件改值" },
    { n: "stringify", d: "LAST → JSON" },
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {stages.map((s, idx) => (
          <button
            key={s.n}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "rounded px-2 py-1 font-mono text-[11px]",
              i === idx ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
            )}
          >
            {s.n}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-border bg-surface-2 p-3 text-sm">
        <p className="font-mono text-primary">{stages[i].n}</p>
        <p className="mt-1 text-muted">{stages[i].d}</p>
        <p className="mt-2 text-[11px] text-muted">Root.hasExpressions → 安全门禁</p>
      </div>
    </div>
  );
}

function FrameworkWcDemo() {
  const rows = [
    {
      name: "React",
      code: `import { DotLottieReact } from "@lottiefiles/dotlottie-react"
<DotLottieReact src="a.lottie" autoplay loop />`,
    },
    {
      name: "Vue",
      code: `import { DotLottieVue } from "@lottiefiles/dotlottie-vue"
<DotLottieVue src="a.lottie" :autoplay="true" :loop="true" />`,
    },
    {
      name: "Svelte",
      code: `import { DotLottieSvelte } from "@lottiefiles/dotlottie-svelte"
<DotLottieSvelte src="a.lottie" autoplay loop />`,
    },
    {
      name: "Web Component",
      code: `<dotlottie-player src="a.lottie" autoplay loop></dotlottie-player>`,
    },
    {
      name: "CDN ESM",
      code: `import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm"`,
    },
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {rows.map((r, idx) => (
          <button
            key={r.name}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs",
              i === idx ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
            )}
          >
            {r.name}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface-2 p-3 font-mono text-[11px] text-fg">
        {rows[i].code}
      </pre>
    </div>
  );
}

function WorkerPerfDemo() {
  const flags = [
    { k: "DotLottieWorker", d: "动画算力卸到 Worker 线程" },
    { k: "freezeOnOffscreen", d: "离屏默认冻结渲染" },
    { k: "useFrameInterpolation=false", d: "少插值换性能" },
    { k: "destroy()", d: "卸载释放 canvas/循环" },
    { k: "列表虚拟化", d: "勿每行重动画" },
  ];
  const [on, setOn] = useState<Record<string, boolean>>({
    DotLottieWorker: true,
    freezeOnOffscreen: true,
    "useFrameInterpolation=false": false,
    "destroy()": true,
    列表虚拟化: true,
  });
  return (
    <ul className="space-y-1.5">
      {flags.map((f) => (
        <li key={f.k}>
          <button
            type="button"
            onClick={() => setOn((o) => ({ ...o, [f.k]: !o[f.k] }))}
            className={cn(
              "flex w-full flex-col rounded-md px-3 py-2 text-left",
              on[f.k] ? "bg-primary-soft" : "bg-surface-2",
            )}
          >
            <span className="font-mono text-xs text-primary">
              {on[f.k] ? "ON " : "off"} {f.k}
            </span>
            <span className="text-xs text-muted">{f.d}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function IntegrationsDemo() {
  const items = [
    { n: "After Effects", d: "导出主路径 · LottieFiles 插件" },
    { n: "Figma", d: "设计稿导入导出" },
    { n: "Webflow", d: "无代码站点嵌入" },
    { n: "Framer", d: "原型/站点" },
    { n: "Canva", d: "平面设计" },
  ];
  const [i, setI] = useState(0);
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((it, idx) => (
        <button
          key={it.n}
          type="button"
          onClick={() => setI(idx)}
          className={cn(
            "rounded-lg border px-3 py-2 text-left",
            i === idx
              ? "border-primary/50 bg-primary-soft"
              : "border-border bg-surface-2",
          )}
        >
          <p className="text-sm font-medium text-fg">{it.n}</p>
          <p className="text-xs text-muted">{it.d}</p>
        </button>
      ))}
    </div>
  );
}

function ExprSecurityDemo() {
  const checks = [
    "来源可信（自有/许可库）",
    "reLottie / 工具检测 hasExpressions",
    "关键帧 bake，少依赖运行时表达式",
    "Feature Support 真机核对",
    "失败降级静态图",
  ];
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <ul className="space-y-1.5">
      {checks.map((c, i) => (
        <li key={c}>
          <button
            type="button"
            onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
            className={cn(
              "w-full rounded-md px-3 py-2 text-left text-sm",
              done[i] ? "bg-primary-soft text-primary" : "bg-surface-2 text-muted",
            )}
          >
            <span className="font-mono text-xs">{done[i] ? "[x]" : "[ ]"}</span> {c}
          </button>
        </li>
      ))}
    </ul>
  );
}
