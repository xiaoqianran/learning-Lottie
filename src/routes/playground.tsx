import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import {
  ANIMATIONS,
  PLAYGROUND_PRESETS,
  type AnimationKey,
} from "@/data/animations";
import {
  LottiePlayer,
  type LottieMarker,
  type LottieMeta,
  type LottieRenderer,
} from "@/components/LottiePlayer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  Upload,
  ArrowLeftRight,
} from "lucide-react";

export const Route = createFileRoute("/playground")({
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preset, setPreset] = useState<AnimationKey | null>("rocket");
  const [loop, setLoop] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [renderer, setRenderer] = useState<LottieRenderer>("svg");
  const [customUrl, setCustomUrl] = useState("");
  const [src, setSrc] = useState<string | undefined>(ANIMATIONS.rocket);
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [meta, setMeta] = useState<LottieMeta | null>(null);
  const [frame, setFrame] = useState(0);
  const [segFrom, setSegFrom] = useState(0);
  const [segTo, setSegTo] = useState(30);
  const [sourceLabel, setSourceLabel] = useState("预设 · rocket");

  useEffect(() => {
    ref.current?.setSpeed(speed);
  }, [speed, src, animationData, renderer]);

  useEffect(() => {
    ref.current?.setDirection(direction);
  }, [direction, src, animationData, renderer]);

  function applyPreset(id: AnimationKey) {
    setPreset(id);
    setCustomUrl("");
    setAnimationData(null);
    setSrc(ANIMATIONS[id]);
    setSourceLabel(`预设 · ${id}`);
  }

  function applyCustom() {
    const u = customUrl.trim();
    if (!u) return;
    setPreset(null);
    setAnimationData(null);
    setSrc(u);
    setSourceLabel("自定义 URL");
  }

  async function onFile(file: File | null) {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      setPreset(null);
      setCustomUrl("");
      setSrc(undefined);
      setAnimationData(data);
      setSourceLabel(`本地 · ${file.name}`);
    } catch {
      setSourceLabel("本地文件解析失败");
    }
  }

  function onMeta(m: LottieMeta) {
    setMeta(m);
    setSegFrom(m.ip);
    setSegTo(Math.min(m.op, m.ip + Math.round(m.frames * 0.35)));
  }

  const playerKey = [
    src ?? "data",
    String(loop),
    String(autoplay),
    renderer,
    sourceLabel,
  ].join("|");

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Playground · v2
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          Lottie 播放器实验台
        </h1>
        <p className="mt-1 text-sm text-muted">
          预设 / 本地 JSON / URL · 速度 · 方向 · 段落 · renderer · scrub
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_17rem]">
        <section className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex min-h-[280px] items-center justify-center bg-surface-2 p-6">
            <LottiePlayer
              key={playerKey}
              src={src}
              animationData={animationData ?? undefined}
              lottieRef={ref}
              loop={loop}
              autoplay={autoplay}
              renderer={renderer}
              onDataReady={onMeta}
              onEnterFrame={(e) => {
                const cur = (e as { currentTime?: number })?.currentTime;
                if (typeof cur === "number") setFrame(Math.round(cur));
              }}
              style={{ width: "min(100%, 320px)", height: 240 }}
            />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border p-3">
            <Button size="sm" onClick={() => ref.current?.play()}>
              <Play className="h-3.5 w-3.5" />
              Play
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => ref.current?.pause()}
            >
              <Pause className="h-3.5 w-3.5" />
              Pause
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => ref.current?.stop()}
            >
              <Square className="h-3.5 w-3.5" />
              Stop
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => ref.current?.goToAndPlay(meta?.ip ?? 0, true)}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restart
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const next = direction === 1 ? -1 : 1;
                setDirection(next);
                ref.current?.setDirection(next);
                ref.current?.play();
              }}
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              方向 {direction === 1 ? "→" : "←"}
            </Button>
          </div>

          {meta ? (
            <div className="space-y-2 border-t border-border px-3 py-3">
              <p className="font-mono text-[11px] text-muted">
                {sourceLabel} · {meta.w}×{meta.h} · {meta.fr}fps · {meta.frames}f
                ≈ {meta.seconds.toFixed(2)}s · {meta.layers} layers · frame{" "}
                {frame}
              </p>
              <label className="block text-xs text-muted">
                scrub {meta.frames ? Math.round((frame / meta.frames) * 100) : 0}
                %
                <input
                  type="range"
                  min={meta.ip}
                  max={Math.max(meta.ip, meta.op - 1)}
                  step={1}
                  value={frame}
                  onChange={(e) => {
                    const f = Number(e.target.value);
                    setFrame(f);
                    ref.current?.goToAndStop(f, true);
                  }}
                  className="mt-1 w-full accent-[var(--color-primary)]"
                />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs text-muted">
                  segment from
                  <input
                    type="number"
                    value={segFrom}
                    onChange={(e) => setSegFrom(Number(e.target.value))}
                    className="mt-1 h-9 w-full rounded-md border border-border bg-bg px-2 font-mono text-xs"
                  />
                </label>
                <label className="text-xs text-muted">
                  segment to
                  <input
                    type="number"
                    value={segTo}
                    onChange={(e) => setSegTo(Number(e.target.value))}
                    className="mt-1 h-9 w-full rounded-md border border-border bg-bg px-2 font-mono text-xs"
                  />
                </label>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-full"
                onClick={() =>
                  ref.current?.playSegments([segFrom, segTo], true)
                }
              >
                playSegments([{segFrom}, {segTo}])
              </Button>
              {meta.markers.length > 0 ? (
                <div>
                  <p className="mb-1.5 text-xs text-muted">markers</p>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.markers.map((m: LottieMarker) => (
                      <button
                        key={`${m.cm}-${m.tm}`}
                        type="button"
                        onClick={() => {
                          setFrame(m.tm);
                          ref.current?.goToAndPlay(m.tm, true);
                        }}
                        className="rounded-full bg-surface-3 px-2.5 py-1 font-mono text-[10px] text-fg hover:bg-primary-soft hover:text-primary"
                      >
                        {m.cm}@{m.tm}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs font-medium text-muted">预设</p>
            <ul className="mt-2 flex max-h-52 flex-col gap-1 overflow-y-auto">
              {PLAYGROUND_PRESETS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className={cn(
                      "w-full rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                      preset === p.id && !animationData && !customUrl
                        ? "bg-primary-soft text-primary"
                        : "text-fg hover:bg-surface-2",
                    )}
                  >
                    <span className="block font-medium">{p.label}</span>
                    <span className="block text-[11px] text-muted">
                      {p.desc}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs font-medium text-muted">参数</p>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
                className="size-4 accent-[var(--color-primary)]"
              />
              loop
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
                className="size-4 accent-[var(--color-primary)]"
              />
              autoplay
            </label>
            <label className="mt-3 block text-xs text-muted">
              speed {speed.toFixed(2)}x
              <input
                type="range"
                min={0.25}
                max={3}
                step={0.05}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="mt-1 w-full accent-[var(--color-primary)]"
              />
            </label>
            <div className="mt-3">
              <p className="text-xs text-muted">renderer</p>
              <div className="mt-1.5 flex gap-2">
                {(["svg", "canvas"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRenderer(r)}
                    className={cn(
                      "flex-1 rounded-md px-2 py-1.5 text-xs font-medium",
                      renderer === r
                        ? "bg-primary text-primary-fg"
                        : "bg-surface-3 text-muted",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs font-medium text-muted">自定义 URL</p>
            <input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="…/xxx.json 或 https://…"
              className="mt-2 h-10 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg placeholder:text-subtle"
            />
            <Button
              size="sm"
              className="mt-2 w-full"
              variant="secondary"
              onClick={applyCustom}
            >
              加载 URL
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs font-medium text-muted">本地 JSON</p>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
            <Button
              size="sm"
              className="mt-2 w-full"
              variant="secondary"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5" />
              选择文件
            </Button>
            <p className="mt-2 text-[11px] leading-relaxed text-subtle">
              仅在浏览器本地解析，不上传服务器。
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
