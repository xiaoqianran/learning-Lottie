import { useEffect, useState } from "react";
import { LottiePlayer } from "@/components/LottiePlayer";
import { recolorLottieHex } from "@/lib/lottie-recolor";
import { ANIMATIONS } from "@/data/animations";
import { cn } from "@/lib/utils";

const PRESETS = [
  { hex: "#0d9488", label: "青绿" },
  { hex: "#6366f1", label: "靛蓝" },
  { hex: "#e11d48", label: "玫红" },
  { hex: "#ca8a04", label: "琥珀" },
  { hex: "#334155", label: "石板" },
] as const;

type Props = {
  src?: string;
  className?: string;
  onHexChange?: (hex: string) => void;
};

/** Fetch JSON once, recolor fills/strokes client-side, preview live. */
export function LottieRecolorPreview({
  src = ANIMATIONS.pulse,
  className,
  onHexChange,
}: Props) {
  const [base, setBase] = useState<unknown>(null);
  const [hex, setHex] = useState<string>(PRESETS[0].hex);
  const [data, setData] = useState<unknown>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setBase(json);
          setErr(null);
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "load failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (base == null) return;
    setData(recolorLottieHex(base, hex));
  }, [base, hex]);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-border bg-surface-2 p-4">
        {err ? (
          <p className="text-xs text-muted">加载失败：{err}</p>
        ) : data ? (
          <LottiePlayer
            key={hex}
            animationData={data}
            style={{ width: 140, height: 140 }}
          />
        ) : (
          <p className="text-xs text-muted">加载中…</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.hex}
            type="button"
            onClick={() => {
              setHex(p.hex);
              onHexChange?.(p.hex);
            }}

            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
              hex === p.hex
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-surface text-muted hover:text-fg",
            )}
          >
            <span
              className="h-3 w-3 rounded-full ring-1 ring-black/10"
              style={{ background: p.hex }}
            />
            {p.label}
          </button>
        ))}
      </div>
      <p className="font-mono text-[11px] text-muted">{hex}</p>
    </div>
  );
}
