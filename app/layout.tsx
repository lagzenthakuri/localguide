import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Authprovider from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LocalGuide - Direct Booking with Verified Guides",
  description: "Connect with verified local guides for authentic travel experiences",
  icons:"./mmg_logo.png"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Authprovider>
    <html lang="en">
      <body className={`${inter.className} pt-16`}>{children}</body>
    </html>
    </Authprovider>
  )
}
