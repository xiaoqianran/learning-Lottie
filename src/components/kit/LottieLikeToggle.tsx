import { useState } from "react";
import { Heart } from "lucide-react";
import { LottiePlayer } from "@/components/LottiePlayer";
import { ANIMATIONS } from "@/data/animations";
import { cn } from "@/lib/utils";

type Props = {
  defaultLiked?: boolean;
  onChange?: (liked: boolean) => void;
  className?: string;
  size?: number;
};

/** Drop-in like / favorite control: React state owns truth, Lottie is presentation. */
export function LottieLikeToggle({
  defaultLiked = false,
  onChange,
  className,
  size = 96,
}: Props) {
  const [liked, setLiked] = useState(defaultLiked);

  function toggle() {
    setLiked((v) => {
      const next = !v;
      onChange?.(next);
      return next;
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      className={cn(
        "inline-flex flex-col items-center gap-2 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm transition-colors hover:border-primary/40",
        liked && "border-primary/40 bg-primary-soft text-primary",
        className,
      )}
    >
      {liked ? (
        <LottiePlayer
          key="on"
          src={ANIMATIONS.heart}
          loop={false}
          style={{ width: size, height: size }}
        />
      ) : (
        <Heart className="text-subtle" style={{ width: size * 0.4, height: size * 0.4 }} />
      )}
      <span>{liked ? "已喜欢" : "点赞"}</span>
    </button>
  );
}
