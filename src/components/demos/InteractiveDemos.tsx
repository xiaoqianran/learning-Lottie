import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import type { DemoKind } from "@/data/lessons";
import { ANIMATIONS, PLAYGROUND_PRESETS, type AnimationKey } from "@/data/animations";
import { LottiePlayer } from "@/components/LottiePlayer";
import { Button } from "@/components/ui/button";
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
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            交互 Demo
          </p>
          <h3 className="mt-0.5 font-display text-base font-semibold text-fg">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] text-primary">
          live
        </span>
      </div>
      <div className="p-4 sm:p-5">
        {hint ? <p className="mb-4 text-sm text-muted">{hint}</p> : null}
        <DemoBody kind={kind} />
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
    <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
      <Stage>
        <LottiePlayer
          src={ANIMATIONS.rocket}
          lottieRef={ref}
          style={{ width: 200, height: 200 }}
        />
      </Stage>
      <div className="flex flex-wrap gap-2 sm:flex-col">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => ref.current?.pause()}
        >
          <Pause className="h-3.5 w-3.5" />
          暂停
        </Button>
        <Button size="sm" onClick={() => ref.current?.play()}>
          <Play className="h-3.5 w-3.5" />
          播放
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => ref.current?.goToAndPlay(0, true)}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          重播
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
          src={ANIMATIONS.success}
          lottieRef={ref}
          loop={false}
          style={{ width: 220, height: 160 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => ref.current?.play()}>
          <Play className="h-3.5 w-3.5" /> play
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => ref.current?.pause()}
        >
          <Pause className="h-3.5 w-3.5" /> pause
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => ref.current?.stop()}
        >
          <Square className="h-3.5 w-3.5" /> stop
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => ref.current?.goToAndPlay(0, true)}
        >
          goToAndPlay(0)
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
          src={ANIMATIONS.loading}
          lottieRef={ref}
          loop={loop}
          style={{ width: 140, height: 140 }}
        />
      </Stage>
      <div className="mt-4 space-y-3">
        <label className="block text-sm text-muted">
          速度 {speed.toFixed(1)}x
          <input
            type="range"
            min={0.25}
            max={3}
            step={0.25}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="mt-1 w-full accent-[var(--color-primary)]"
          />
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-fg">
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
            className="size-4 accent-[var(--color-primary)]"
          />
          loop
        </label>
      </div>
    </div>
  );
}

function SegmentsDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [info, setInfo] = useState("就绪");

  return (
    <div>
      <Stage>
        <LottiePlayer
          src={ANIMATIONS.progress}
          lottieRef={ref}
          loop={false}
          autoplay={false}
          style={{ width: 280, height: 80 }}
        />
      </Stage>
      <p className="mt-2 font-mono text-xs text-muted">{info}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            ref.current?.playSegments([0, 30], true);
            setInfo("段落 [0, 30]");
          }}
        >
          前段 0–30
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            ref.current?.playSegments([30, 60], true);
            setInfo("段落 [30, 60]");
          }}
        >
          中段 30–60
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            ref.current?.playSegments([60, 90], true);
            setInfo("段落 [60, 90]");
          }}
        >
          后段 60–90
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            ref.current?.goToAndStop(0, true);
            setInfo("复位");
          }}
        >
          复位
        </Button>
      </div>
    </div>
  );
}

function EventsDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const push = (m: string) =>
    setLogs((prev) => [`${new Date().toLocaleTimeString()} ${m}`, ...prev].slice(0, 8));

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Stage>
        <LottiePlayer
          src={ANIMATIONS.success}
          loop={false}
          onComplete={() => push("complete")}
          onLoopComplete={() => push("loopComplete")}
          style={{ width: 200, height: 140 }}
        />
      </Stage>
      <div className="rounded-lg border border-border bg-code-bg p-3">
        <p className="text-xs font-medium text-muted">事件日志</p>
        <ul className="mt-2 space-y-1 font-mono text-[11px] text-code-fg">
          {logs.length === 0 ? (
            <li className="text-subtle">等待事件…（非循环播完会 complete）</li>
          ) : (
            logs.map((l, i) => <li key={i}>{l}</li>)
          )}
        </ul>
        <Button
          size="sm"
          className="mt-3"
          variant="secondary"
          onClick={() => setLogs([])}
        >
          清空
        </Button>
      </div>
    </div>
  );
}

function HoverDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  return (
    <Stage>
      <div
        className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-surface-3"
        onMouseEnter={() => ref.current?.play()}
        onMouseLeave={() => {
          ref.current?.pause();
          ref.current?.goToAndStop(0, true);
        }}
        onClick={() => {
          ref.current?.stop();
          ref.current?.play();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            ref.current?.play();
          }
        }}
      >
        <LottiePlayer
          src={ANIMATIONS.heart}
          lottieRef={ref}
          loop
          autoplay={false}
          style={{ width: 140, height: 140 }}
        />
        <span className="text-xs text-muted">悬停或点击</span>
      </div>
    </Stage>
  );
}

function ClickToggleDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (liked) {
      ref.current?.goToAndPlay(0, true);
    } else {
      ref.current?.goToAndStop(0, true);
    }
  }, [liked]);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setLiked((v) => !v)}
        className={cn(
          "flex h-28 w-28 items-center justify-center rounded-xl border transition-colors",
          liked
            ? "border-primary/40 bg-primary-soft"
            : "border-border bg-surface-2",
        )}
        aria-pressed={liked}
      >
        <LottiePlayer
          src={ANIMATIONS.heart}
          lottieRef={ref}
          loop={false}
          autoplay={false}
          style={{ width: 96, height: 96 }}
        />
      </button>
      <p className="inline-flex items-center gap-2 text-sm text-muted">
        <Heart
          className={cn("h-4 w-4", liked ? "fill-primary text-primary" : "")}
        />
        状态：{liked ? "已喜欢" : "未喜欢"}（由 React state 驱动）
      </p>
    </div>
  );
}

function ScrubDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [p, setP] = useState(0);
  const total = 90;

  useEffect(() => {
    const frame = Math.round(p * (total - 1));
    ref.current?.goToAndStop(frame, true);
  }, [p]);

  return (
    <div>
      <Stage>
        <LottiePlayer
          src={ANIMATIONS.progress}
          lottieRef={ref}
          loop={false}
          autoplay={false}
          style={{ width: 280, height: 80 }}
        />
      </Stage>
      <label className="mt-4 block text-sm text-muted">
        进度 {(p * 100).toFixed(0)}%
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="mt-1 w-full accent-[var(--color-primary)]"
        />
      </label>
    </div>
  );
}

function ThemeDemo() {
  const themes = [
    { id: "teal", label: "青绿", ring: "ring-primary", bg: "bg-primary-soft" },
    { id: "slate", label: "冷灰", ring: "ring-muted", bg: "bg-surface-3" },
    { id: "warm", label: "暖沙", ring: "ring-warn", bg: "bg-warn/15" },
  ] as const;
  const [theme, setTheme] = useState<(typeof themes)[number]["id"]>("teal");
  const t = themes.find((x) => x.id === theme)!;

  return (
    <div>
      <Stage className={cn("ring-2 ring-inset transition-colors", t.ring, t.bg)}>
        <LottiePlayer
          src={ANIMATIONS.pulse}
          style={{ width: 140, height: 140 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        {themes.map((x) => (
          <Button
            key={x.id}
            size="sm"
            variant={theme === x.id ? "default" : "secondary"}
            onClick={() => setTheme(x.id)}
          >
            {x.label}
          </Button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        产品中可用改色库遍历 fill，或导出多主题资源。
      </p>
    </div>
  );
}

function ReducedMotionDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (reduce) {
      ref.current?.pause();
      ref.current?.goToAndStop(30, true);
    } else {
      ref.current?.play();
    }
  }, [reduce]);

  return (
    <div>
      <Stage>
        <LottiePlayer
          src={ANIMATIONS.loading}
          lottieRef={ref}
          loop={!reduce}
          autoplay={!reduce}
          style={{ width: 120, height: 120 }}
        />
      </Stage>
      <label className="mt-3 inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={reduce}
          onChange={(e) => setReduce(e.target.checked)}
          className="size-4 accent-[var(--color-primary)]"
        />
        模拟 prefers-reduced-motion
      </label>
    </div>
  );
}

function MultiStateDemo() {
  type S = "idle" | "loading" | "success" | "error";
  const [state, setState] = useState<S>("idle");

  function run(ok: boolean) {
    setState("loading");
    window.setTimeout(() => setState(ok ? "success" : "error"), 1400);
  }

  const src =
    state === "loading"
      ? ANIMATIONS.loading
      : state === "success"
        ? ANIMATIONS.success
        : state === "error"
          ? ANIMATIONS.error
          : ANIMATIONS.pulse;

  return (
    <div>
      <Stage>
        <div className="flex flex-col items-center gap-2">
          <LottiePlayer
            key={state}
            src={src}
            loop={state === "loading" || state === "idle"}
            style={{ width: 160, height: 120 }}
          />
          <span className="font-mono text-xs text-muted">state = {state}</span>
        </div>
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => run(true)}>
          模拟成功
        </Button>
        <Button size="sm" variant="secondary" onClick={() => run(false)}>
          模拟失败
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setState("idle")}>
          复位
        </Button>
      </div>
    </div>
  );
}

