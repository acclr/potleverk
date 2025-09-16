import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/components/utils";

const containedVariants = cva(["flex max-w-full flex-col mx-auto"], {
  defaultVariants: {
    width: "sm",
  },
  variants: {
    width: {
      sm: "w-[520px]",
      md: "w-[640px]",
      lg: "w-[768px]",
      xl: "w-[960px]",
      "2xl": "w-[1080px]",
      full: "w-full",
    },
  },
});

type ContainedProps = VariantProps<typeof containedVariants> & {
  children: React.ReactNode;
  className?: string;
};

export default function Contained({ children, width, className }: ContainedProps) {
  return <div className={cn(containedVariants({ width }), className)}>{children}</div>;
}

export { Contained };
