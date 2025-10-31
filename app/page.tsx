"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import SurveyPopup from "@/components/survey-popup"
import TopDestinations from "@/components/top-destinations"
import Features from "@/components/features"
import Footer from "@/components/footer"

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(true)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      {showSurvey && <SurveyPopup onClose={() => setShowSurvey(false)} />}
      <Hero />
      <TopDestinations />
      <Features />
      <Footer />
    </main>
  )
}
