import { useState } from "react";
import { LottiePlayer } from "@/components/LottiePlayer";
import { ANIMATIONS } from "@/data/animations";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export type AsyncPhase = "idle" | "loading" | "success" | "error";

type Props = {
  /** Simulated latency ms */
  delayMs?: number;
  className?: string;
};

/**
 * Four-state async feedback slot: idle → loading → success | error.
 * Use as a teaching template for form submit / fetch UX.
 */
export function LottieAsyncSlot({ delayMs = 1200, className }: Props) {
  const [phase, setPhase] = useState<AsyncPhase>("idle");

  function run(ok: boolean) {
    setPhase("loading");
    window.setTimeout(() => setPhase(ok ? "success" : "error"), delayMs);
  }

  const src =
    phase === "loading"
      ? ANIMATIONS.loading
      : phase === "success"
        ? ANIMATIONS.success
        : phase === "error"
          ? ANIMATIONS.error
          : ANIMATIONS.pulse;

  return (
    <div className={className}>
      <div className="flex min-h-[120px] items-center gap-4">
        <LottiePlayer
          key={phase}
          src={src}
          loop={phase === "loading" || phase === "idle"}
          style={{ width: 120, height: 100 }}
        />
        <div>
          <p className="font-mono text-xs text-muted">phase = {phase}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" disabled={phase === "loading"} onClick={() => run(true)}>
              {phase === "loading" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : null}
              成功
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={phase === "loading"}
              onClick={() => run(false)}
            >
              失败
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setPhase("idle")}>
              复位
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
