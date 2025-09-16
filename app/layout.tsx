import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react" // Added import for React
import Providers from "@/components/app-providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Potleverk",
  description: "CNC, design og trykkeri-tjenester",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

