import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { ANIMATIONS } from "@/data/animations";
import { LottiePlayer } from "@/components/LottiePlayer";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/store/progress";
import { cn } from "@/lib/utils";
import {
  Check,
  Clapperboard,
  Heart,
  Loader2,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});

const QUESTS = [
  {
    id: "q-play",
    title: "完成一次播放控制",
    desc: "在下方播放器中点击 Play，再 Pause。",
  },
  {
    id: "q-like",
    title: "完成点赞微交互",
    desc: "切换「喜欢」状态至少一次。",
  },
  {
    id: "q-async",
    title: "跑通异步四态",
    desc: "模拟一次成功或失败请求。",
  },
  {
    id: "q-scrub",
    title: "用滑杆 scrub 到 50%+",
    desc: "把进度拖到一半以上。",
  },
] as const;

function StudioPage() {
  const studioDone = useProgress((s) => s.studioDone);
  const markStudio = useProgress((s) => s.markStudio);
  const checkInToday = useProgress((s) => s.checkInToday);
  const doneCount = QUESTS.filter((q) => studioDone.includes(q.id)).length;

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Clapperboard className="h-3.5 w-3.5" />
          Studio
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          动画工坊
        </h1>
        <p className="mt-1 text-sm text-muted">
          四项闯关，把课程里的控制、微交互与状态机练熟
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 min-w-[8rem] flex-1 overflow-hidden rounded-full bg-surface-3 sm:max-w-xs">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{
                width: `${Math.round((doneCount / QUESTS.length) * 100)}%`,
              }}
            />
          </div>
          <span className="font-mono text-xs text-muted">
            {doneCount}/{QUESTS.length}
          </span>
        </div>
      </header>

      <ul className="mb-8 grid gap-2 sm:grid-cols-2">
        {QUESTS.map((q) => {
          const ok = studioDone.includes(q.id);
          return (
            <li
              key={q.id}
              className={cn(
                "rounded-xl border p-3",
                ok
                  ? "border-primary/30 bg-primary-soft"
                  : "border-border bg-surface",
              )}
            >
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full",
                    ok ? "bg-primary text-primary-fg" : "bg-surface-3 text-muted",
                  )}
                >
                  {ok ? <Check className="h-3 w-3" /> : <Target className="h-3 w-3" />}
                </span>
                <div>
                  <p className="text-sm font-medium text-fg">{q.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{q.desc}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="space-y-6">
        <PlayQuest
          done={studioDone.includes("q-play")}
          onDone={() => {
            markStudio("q-play");
            checkInToday();
          }}
        />
        <LikeQuest
          done={studioDone.includes("q-like")}
          onDone={() => {
            markStudio("q-like");
            checkInToday();
          }}
        />
        <AsyncQuest
          done={studioDone.includes("q-async")}
          onDone={() => {
            markStudio("q-async");
            checkInToday();
          }}
        />
        <ScrubQuest
          done={studioDone.includes("q-scrub")}
          onDone={() => {
            markStudio("q-scrub");
            checkInToday();
          }}
        />
      </div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <h2 className="font-display text-base font-semibold text-fg">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function PlayQuest({ done, onDone }: { done: boolean; onDone: () => void }) {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [played, setPlayed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!done && played && paused) onDone();
  }, [played, paused, done, onDone]);

  return (
    <Panel title="1. 播放控制">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <LottiePlayer
          src={ANIMATIONS.rocket}
          lottieRef={ref}
          loop
          autoplay={false}
          style={{ width: 140, height: 140 }}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => {
              ref.current?.play();
              setPlayed(true);
            }}
          >
            Play
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              ref.current?.pause();
              setPaused(true);
            }}
          >
            Pause
          </Button>
        </div>
      </div>
      {done ? (
        <p className="mt-3 text-xs text-primary">已完成</p>
      ) : (
        <p className="mt-3 text-xs text-muted">先 Play 再 Pause 以完成任务</p>
      )}
    </Panel>
  );
}

function LikeQuest({ done, onDone }: { done: boolean; onDone: () => void }) {
  const [liked, setLiked] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <Panel title="2. 点赞微交互">
      <button
        type="button"
        onClick={() => {
          setLiked((v) => !v);
          setToggled(true);
          if (!done) onDone();
        }}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors",
          liked
            ? "border-primary/40 bg-primary-soft text-primary"
            : "border-border bg-surface-2 text-fg",
        )}
      >
        <Heart className={cn("h-4 w-4", liked && "fill-primary")} />
        {liked ? "已喜欢" : "点赞"}
      </button>
      {liked ? (
        <div className="mt-3">
          <LottiePlayer
            key="heart"
            src={ANIMATIONS.heart}
            loop={false}
            style={{ width: 100, height: 100 }}
          />
        </div>
      ) : null}
      <p className="mt-2 text-xs text-muted">
        {done || toggled ? "状态已切换" : "点击切换状态"}
      </p>
    </Panel>
  );
}

function AsyncQuest({ done, onDone }: { done: boolean; onDone: () => void }) {
  const [phase, setPhase] = useState<"idle" | "load" | "ok" | "err">("idle");

  function run(ok: boolean) {
    setPhase("load");
    window.setTimeout(() => {
      setPhase(ok ? "ok" : "err");
      if (!done) onDone();
    }, 1200);
  }

  const src =
    phase === "load"
      ? ANIMATIONS.loading
      : phase === "ok"
        ? ANIMATIONS.success
        : phase === "err"
          ? ANIMATIONS.error
          : ANIMATIONS.pulse;

  return (
    <Panel title="3. 异步四态">
      <div className="flex min-h-[120px] items-center gap-4">
        <LottiePlayer
          key={phase}
          src={src}
          loop={phase === "load" || phase === "idle"}
          style={{ width: 120, height: 100 }}
        />
        <div>
          <p className="font-mono text-xs text-muted">phase = {phase}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="sm"
              disabled={phase === "load"}
              onClick={() => run(true)}
            >
              {phase === "load" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : null}
              成功路径
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={phase === "load"}
              onClick={() => run(false)}
            >
              失败路径
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPhase("idle")}
            >
              复位
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function ScrubQuest({ done, onDone }: { done: boolean; onDone: () => void }) {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    ref.current?.goToAndStop(Math.round(p * 89), true);
    if (p >= 0.5 && !done) onDone();
  }, [p, done, onDone]);

  return (
    <Panel title="4. Scrub 进度">
      <LottiePlayer
        src={ANIMATIONS.progress}
        lottieRef={ref}
        loop={false}
        autoplay={false}
        style={{ width: "100%", maxWidth: 320, height: 64 }}
      />
      <label className="mt-3 block text-sm text-muted">
        {(p * 100).toFixed(0)}%
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
    </Panel>
  );
}
