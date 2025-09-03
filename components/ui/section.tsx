"use client";

import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/components/utils";

const sectionVariants = cva(["flex relative w-full"], {
  variants: {
    direction: {
      row: ["flex-row"],
      column: ["flex-col"]
    },
    padding: {
      none: ["p-0"],
      sm: ["py-6 md:py-4"],
      md: ["py-12 lg:py-8 md:py-6"],
      lg: ["py-24 lg:py-16 md:py-8"]
    },
    background: {
      default: [""],
      transparent: ["bg-transparent"],
      black: ["bg-black text-white stroke-white"],
      white: ["bg-white text-black"],
      gray: ["bg-gray-100"],
      primary: ["bg-primary-600 text-white"],
      inverted: ["bg-white text-black"]
    }
  },
  defaultVariants: {
    direction: "column",
    padding: "md",
    background: "transparent"
  }
});

export type SectionProps = VariantProps<typeof sectionVariants> &
  React.HTMLAttributes<HTMLElement> & {
    className?: string;
    classNames?: { container?: string; inner?: string };
    tag?: string;
    boxed?: boolean;
  };

const Section: React.FC<SectionProps> = ({
  tag: Element = "section",
  padding = "lg",
  background = "default",
  direction,
  boxed = false,
  className,
  classNames,
  children,
  ...props
}) => {
  return (
    // @ts-expect-error TODO: Fix this
    <Element
      {...props}
      className={cn(sectionVariants({ padding, background, direction }), classNames?.container)}
      >
      {boxed ? (
        <div className={cn("container flex", direction === "row" ? "flex-row" : "flex-col", classNames?.inner)}>{children}</div>
      ) : (
        children
      )}
    </Element>
  );
};

export default Section;
export { Section };