"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white" style={{ backgroundColor: "var(--color-primary)" }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Travel Like a Local</h1>
            <p className="text-xl text-cyan-100 mb-8 max-w-lg">
              Skip the tourist traps. Book verified local guides directly and experience authentic destinations tailored
              to your interests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/packages"
                className="px-8 py-3 text-white rounded-lg font-semibold transition text-center"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Find a Guide
              </Link>
              <Link
                href="/become-guide"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white transition text-center hover:text-gray-500"
              >
                Become a Guide
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-cyan-100">Verified Guides</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100K+</p>
                <p className="text-cyan-100">Trips Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-cyan-100">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
            <img src="/mountain-landscape-adventure.jpg" alt="Travel adventure" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
