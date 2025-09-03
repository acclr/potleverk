"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { cn } from "../utils";

const debounce = (func: () => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<typeof func>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...(args as Parameters<typeof func>)), wait);
    return timeout;
  };
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    debounce(() => {
      setIsScrolled(window.scrollY > 0);
    }, 0);
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 0);
    }, 33);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 

  const size = isScrolled ? 0.75 : 1;
  console.log({isScrolled})
  return (
    <header className={cn("fixed w-full top-0 px-4 py-4 md:px-6 lg:px-8 z-10 transition-all duration-100", isScrolled && "py-3 bg-white")}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/potleverk-logo-dark.svg"
            alt="Potleverk Logo"
            width={180}
            height={128}
            className={cn("h-24 w-auto transition-all duration-300", isScrolled && "h-16")}
          />
        </Link>
        <div className="flex items-center gap-8">
          {[{
            label: "Produkter og tjenester",
            href: "/our-products"
          }, {
            label: "Kontakt",
            href: "/contact"
          }, {
            label: "Bestill her",
            href: "/order"
          }].map((item) => (
            <Link key={item.label} href={item.href} className="text-secondary-950 text-[15px] font-semibold">
              {item.label}
            </Link>
          ))}
          <Link href="/account">
            <Button variant="default" size="sm">
              Logg inn
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

