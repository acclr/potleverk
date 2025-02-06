import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="px-4 py-4 md:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/potleverk-logo-dark.svg"
            alt="Potleverk Logo"
            width={180}
            height={128}
            className="h-32 w-auto"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-gray-700 hover:text-primary hidden md:block">
            Produkter
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-primary hidden md:block">
            Tjenester
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary hidden md:block">
            Kontakt
          </Link>
          <Link href="/order" className="text-gray-700 hover:text-primary hidden md:block">
            Bestilling
          </Link>
        </div>
      </nav>
    </header>
  )
}

