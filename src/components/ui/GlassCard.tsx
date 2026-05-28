import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: "purple" | "cyan" | "blue" | "none";
}

const glowClasses: Record<NonNullable<GlassCardProps["glow"]>, string> = {
  purple: "shadow-violet",
  cyan: "shadow-cyan",
  blue: "shadow-[0_0_40px_rgba(29,78,216,0.22)]",
  none: "",
};

export default function GlassCard({ children, className, glow = "none", ...props }: GlassCardProps) {
  return (
    <div
      className={[
        "glass-panel relative overflow-hidden rounded-[28px] bg-white/5",
        glowClasses[glow],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      {children}
    </div>
  );
}
