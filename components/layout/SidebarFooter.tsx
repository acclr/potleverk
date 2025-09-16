import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { HomeIcon, MessageCircleIcon, UserIcon, LogInIcon } from "lucide-react";
import { DrawerClose } from "../ui/drawer";

export default function SidebarFooter() {
  const { user } = useAuth();

  const navItems = [
    {
      href: "/",
      icon: HomeIcon,
      label: "Hjem",
    },
    {
      href: "/contact",
      icon: MessageCircleIcon,
      label: "Kontakt",
    },
    {
      href: user?.uid ? "/dashboard" : "/account",
      icon: user?.uid ? UserIcon : LogInIcon,
      label: user?.uid ? "Profil" : "Logg inn",
    },
  ];

  return (
    <div className="mt-auto border-t border-gray-200/30">
      <nav className="grid grid-cols-3 gap-px bg-gray-200/20">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <DrawerClose key={item.href} asChild>
              <Link
                href={item.href}
                className="flex flex-col items-center justify-center py-4 px-2 bg-transparent hover:bg-gray-100/50 transition-colors duration-200 text-gray-700 hover:text-gray-900"
              >
                <IconComponent className="w-6 h-6 mb-1" strokeWidth={1.5} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </DrawerClose>
          );
        })}
      </nav>
    </div>
  );
}