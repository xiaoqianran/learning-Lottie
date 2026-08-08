import {
  useEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";
import type { AnimationItem } from "lottie-web";
import type { LottieRefCurrentProps } from "lottie-react";

export type LottieRenderer = "svg" | "canvas";

export type LottieMarker = {
  /** time in frames */
  tm: number;
  /** comment / name */
  cm: string;
  dr?: number;
};

export type LottieMeta = {
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  layers: number;
  frames: number;
  seconds: number;
  markers: LottieMarker[];
  raw: unknown;
};

type Props = {
  /** Remote or public path to JSON. Ignored when animationData is set. */
  src?: string;
  /** Inline animation JSON (file upload / import). */
  animationData?: unknown;
  lottieRef?: RefObject<LottieRefCurrentProps | null>;
  loop?: boolean | number;
  autoplay?: boolean;
  renderer?: LottieRenderer;
  className?: string;
  style?: CSSProperties;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onEnterFrame?: (e: unknown) => void;
  onDataReady?: (meta: LottieMeta) => void;
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

function parseMeta(data: unknown): LottieMeta {
  const d = data as {
    fr?: number;
    ip?: number;
    op?: number;
    w?: number;
    h?: number;
    layers?: unknown[];
    markers?: LottieMarker[];
  };
  const fr = d.fr ?? 60;
  const ip = d.ip ?? 0;
  const op = d.op ?? 0;
  const frames = Math.max(0, Math.round(op - ip));
  const markers = Array.isArray(d.markers)
    ? d.markers.filter((m) => m && typeof m.tm === "number")
    : [];
  return {
    fr,
    ip,
    op,
    w: d.w ?? 0,
    h: d.h ?? 0,
    layers: d.layers?.length ?? 0,
    frames,
    seconds: fr > 0 ? frames / fr : 0,
    markers,
    raw: data,
  };
}

/** Client-only Lottie via lottie-web (avoids lottie-react default-export interop issues). */
export function LottiePlayer({
  src,
  animationData,
  lottieRef,
  loop = true,
  autoplay = true,
  renderer = "svg",
  className,
  style,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  onDataReady,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  // Keep latest callbacks without re-booting the animation every render.
  const onCompleteRef = useRef(onComplete);
  const onLoopCompleteRef = useRef(onLoopComplete);
  const onEnterFrameRef = useRef(onEnterFrame);
  const onDataReadyRef = useRef(onDataReady);
  onCompleteRef.current = onComplete;
  onLoopCompleteRef.current = onLoopComplete;
  onEnterFrameRef.current = onEnterFrame;
  onDataReadyRef.current = onDataReady;

  useEffect(() => {
    let cancelled = false;
    let anim: AnimationItem | null = null;

    async function boot() {
      const el = containerRef.current;
      if (!el) return;
      if (!src && animationData == null) {
        el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;min-height:6rem;font-size:12px;opacity:.7;text-align:center;padding:8px">未指定动画</div>`;
        return;
      }

      const mod = (await import("lottie-web")) as unknown as
        | LottieApi
        | { default: LottieApi };
      const lottie: LottieApi =
        "loadAnimation" in mod &&
        typeof (mod as LottieApi).loadAnimation === "function"
          ? (mod as LottieApi)
          : (mod as { default: LottieApi }).default;

      if (cancelled || !containerRef.current) return;

      let data: unknown = animationData;
      if (data == null && src) {
        try {
          const res = await fetch(src);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          data = await res.json();
        } catch {
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;min-height:6rem;font-size:12px;opacity:.7;text-align:center;padding:8px">加载失败</div>`;
          }
          return;
        }
      }

      if (cancelled || !containerRef.current || data == null) return;
      const meta = parseMeta(data);
      onDataReadyRef.current?.(meta);

      el.innerHTML = "";
      anim = lottie.loadAnimation({
        container: el,
        renderer,
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

      anim.addEventListener("complete", () => onCompleteRef.current?.());
      anim.addEventListener("loopComplete", () => onLoopCompleteRef.current?.());
      anim.addEventListener("enterFrame", (e) => onEnterFrameRef.current?.(e));
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
    // Re-create when source / loop / autoplay / renderer change
  }, [src, animationData, loop, autoplay, renderer]);

  return (
    <div ref={containerRef} className={className} style={style} aria-hidden />
  );
}
