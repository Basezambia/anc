import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      {eyebrow ? (
        <span className="uppercase tracking-[0.35em] text-xs font-semibold text-sky-300/90">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold text-white drop-shadow-md">
        {title}
      </h2>
      {description ? (
        <div className="text-pretty text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-3xl">
          {description}
        </div>
      ) : null}
    </div>
  );
}
