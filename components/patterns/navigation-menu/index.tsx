"use client";

import { cn } from "@/components/utils";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

export type NavMenuContent = {
  title: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export type NavMenuItem = {
  label: string;
  href?: string;
  items?: NavMenuContent[];
};

export default function NavMenu({ items, className }: { items: NavMenuItem[]; className?: string }) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {items?.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.items ? (
              <>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex w-[360px] min-w-[360px] flex-col -space-y-2 bg-white text-black md:w-[600px]">
                    {item.items.map((subItem) => (
                      <Link key={subItem.label} href={subItem.href} legacyBehavior passHref>
                        <ListItem title={subItem.title} icon={subItem.icon}>
                          {subItem.label}
                        </ListItem>
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuItem key={item.label}>
                <Link href={item.href ?? ""} passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.label}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode }>(
  ({ className, title, icon, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none p-5 font-light leading-none no-underline outline-none transition-colors hover:bg-black/5 focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
            href={props?.href ?? "#"}>
            <div className="flex flex-row items-start">
              {icon}
              <div className="flex flex-col">
                <div className="mb-1 text-[16px] leading-none">{title}</div>
                <p className="line-clamp-2 text-[16px] leading-snug text-muted-foreground">{children}</p>
              </div>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
