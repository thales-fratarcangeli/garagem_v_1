import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Aspect = "16/9" | "4/3" | "1/1" | "3/2" | "21/9";

const aspectClass: Record<Aspect, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "21/9": "aspect-[21/9]",
};

type MediaPlaceholderProps = {
  label?: string;
  aspect?: Aspect;
  className?: string;
  iconClassName?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
};

const roundedClass: Record<NonNullable<MediaPlaceholderProps["rounded"]>, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function MediaPlaceholder({
  label = "Imagem",
  aspect = "16/9",
  className,
  iconClassName,
  rounded = "lg",
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para ${label}`}
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden border-2 border-dashed border-slate-300 bg-slate-100 text-slate-500",
        aspectClass[aspect],
        roundedClass[rounded],
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className={cn("h-8 w-8 text-slate-400", iconClassName)} />
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>
    </div>
  );
}
