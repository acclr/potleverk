"use client";

import { useEffect, useRef } from "react";
import { BackgroundGraphics } from "@/components/bg";

type ParallaxBackgroundProps = {
  speed?: number;
  className?: string;
};

export default function ParallaxBackground({ speed = 0.3, className }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrameId = 0;

    const handleScroll = () => {
      const y = window.scrollY * speed;
      // use transform for GPU acceleration
      element.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const onScroll = () => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(() => {
        handleScroll();
        animationFrameId = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      <BackgroundGraphics />
    </div>
  );
}


