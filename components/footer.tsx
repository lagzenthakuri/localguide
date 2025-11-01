"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/mmg_logo.png" className="h-15"/>
              <img src="/mmg.jpg" className="h-10"/>
            </div>
            <p className="text-blue-100">Connect with verified local guides for authentic travel experiences, Get freedom while traveling</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Tourists</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/search" className="hover:text-white transition">
                  Find Guides
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition">
                  View Packages
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Guides</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/become-guide" className="hover:text-white transition">
                  Become a Guide
                </Link>
              </li>
              <li>
                <Link href="/guide-dashboard" className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/guide-tips" className="hover:text-white transition">
                  Tips & Tools
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900 pt-8 text-center text-blue-100">
          <p>&copy; 2025 MEETMYGUIDE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
