import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { ANIMATIONS, PLAYGROUND_PRESETS, type AnimationKey } from "@/data/animations";
import { LottiePlayer } from "@/components/LottiePlayer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Square,
} from "lucide-react";

export const Route = createFileRoute("/playground")({
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [preset, setPreset] = useState<AnimationKey>("rocket");
  const [loop, setLoop] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [customUrl, setCustomUrl] = useState("");
  const [src, setSrc] = useState<string>(ANIMATIONS.rocket);
  const [meta, setMeta] = useState<string>("");

  useEffect(() => {
    ref.current?.setSpeed(speed);
  }, [speed, src]);

  function applyPreset(id: AnimationKey) {
    setPreset(id);
    setCustomUrl("");
    setSrc(ANIMATIONS[id]);
  }

  function applyCustom() {
    const u = customUrl.trim();
    if (!u) return;
    setSrc(u);
  }

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Playground
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          Lottie 播放器实验台
        </h1>
        <p className="mt-1 text-sm text-muted">
          选预设或粘贴 JSON 地址，调节 loop / 速度 / 播放控制
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_16rem]">
        <section className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex min-h-[280px] items-center justify-center bg-surface-2 p-6">
            <LottiePlayer
              key={src + String(loop) + String(autoplay)}
              src={src}
              lottieRef={ref}
              loop={loop}
              autoplay={autoplay}
              onDataReady={(raw) => {
                const d = raw as {
                  fr: number;
                  ip: number;
                  op: number;
                  layers: unknown[];
                  w: number;
                  h: number;
                };
                const frames = Math.round(d.op - d.ip);
                const sec = (frames / d.fr).toFixed(2);
                setMeta(
                  `${d.w}×${d.h} · ${d.fr}fps · ${frames}f ≈ ${sec}s · ${d.layers?.length ?? 0} layers`,
                );
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
              onClick={() => ref.current?.goToAndPlay(0, true)}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restart
            </Button>
          </div>
          {meta ? (
            <p className="border-t border-border px-3 py-2 font-mono text-[11px] text-muted">
              {meta}
            </p>
          ) : null}
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs font-medium text-muted">预设</p>
            <ul className="mt-2 flex flex-col gap-1">
              {PLAYGROUND_PRESETS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className={cn(
                      "w-full rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                      preset === p.id && !customUrl
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
          </div>

          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs font-medium text-muted">自定义 URL</p>
            <input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="/animations/xxx.json 或 https://…"
              className="mt-2 h-10 w-full rounded-md border border-border bg-bg px-2 text-xs text-fg placeholder:text-subtle"
            />
            <Button
              size="sm"
              className="mt-2 w-full"
              variant="secondary"
              onClick={applyCustom}
            >
              加载
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
