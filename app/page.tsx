"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import TopDestinations from "@/components/top-destinations"
import Features from "@/components/features"
import Footer from "@/components/footer"

export default function Home() {

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <TopDestinations />
      <Features />
      <Footer />
    </main>
  )
}
