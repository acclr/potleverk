import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="px-4 py-4 md:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Desktop%20-%20Homepage%20(no%20auto%20layout).jpg-UfcNKCJ8ain3mcVsqpIZwg5wPfQoyS.jpeg"
            alt="Potleverk Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
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
          <Button className="bg-secondary hover:bg-secondary/90 text-white">Logg Inn</Button>
        </div>
      </nav>
    </header>
  )
}

