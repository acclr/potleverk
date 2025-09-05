import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/components/utils";

// Container: forces a square shape, applies padding and shape rounding.
const containerVariants = cva("relative w-8 h-8 group inline-flex items-center justify-center aspect-square overflow-hidden", {
  variants: {
    padding: {
      sm: "p-0.5",
      md: "p-1",
      lg: "p-1.5"
    },
    shape: {
      circle: "rounded-full",
      rounded: "rounded-md",
      square: "rounded-none"
    }
  },
  defaultVariants: {
    padding: "md",
    shape: "rounded"
  }
});

// Overlay: applies hover effects based on the bg variant.
// Only the hover state is defined here.
const overlayVariants = cva("absolute inset-0 transition-colors duration-200 pointer-events-none", {
  variants: {
    bg: {
      lighten: "lgup:group-hover:bg-white/10 lg:active:bg-white/10",
      darken: "lgup:group-hover:bg-black/10 lg:active:bg-black/10"
    },
    shape: {
      circle: "rounded-full",
      rounded: "rounded-md",
      square: "rounded-none"
    }
  },
  defaultVariants: {
    bg: "darken",
    shape: "rounded"
  }
});

// Map for initial background if the initialBg prop is true.
const initialBgMap: Record<"lighten" | "darken", string> = {
  lighten: "rgba(255,255,255,0.06)",
  darken: "rgba(0,0,0,0.04)"
};

export interface HoverableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants>,
    VariantProps<typeof overlayVariants> {
  children: React.ReactNode;
  /**
   * If true, the overlay gets an initial background color (based on `bg`)
   * before hover.
   */
  initial?: boolean;
}

/**
 * A stateless server component that renders a square element.
 * The element supports circle, rounded, or square shapes, configurable padding,
 * and hover effects (darken or lighten). Use the `initialBg` prop to have an
 * initial background before hover.
 */
const Hoverable: React.FC<HoverableProps> = ({ children, className, padding, shape, bg, initial, ...rest }) => {
  return (
    <div className={containerVariants({ padding, shape })} {...rest}>
      <div className={cn(initial ? (bg === "darken" ? "bg-black/5" : "bg-white/5") : null, overlayVariants({ bg, shape }))} />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

export default Hoverable;
