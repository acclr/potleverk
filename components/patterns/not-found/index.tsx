"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/utils";

export interface NotFoundProps {
  align?: "left" | "center";
  title?: string;
  text?: string;
  buttonText?: string;
}

const alignmentMap = {
  left: "justify-start items-start text-left",
  center: "justify-center items-center text-center"
};

const defaults = {
  title: "404",
  text: "Det här är inte sidan du letar efter. Kanske har den flyttat eller tagits bort.",
  buttonText: "Till startsidan"
};

export default function NotFound({ align = "left", title, text, buttonText }: NotFoundProps) {
  return (
    <section className="w-full py-24">
      <div className={cn("container flex flex-col gap-4", alignmentMap[align])}>
        <h1 className="text-4xl">{title || defaults.title}</h1>
        <p className="text-lg">{text || defaults.text}</p>
        <Link href="/">
          <Button size="sm" variant="default" className="w-max">
            {buttonText || defaults.buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
}
