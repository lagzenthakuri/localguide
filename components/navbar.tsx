"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Bell } from "lucide-react"

export default function GuideNavigation() {
  const { data: session, status } = useSession()
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mock notification count - replace with actual data
  const notificationCount = 3

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/guide-dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold bg-cyan-600">
              LG
            </div>
            <span className="font-bold text-lg hidden sm:inline text-slate-900">LocalGuide</span>
            <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full font-semibold">GUIDE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/guide-dashboard" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Dashboard
            </Link>
            <Link href="/guide-collab" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Collaboration
            </Link>
            <Link href="/guide-earnings" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              Earnings
            </Link>
            <Link href="/guide-profile" className="text-slate-900 hover:text-cyan-600 transition font-medium">
              My Profile
            </Link>
          </div>

          {/* Right Side - Auth Status */}
          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <div className="w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
            ) : session ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-600 hover:text-cyan-600 transition"
                  >
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {notificationCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-slate-200 rounded-lg shadow-lg">
                      <div className="p-4 border-b border-slate-200">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📦</span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-900">New Custom Package Request</p>
                              <p className="text-xs text-slate-600 mt-1">
                                Sarah Johnson wants a 5-day Everest Base Camp trek
                              </p>
                              <p className="text-xs text-cyan-600 mt-1">2 mins ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">💬</span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-900">New Message</p>
                              <p className="text-xs text-slate-600 mt-1">Michael Chen sent you a message about the tour</p>
                              <p className="text-xs text-cyan-600 mt-1">1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 hover:bg-slate-50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">⭐</span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-900">New Review</p>
                              <p className="text-xs text-slate-600 mt-1">Emma Wilson left you a 5-star review</p>
                              <p className="text-xs text-cyan-600 mt-1">3 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-200 text-center">
                        <Link
                          href="/guide-dashboard"
                          className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                          onClick={() => setShowNotifications(false)}
                        >
                          View All Notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
                  <img
                    src={session.user?.image || "/placeholder.svg"}
                    alt={session.user?.name || "Guide"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-900">{session.user?.name || "Guide"}</p>
                    <p className="text-xs text-slate-600">Guide Account</p>
                  </div>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/authentication" })}
                  className="hidden md:block px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="authentication"
                  className="text-slate-900 hover:text-cyan-600 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/authentication"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              {session && (
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <img
                    src={session.user?.image || "/placeholder.svg"}
                    alt={session.user?.name || "Guide"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{session.user?.name || "Guide"}</p>
                    <p className="text-xs text-slate-600">Guide Account</p>
                  </div>
                </div>
              )}
              
              <Link
                href="/guide-dashboard"
                className="text-slate-900 hover:text-cyan-600 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/guide-collaboration"
                className="text-slate-900 hover:text-cyan-600 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collaboration
              </Link>
              <Link
                href="/guide-earnings"
                className="text-slate-900 hover:text-cyan-600 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Earnings
              </Link>
              <Link
                href="/guide-profile"
                className="text-slate-900 hover:text-cyan-600 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Profile
              </Link>

              {session && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut({ callbackUrl: "/authentication" })
                  }}
                  className="text-left text-red-600 hover:text-red-700 transition font-medium py-2 border-t border-slate-200 mt-2 pt-4"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}