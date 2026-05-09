import { cn } from "@/lib/utils";

type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
};

const SIZE_CLASSES: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-4xl sm:text-5xl",
};

const SUBTITLE_CLASSES: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-[7px] sm:text-[8px]",
  md: "text-[9px] sm:text-[10px]",
  lg: "text-xs sm:text-sm",
};

/**
 * Wordmark INVICTUS — tipográfico, sin PNG.
 * La "T" está renderizada en rojo sólido como en el logo original.
 */
export function Wordmark({
  size = "md",
  showSubtitle = false,
  className,
}: WordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col items-start", className)}>
      <span
        className={cn(
          "font-display tracking-[-0.01em] leading-[0.85] text-invictus-white select-none",
          SIZE_CLASSES[size],
        )}
        aria-label="INVICTUS"
      >
        INVIC<span className="text-invictus-red">T</span>US
      </span>
      {showSubtitle && (
        <span
          className={cn(
            "mt-1 font-mono uppercase tracking-[0.32em] text-invictus-gray-300",
            SUBTITLE_CLASSES[size],
          )}
        >
          Mixed <span className="text-invictus-red">Martial</span> Arts
        </span>
      )}
    </span>
  );
}
