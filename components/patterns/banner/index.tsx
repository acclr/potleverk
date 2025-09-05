"use client";

import { cn } from "@/components/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import React from "react";

import { UIButtonProps, renderButtons } from "@/features/prismic/utils/render-buttons";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const bannerVariants = cva(["relative w-full"], {
  variants: {
    overlay: {
      gradient: "bg-gradient-to-r z-0 from-black to-transparent",
      none: ""
    }
  },
  defaultVariants: {}
});

export type BannerProps = VariantProps<typeof bannerVariants> &
  React.HTMLAttributes<HTMLElement> & {
    buttons?: UIButtonProps;
    imageUrl?: string;
    eyebrowText?: string;
    backgroundOverlay?: boolean;
    altTitle?: string;
    title?: string | React.ReactNode;
    richText?: string | React.ReactNode;
    boxed?: boolean;
    centered?: boolean;
  };

const Banner: React.FC<BannerProps> = ({ boxed = false, backgroundOverlay = false, className, ...props }) => {

  const Content = (
    <>
      {props.imageUrl && (
        <Image
          alt={props.altTitle || ""}
          src={props.imageUrl}
          className="absolute left-0 top-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
      )}
      <div className="container absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-white">
        <div
          className={cn(
            "flex max-w-[60ch] flex-col",
            props.centered ? "items-center justify-center text-center" : "mr-auto items-start justify-start text-left"
          )}>
          {props.eyebrowText && <span className="ui-eyebrow">{props?.eyebrowText}</span>}
          {props.title && (
            <h1 className={cn("mb-4 text-5xl leading-[1] [text-shadow:_0_1px_13px_rgb(0_0_0_/_20%)]")}>{props.title}</h1>
          )}
          {props.richText ||
            (props.buttons && (
              <div className={cn("flex flex-col items-center justify-center text-lg text-white/80")}>
                {props.richText}
                {props?.buttons && props?.buttons?.length > 0 && renderButtons(props?.buttons)}
              </div>
            ))}

          {props.children}
        </div>
      </div>
    </>
  );

  const BackgroundOverlay = backgroundOverlay ? (
    <div className="absolute left-0 top-0 h-full w-full bg-primary-700 opacity-70" />
  ) : null;

  const aspectProps = {
    className: "w-full flex",
    ...props
  };

  return (
    <div className={className}>
      <div className="flex flex-col lg:hidden">
        <AspectRatio ratio={21 / 9} {...aspectProps}>
          {Content}
          {BackgroundOverlay}
        </AspectRatio>
      </div>

      <div className="flex w-full flex-col lgup:hidden">
        <AspectRatio ratio={3 / 4} {...aspectProps}>
          {Content}
          {BackgroundOverlay}
        </AspectRatio>
      </div>
    </div>
  );
};

export default Banner;
