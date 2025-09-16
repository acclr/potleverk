import Link from "next/link";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { DrawerClose } from "../ui/drawer";

export default function SidebarHeader() {
  return (
    <header className={cn("w-full py-4 transition-all duration-100")}>
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/potleverk-logo-dark.svg"
            alt="Potleverk Logo"
            width={150}
            height={100}
            className={cn("h-16 -ml-2.5 w-auto transition-all duration-300")}
          />
        </Link>
        <DrawerClose asChild>
          <XIcon
            className="p-1 rounded-full bg-gray-100"
            color="black"
            size={36}
            strokeWidth={1.5}
          />
        </DrawerClose>
      </nav>
    </header>
  );
}