import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Remboursement Assurance Maladie - l'Assurance Maladie",
  description:
    "Demandez votre remboursement de l'Assurance Maladie rapidement et en toute sécurité. Service officiel l'Assurance Maladie pour les remboursements médicaux.",
  keywords: ["remboursement", "assurance maladie", "l'assurance maladie", "sécurité sociale", "remboursement médical", "soin de santé"],
  authors: [{ name: "l'Assurance Maladie" }],
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Remboursement Assurance Maladie - l'Assurance Maladie",
    description: "Demandez votre remboursement de l'Assurance Maladie rapidement et en toute sécurité.",
    type: "website",
    locale: "fr_FR",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
