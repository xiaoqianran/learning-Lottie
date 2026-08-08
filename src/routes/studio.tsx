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
  ArrowLeftRight,
  Flag,
  Layers,
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
  {
    id: "q-reverse",
    title: "完成一次倒放",
    desc: "切换到倒放并播放。",
  },
  {
    id: "q-marker",
    title: "跳到命名标记",
    desc: "点击任意 marker 定位。",
  },
  {
    id: "q-sequence",
    title: "跑完串联三步",
    desc: "load → ok → party 走通。",
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
          Studio · v2
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">
          动画工坊
        </h1>
        <p className="mt-1 text-sm text-muted">
          七项闯关：控制、微交互、状态机、scrub、倒放、markers、串联
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
        <ReverseQuest
          done={studioDone.includes("q-reverse")}
          onDone={() => {
            markStudio("q-reverse");
            checkInToday();
          }}
        />
        <MarkerQuest
          done={studioDone.includes("q-marker")}
          onDone={() => {
            markStudio("q-marker");
            checkInToday();
          }}
        />
        <SequenceQuest
          done={studioDone.includes("q-sequence")}
          onDone={() => {
            markStudio("q-sequence");
            checkInToday();
          }}
        />
      </div>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <h2 className="flex items-center gap-2 font-display text-base font-semibold text-fg">
        {icon}
        {title}
      </h2>
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

function ReverseQuest({ done, onDone }: { done: boolean; onDone: () => void }) {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [dir, setDir] = useState<1 | -1>(1);

  return (
    <Panel
      title="5. 倒放"
      icon={<ArrowLeftRight className="h-4 w-4 text-primary" />}
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <LottiePlayer
          src={ANIMATIONS.loading}
          lottieRef={ref}
          loop
          style={{ width: 120, height: 120 }}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={dir === 1 ? "default" : "secondary"}
            onClick={() => {
              setDir(1);
              ref.current?.setDirection(1);
              ref.current?.play();
            }}
          >
            正放
          </Button>
          <Button
            size="sm"
            variant={dir === -1 ? "default" : "secondary"}
            onClick={() => {
              setDir(-1);
              ref.current?.setDirection(-1);
              ref.current?.play();
              if (!done) onDone();
            }}
          >
            倒放
          </Button>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        {done ? "已完成倒放" : "点击「倒放」完成任务"}
      </p>
    </Panel>
  );
}

function MarkerQuest({ done, onDone }: { done: boolean; onDone: () => void }) {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [markers, setMarkers] = useState<{ tm: number; cm: string }[]>([]);

  return (
    <Panel
      title="6. Markers"
      icon={<Flag className="h-4 w-4 text-primary" />}
    >
      <LottiePlayer
        src={ANIMATIONS.progress}
        lottieRef={ref}
        loop={false}
        autoplay={false}
        onDataReady={(m) =>
          setMarkers(m.markers.map((x) => ({ tm: x.tm, cm: x.cm })))
        }
        style={{ width: "100%", maxWidth: 320, height: 64 }}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {markers.map((m) => (
          <Button
            key={m.cm}
            size="sm"
            variant="secondary"
            onClick={() => {
              ref.current?.goToAndStop(m.tm, true);
              if (!done) onDone();
            }}
          >
            {m.cm}
          </Button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        {done ? "已完成" : "点击任一标记"}
      </p>
    </Panel>
  );
}

function SequenceQuest({
  done,
  onDone,
}: {
  done: boolean;
  onDone: () => void;
}) {
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

  return (
    <Panel
      title="7. 串联三步"
      icon={<Layers className="h-4 w-4 text-primary" />}
    >
      <div className="flex min-h-[120px] items-center gap-4">
        <LottiePlayer
          key={step}
          src={src}
          loop={step === "load" || step === "idle"}
          autoplay={step !== "idle"}
          onComplete={() => {
            if (step === "ok") setStep("party");
            if (step === "party") {
              if (!done) onDone();
              setStep("idle");
            }
          }}
          style={{ width: 120, height: 100 }}
        />
        <div>
          <p className="font-mono text-xs text-muted">step = {step}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="sm"
              disabled={step === "load"}
              onClick={() => {
                setStep("load");
                window.setTimeout(() => setStep("ok"), 1200);
              }}
            >
              开始
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setStep("idle")}>
              复位
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        {done ? "串联完成" : "跑完 load → ok → party"}
      </p>
    </Panel>
  );
}
