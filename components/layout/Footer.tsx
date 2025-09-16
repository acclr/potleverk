import Link from "next/link";
import { FacebookIcon } from "../icons/facebook";
import { LinkedinIcon } from "../icons/linkedin";
import { InstagramIcon } from "../icons/insta";
import { MailIcon, PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="lg:flex lg:flex-col lg:space-y-6 grid grid-cols-[1fr,auto,1fr] w-full">
          <div className="lgup:hidden">
            <Image
              src="/potleverk-logo-dark.svg"
              alt="Potleverk Logo"
              width={180}
              height={128}
              className={cn(
                "-ml-2.5 lg:h-16 h-24 w-auto transition-all duration-300"
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
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
          <p className="justify-end lg:justify-start w-full flex items-center lg:text-left text-sm/6 text-gray-600 dark:text-gray-400">
            &copy; 2025 Potleverk AS. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * <footer className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Telefon: 855 49 350</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="mailto:bestilling@potleverk.no"
              className="text-gray-600 hover:text-primary"
            >
              bestilling@potleverk.no
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Hoveveien 38</span>
            <span className="text-gray-600">4306 Sandnes</span>
          </div>
          <div className="flex gap-4 pt-4">
            <Link href="#" className="text-gray-600 hover:text-primary">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
 */
