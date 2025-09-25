import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Homu — The humanoid robot for your home.",
  description:
    "Homu is a safe, helpful humanoid robot designed for everyday home assistance: chores, companionship, and smart-home integration.",
  generator: "v0.app",
  alternates: {
    canonical: "https://homu.example/",
  },
  openGraph: {
    siteName: "Homu",
    title: "The humanoid robot for your home | Homu",
    description:
      "Safe, capable home assistance with natural interaction, household task automation, and seamless device control.",
    type: "website",
    url: "https://homu.example/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-homu.jpg",
        alt: "Homu humanoid home robot standing in a living room",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The humanoid robot for your home | Homu",
    description:
      "Safe, capable home assistance with natural interaction, household task automation, and seamless device control.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-homu.jpg",
        alt: "Homu humanoid home robot standing in a living room",
      },
    ],
    site: "@homu",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">{children}</body>
    </html>
  )
}
