import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">855 49 350</span>
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
  );
}