function LoadingUxDemo() {
  const [phase, setPhase] = useState<"idle" | "load" | "done">("idle");

  function start() {
    setPhase("load");
    window.setTimeout(() => setPhase("done"), 1600);
  }

  return (
    <div>
      <Stage className="min-h-[200px] flex-col gap-3">
        {phase === "idle" ? (
          <p className="text-sm text-muted">点击下方发起模拟请求</p>
        ) : null}
        {phase === "load" ? (
          <>
            <LottiePlayer
              src={ANIMATIONS.loading}
              style={{ width: 100, height: 100 }}
            />
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              加载中…
            </p>
          </>
        ) : null}
        {phase === "done" ? (
          <>
            <LottiePlayer
              src={ANIMATIONS.success}
              loop={false}
              style={{ width: 160, height: 120 }}
            />
            <p className="inline-flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              加载完成
            </p>
          </>
        ) : null}
      </Stage>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={start} disabled={phase === "load"}>
          发起请求
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setPhase("idle")}>
          重置
        </Button>
      </div>
    </div>
  );
}

function MicroDemo() {
  const [liked, setLiked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Stage className="flex-col gap-2">
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className="rounded-lg border border-border bg-bg px-4 py-2 text-sm"
        >
          {liked ? "取消喜欢" : "点赞"}
        </button>
        {liked ? (
          <LottiePlayer
            key="like"
            src={ANIMATIONS.heart}
            loop={false}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Heart className="h-10 w-10 text-subtle" />
        )}
      </Stage>
      <Stage className="flex-col gap-2">
        <Button
          size="sm"
          onClick={() => {
            setCelebrate(true);
            window.setTimeout(() => setCelebrate(false), 2200);
          }}
        >
          提交成功
        </Button>
        {celebrate ? (
          <LottiePlayer
            src={ANIMATIONS.confetti}
            loop={false}
            style={{ width: 160, height: 120 }}
          />
        ) : (
          <p className="text-xs text-subtle">庆祝留给关键节点</p>
        )}
      </Stage>
    </div>
  );
}

