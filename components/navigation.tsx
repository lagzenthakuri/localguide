"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/mmg_logo.jpg" className="h-15"/>
            <img src="/mmg.jpg" className="h-10"/>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Home
            </Link>
            <Link href="/destinations" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Destinations
            </Link>
            <Link href="/guides" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Guides
            </Link>
            <Link href="/packages" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Packages
            </Link>
            <Link href="/packages/custom-package" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Custom Package
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/authentication" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Login
            </Link>
            <Link
              href="/authentication"
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition font-medium"
              style={{ backgroundColor: "#0891b2" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
