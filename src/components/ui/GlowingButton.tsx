import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loadingLabel: string;
  isLoading?: boolean;
  variant?: "primary" | "ghost";
}

export default function GlowingButton({
  children,
  className,
  disabled,
  isLoading = false,
  loadingLabel,
  type,
  variant = "primary",
  ...props
}: GlowingButtonProps) {
  const variantClassName =
    variant === "ghost"
      ? "border border-white/15 bg-white/[0.06] text-white/90 hover:bg-white/[0.12]"
      : "bg-brand-gradient text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_45px_rgba(6,182,212,0.3)]";

  return (
    <motion.button
      type={type ?? "button"}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold transition duration-300",
        "backdrop-blur-xl",
        variantClassName,
        isLoading || disabled ? "cursor-not-allowed opacity-70" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span>{isLoading ? loadingLabel : children}</span>
    </motion.button>
  );
}
