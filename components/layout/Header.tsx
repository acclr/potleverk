"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { cn } from "../utils";
import { useAuth } from "@/hooks/useAuth";
import {
  UserIcon,
  LogInIcon,
  LogOutIcon,
  MenuSquareIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/features/firebase/client";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
  DrawerClose,
} from "../ui/drawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const update = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Set initial state on mount in case page is already scrolled
    update();

    // Throttle with rAF: fires immediately on scroll and at most once per frame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 w-full top-0 px-4 py-4 md:px-6 lg:px-8 transition-all duration-100",
        isScrolled && "py-3 bg-white"
      )}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/potleverk-logo-dark.svg"
            alt="Potleverk Logo"
            width={180}
            height={128}
            className={cn(
              "h-24 lg:h-16 w-auto transition-all duration-300",
              isScrolled && "h-16 lg:h-12"
            )}
          />
        </Link>
        <Drawer
          preventScrollRestoration={false}
          noBodyStyles={true}
          direction="right"
        >
          <DrawerTrigger asChild>
            <div className="flex items-center justify-center bg-secondary-900 rounded-full p-1">
              <MenuIcon className="w-8 h-8" color="white" strokeWidth={1.25} />
            </div>
          </DrawerTrigger>
          <DrawerContent className="mt-[unset] left-[unset] right-0 !top-0 w-[95vw] rounded-bl-xl rounded-tr-none">
            <header
              className={cn(
                "fixed flex flex-row justify-between items-center inset-x-0 z-50 w-full top-0 px-4 py-4 md:px-6 lg:px-8 transition-all duration-100"
              )}
            >
              <Image
                src="/potleverk-logo-dark.svg"
                alt="Potleverk Logo"
                width={180}
                height={128}
                className={cn(
                  "h-24 lg:h-16 w-auto transition-all duration-300"
                )}
              />
              <DrawerClose className="flex items-center justify-center bg-gray-100 rounded-full p-1">
                <XIcon className="w-8 h-8" color="black" strokeWidth={1.25} />
              </DrawerClose>
            </header>

            <div className="w-full flex-col flex">
              <div className="h-[80px] w-[6px] bg-gray-200 absolute left-2.5 top-1/2 -translate-y-1/2 rounded-full bg-muted" />
            </div>

            <nav className="flex flex-col w-full space-y-1 p-4 mt-28 ml-[18px]">
              {["Produkter og tjenester", "Kontakt", "Bestill her"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item.toLowerCase()}
                    className="text-black w-max border-b-2 border-transparent -mt-0.5 hover:border-secondary-800 hover:text-secondary-800 font-semibold text-2xl"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>
          </DrawerContent>
        </Drawer>
        <div className="lg:hidden flex items-center gap-8">
          {[
            {
              label: "Produkter og tjenester",
              href: "/our-products",
            },
            {
              label: "Kontakt",
              href: "/contact",
            },
            {
              label: "Bestill her",
              href: "/order",
            },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-secondary-950 border-b-2 border-transparent -mt-0.5 hover:border-secondary-800 hover:text-secondary-800  text-[16px] font-semibold"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-2">
            <Link href={user?.uid ? "/dashboard" : "/account"}>
              <Button variant="default" size="sm">
                {user?.uid ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <LogInIcon className="w-4 h-4" />
                )}
                <span>{user?.uid ? "Min konto" : "Logg inn"}</span>
              </Button>
            </Link>

            {user?.uid && (
              <Button variant="ghost" size="sm" onClick={() => signOut(auth)}>
                <LogOutIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

