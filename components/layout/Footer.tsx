import Link from "next/link";
import { FacebookIcon } from "../icons/facebook";
import { LinkedinIcon } from "../icons/linkedin";
import { InstagramIcon } from "../icons/insta";
import { MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "../utils";

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-8 items-start lgup:grid lgup:grid-cols-[1fr,auto,1fr] w-full">
          <div className="flex flex-col gap-2">
            <Image
              src="/potleverk-logo-dark.svg"
              alt="Potleverk Logo"
              width={180}
              height={100}
              className={cn(
                "lgup:hidden -ml-2.5 mb-4 w-auto transition-all duration-300"
              )}
            />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <p className="text-sm/6 text-gray-600 dark:text-gray-400">
                  855 49 350
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon />
                <p className="text-sm/6 text-gray-600 dark:text-gray-400">
                  bestilling@potleverk.no
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <FacebookIcon size={50} />
            <InstagramIcon size={50} />
            <LinkedinIcon size={50} />
          </div>
          <p className="justify-end lg:justify-start w-full flex items-center text-sm/6 text-gray-600 dark:text-gray-400">
            &copy; 2025 Potleverk AS. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}
