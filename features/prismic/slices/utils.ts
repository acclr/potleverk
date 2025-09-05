// @ts-nocheck
import { cn } from "@/components/utils";

export type SliceBackground = "White" | "Light Gray" | "Light Blue" | "Dark" | "Foreground" | "Background" | "Muted";
export type SliceTopSpacing = "None" | "Small" | "Large";
export type SliceBottomSpacing = "None" | "Small" | "Large";

const bgClassName = {
  "White": "bg-[#fff]",
  "Light Gray": "bg-gray-50",
  "Light Blue": "bg-blue-100",
  "Dark": "ui-dark bg-gray-950 text-white",
  "Foreground": "bg-background-50 text-foreground-950",
  "Background": "bg-background-1000 text-foreground-50",
  "Muted": "bg-gray-50"
};

export const getBgFromSlice = (background?: SliceBackground | null) => {
  if (!background) return "";

  return bgClassName[background] ?? "bg-transparent";
};

export const getSpaceFromSlice = (spacing: "None" | "Small" | "Medium" | "Large", direction: "top" | "bottom") => {
  if (direction === "top") {
    switch (spacing) {
      case "None":
        return "pt-0";
      case "Small":
        return "pt-12";
      case "Medium":
        return "pt-16";
      case "Large":
        return "pt-24";
      default:
        return "pt-24";
    }
  } else {
    switch (spacing) {
      case "None":
        return "pb-0";
      case "Small":
        return "pb-12";
      case "Medium":
        return "pb-16";
      case "Large":
        return "pb-24";
      default:
        return "pb-24";
    }
  }
};

export const createStylesForSlice = (slice: {
  primary: {
    background: SliceBackground;
    spacing_top: SliceTopSpacing;
    spacing_bottom: SliceBottomSpacing;
  };
}) => {
  const bg = getBgFromSlice(slice.primary.background);
  const topSpacing = getSpaceFromSlice(slice.primary.spacing_top, "top");
  const bottomSpacing = getSpaceFromSlice(slice.primary.spacing_bottom, "bottom");
  const className = cn(bg, topSpacing, bottomSpacing);

  return className;
};
