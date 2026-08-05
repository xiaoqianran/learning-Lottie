import {
  useEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";
import type { AnimationItem } from "lottie-web";
import type { LottieRefCurrentProps } from "lottie-react";

type Props = {
  src: string;
  lottieRef?: RefObject<LottieRefCurrentProps | null>;
  loop?: boolean | number;
  autoplay?: boolean;
  className?: string;
  style?: CSSProperties;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onEnterFrame?: (e: unknown) => void;
  onDataReady?: (data: unknown) => void;
};

type LottieApi = {
  loadAnimation: (params: {
    container: Element;
    renderer?: "svg" | "canvas" | "html";
    loop?: boolean | number;
    autoplay?: boolean;
    animationData?: unknown;
    path?: string;
  }) => AnimationItem;
};

/** Client-only Lottie via lottie-web (avoids lottie-react default-export interop issues). */
export function LottiePlayer({
  src,
  lottieRef,
  loop = true,
  autoplay = true,
  className,
  style,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  onDataReady,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    let anim: AnimationItem | null = null;

    async function boot() {
      const el = containerRef.current;
      if (!el) return;

      const mod = (await import("lottie-web")) as unknown as
        | LottieApi
        | { default: LottieApi };
      const lottie: LottieApi =
        "loadAnimation" in mod && typeof (mod as LottieApi).loadAnimation === "function"
          ? (mod as LottieApi)
          : (mod as { default: LottieApi }).default;

      if (cancelled || !containerRef.current) return;

      let data: unknown;
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
      } catch (e) {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;min-height:6rem;font-size:12px;opacity:.7;text-align:center;padding:8px">加载失败</div>`;
        }
        return;
      }

      if (cancelled || !containerRef.current) return;
      onDataReady?.(data);

      el.innerHTML = "";
      anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop,
        autoplay,
        animationData: data,
      });
      animRef.current = anim;

      const bindRef = () => {
        if (!lottieRef || !anim) return;
        lottieRef.current = {
          play: () => anim!.play(),
          stop: () => anim!.stop(),
          pause: () => anim!.pause(),
          setSpeed: (s: number) => anim!.setSpeed(s),
          goToAndStop: (v: number, isFrame?: boolean) =>
            anim!.goToAndStop(v, isFrame),
          goToAndPlay: (v: number, isFrame?: boolean) =>
            anim!.goToAndPlay(v, isFrame),
          setDirection: (d) => anim!.setDirection(d),
          playSegments: (seg, force) => anim!.playSegments(seg, force),
          setSubframe: (u: boolean) => anim!.setSubframe(u),
          getDuration: (inFrames?: boolean) => anim!.getDuration(inFrames),
          destroy: () => anim!.destroy(),
          animationContainerRef: containerRef as RefObject<HTMLDivElement>,
          animationLoaded: true,
          animationItem: anim,
        };
      };
      bindRef();

      if (onComplete) anim.addEventListener("complete", onComplete);
      if (onLoopComplete) anim.addEventListener("loopComplete", onLoopComplete);
      if (onEnterFrame) anim.addEventListener("enterFrame", onEnterFrame);
    }

    void boot();

    return () => {
      cancelled = true;
      if (anim) {
        anim.destroy();
      }
      animRef.current = null;
      if (lottieRef) lottieRef.current = null;
    };
    // Intentionally re-create when src / loop / autoplay change
  }, [src, loop, autoplay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      aria-hidden
    />
  );
}