function InspectDemo() {
  const [key, setKey] = useState<AnimationKey>("pulse");
  const [meta, setMeta] = useState<{
    fr?: number;
    frames?: number;
    layers?: number;
    w?: number;
    h?: number;
    markers?: number;
  }>({});

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Stage>
        <LottiePlayer
          key={key}
          src={ANIMATIONS[key]}
          onDataReady={(m) => {
            setMeta({
              fr: m.fr,
              frames: m.frames,
              layers: m.layers,
              w: m.w,
              h: m.h,
              markers: m.markers.length,
            });
          }}
          style={{ width: 160, height: 160 }}
        />
      </Stage>
      <div>
        <div className="flex flex-wrap gap-1.5">
          {PLAYGROUND_PRESETS.slice(0, 6).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setKey(p.id)}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs",
                key === p.id
                  ? "bg-primary text-primary-fg"
                  : "bg-surface-3 text-muted",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-xs">
          <div className="rounded-md bg-surface-2 p-2">
            <dt className="text-subtle">fr</dt>
            <dd>{meta.fr ?? "—"}</dd>
          </div>
          <div className="rounded-md bg-surface-2 p-2">
            <dt className="text-subtle">frames</dt>
            <dd>{meta.frames ?? "—"}</dd>
          </div>
          <div className="rounded-md bg-surface-2 p-2">
            <dt className="text-subtle">layers</dt>
            <dd>{meta.layers ?? "—"}</dd>
          </div>
          <div className="rounded-md bg-surface-2 p-2">
            <dt className="text-subtle">size</dt>
            <dd>
              {meta.w && meta.h ? `${meta.w}×${meta.h}` : "—"}
            </dd>
          </div>
          <div className="rounded-md bg-surface-2 p-2 col-span-2">
            <dt className="text-subtle">markers</dt>
            <dd>{meta.markers ?? "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}


function ChallengeDemo() {
  const items = [
    "是否在不可见时 pause？",
    "loop 策略是否符合语义？",
    "是否有 reduced-motion 兜底？",
    "JSON 是否带版本哈希？",
    "complete 是否推进业务状态？",
  ];
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = items.filter((_, i) => checked[i]).length;

  return (
    <div>
      <ul className="space-y-2">
        {items.map((text, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={(e) =>
                  setChecked((c) => ({ ...c, [i]: e.target.checked }))
                }
                className="mt-0.5 size-4 accent-[var(--color-primary)]"
              />
              <span>{text}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
        {done === items.length ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-primary" />
            清单完成
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 text-subtle" />
            {done}/{items.length} 已勾选
          </>
        )}
      </p>
    </div>
  );
}

function MarkersDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [markers, setMarkers] = useState<{ tm: number; cm: string }[]>([]);
  const [active, setActive] = useState<string>("");

  return (
    <div>
      <Stage>
        <LottiePlayer
          src={ANIMATIONS.progress}
          lottieRef={ref}
          loop={false}
          autoplay={false}
          onDataReady={(m) => setMarkers(m.markers.map((x) => ({ tm: x.tm, cm: x.cm })))}
          style={{ width: "100%", maxWidth: 320, height: 72 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        {markers.map((m) => (
          <Button
            key={m.cm}
            size="sm"
            variant={active === m.cm ? "default" : "secondary"}
            onClick={() => {
              setActive(m.cm);
              ref.current?.goToAndStop(m.tm, true);
            }}
          >
            {m.cm}
            <span className="ml-1 font-mono text-[10px] opacity-70">@{m.tm}</span>
          </Button>
        ))}
      </div>
      {markers.length === 0 ? (
        <p className="mt-2 text-xs text-muted">未读到 markers</p>
      ) : (
        <p className="mt-2 text-xs text-muted">
          当前：{active || "未选择"} · 共 {markers.length} 个标记
        </p>
      )}
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
          src={ANIMATIONS.loading}
          lottieRef={ref}
          loop
          style={{ width: 140, height: 140 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={dir === 1 ? "default" : "secondary"}
          onClick={() => setDir(1)}
        >
          正放 (+1)
        </Button>
        <Button
          size="sm"
          variant={dir === -1 ? "default" : "secondary"}
          onClick={() => setDir(-1)}
        >
          倒放 (-1)
        </Button>
      </div>
      <p className="mt-2 font-mono text-xs text-muted">direction = {dir}</p>
    </div>
  );
}

function SequenceDemo() {
  type Step = "idle" | "load" | "ok" | "party";
  const [step, setStep] = useState<Step>("idle");

  const src =
    step === "load"
      ? ANIMATIONS.loading
      : step === "ok"
        ? ANIMATIONS.success
        : step === "party"
          ? ANIMATIONS.confetti
          : ANIMATIONS.pulse;

  function start() {
    setStep("load");
  }

  return (
    <div>
      <Stage className="min-h-[200px] flex-col gap-2">
        <LottiePlayer
          key={step}
          src={src}
          loop={step === "load" || step === "idle"}
          autoplay={step !== "idle"}
          onComplete={() => {
            if (step === "ok") setStep("party");
            else if (step === "party") setStep("idle");
          }}
          style={{ width: 160, height: 120 }}
        />
        <span className="font-mono text-xs text-muted">step = {step}</span>
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            start();
            window.setTimeout(() => setStep("ok"), 1400);
          }}
          disabled={step === "load"}
        >
          开始串联
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setStep("idle")}>
          复位
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted">
        load（定时）→ ok（complete）→ party（complete）→ idle
      </p>
    </div>
  );
}

function ScrollDriveDemo() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) ref.current?.play();
    else ref.current?.pause();
  }, [visible]);

  return (
    <div>
      <Stage className={cn(!visible && "opacity-50")}>
        <LottiePlayer
          src={ANIMATIONS.rocket}
          lottieRef={ref}
          loop
          style={{ width: 160, height: 160 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={visible ? "default" : "secondary"}
          onClick={() => setVisible(true)}
        >
          进入视口 → play
        </Button>
        <Button
          size="sm"
          variant={!visible ? "default" : "secondary"}
          onClick={() => setVisible(false)}
        >
          离开视口 → pause
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted">
        生产用 IntersectionObserver；此处按钮模拟可见性。
      </p>
    </div>
  );
}

function RendererDemo() {
  const [renderer, setRenderer] = useState<"svg" | "canvas">("svg");

  return (
    <div>
      <Stage>
        <LottiePlayer
          key={renderer}
          src={ANIMATIONS.heart}
          renderer={renderer}
          style={{ width: 160, height: 160 }}
        />
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={renderer === "svg" ? "default" : "secondary"}
          onClick={() => setRenderer("svg")}
        >
          SVG
        </Button>
        <Button
          size="sm"
          variant={renderer === "canvas" ? "default" : "secondary"}
          onClick={() => setRenderer("canvas")}
        >
          Canvas
        </Button>
      </div>
      <p className="mt-2 font-mono text-xs text-muted">renderer = {renderer}</p>
    </div>
  );
}

function OptimizeDemo() {
  const [rows, setRows] = useState<
    { id: AnimationKey; label: string; kb: string; layers: number; frames: number }[]
  >([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const out: typeof rows = [];
      for (const p of PLAYGROUND_PRESETS) {
        try {
          const res = await fetch(ANIMATIONS[p.id]);
          const text = await res.text();
          const data = JSON.parse(text) as {
            layers?: unknown[];
            ip?: number;
            op?: number;
          };
          out.push({
            id: p.id,
            label: p.label,
            kb: (text.length / 1024).toFixed(1),
            layers: data.layers?.length ?? 0,
            frames: Math.round((data.op ?? 0) - (data.ip ?? 0)),
          });
        } catch {
          /* skip */
        }
      }
      if (!cancelled) setRows(out);
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[20rem] text-left text-xs">
        <thead>
          <tr className="border-b border-border text-muted">
            <th className="py-2 pr-2 font-medium">预设</th>
            <th className="py-2 pr-2 font-medium">≈KB</th>
            <th className="py-2 pr-2 font-medium">layers</th>
            <th className="py-2 font-medium">frames</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-border/60">
              <td className="py-2 pr-2 text-fg">{r.label}</td>
              <td className="py-2 pr-2 font-mono">{r.kb}</td>
              <td className="py-2 pr-2 font-mono">{r.layers}</td>
              <td className="py-2 font-mono">{r.frames}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? (
        <p className="text-xs text-muted">加载体积数据…</p>
      ) : (
        <p className="mt-2 text-xs text-muted">
          体积为未 gzip 的 JSON 文本近似；上线还有压缩与 HTTP 缓存。
        </p>
      )}
    </div>
  );
}
