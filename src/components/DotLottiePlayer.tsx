import { useEffect, useRef, type CSSProperties } from "react";

type Props = {
  /** URL to .json or .lottie (respect Vite base via ANIMATIONS helpers) */
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  onLoad?: () => void;
  onComplete?: () => void;
  onError?: (err: unknown) => void;
};

type DotLottieInstance = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSpeed: (s: number) => void;
  setLoop: (l: boolean) => void;
  destroy: () => void;
  addEventListener: (ev: string, cb: (e?: unknown) => void) => void;
  removeEventListener?: (ev: string, cb: (e?: unknown) => void) => void;
};

/**
 * Official @lottiefiles/dotlottie-web wrapper (canvas).
 * Complements LottiePlayer (lottie-web/svg) for teaching modern runtimes.
 */
export function DotLottiePlayer({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  className,
  style,
  onLoad,
  onComplete,
  onError,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<DotLottieInstance | null>(null);
  const onLoadRef = useRef(onLoad);
  const onCompleteRef = useRef(onComplete);
  const onErrorRef = useRef(onError);
  onLoadRef.current = onLoad;
  onCompleteRef.current = onComplete;
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;
    let player: DotLottieInstance | null = null;

    async function boot() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      try {
        const mod = await import("@lottiefiles/dotlottie-web");
        const DotLottie = mod.DotLottie as new (opts: Record<string, unknown>) => DotLottieInstance;
        if (cancelled || !canvasRef.current) return;

        // Resolve relative src against page origin + base
        const absolute =
          src.startsWith("http") || src.startsWith("data:")
            ? src
            : new URL(src, window.location.href).href;

        player = new DotLottie({
          canvas: canvasRef.current,
          src: absolute,
          loop,
          autoplay,
          speed,
        });
        playerRef.current = player;

        player.addEventListener("load", () => onLoadRef.current?.());
        player.addEventListener("complete", () => onCompleteRef.current?.());
        player.addEventListener("loadError", (e) => onErrorRef.current?.(e));
      } catch (e) {
        onErrorRef.current?.(e);
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.font = "12px sans-serif";
            ctx.fillText("dotLottie 加载失败", 8, 20);
          }
        }
      }
    }

    void boot();

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [src, loop, autoplay, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: 200, height: 200, ...style }}
      aria-hidden
    />
  );
}
