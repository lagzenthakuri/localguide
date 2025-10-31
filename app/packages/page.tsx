"use client"

import { useState, useMemo, useEffect } from "react"
import { ChevronLeft, ChevronRight, Check, Sparkles, X } from "lucide-react"
import Link from "next/link"
interface Question {
  id: string
  title: string
  subtitle: string
  type: "single" | "multiple"
  options: string[]
}

interface SurveyResponses {
  [key: string]: string | string[]
}

interface Guide {
  id: number
  name: string
  image: string
}

interface Package {
  id: number
  name: string
  price: number
  duration: string
  destination: string
  rating: number
  reviews: number
  guide: Guide
  image: string
  type: string
  budgetRange: string
  daysRange: string
  recommendationScore?: number
  isRecommended?: boolean
}

interface SurveyPopupProps {
  onComplete: (responses: SurveyResponses) => void
  onSkip: () => void
}

interface PackageCardProps {
  pkg: Package
  isRecommended: boolean
}

// Survey Component
function SurveyPopup({ onComplete, onSkip }: SurveyPopupProps) {
  const [step, setStep] = useState<number>(0)
  const [responses, setResponses] = useState<SurveyResponses>({})

  const questions: Question[] = [
    {
      id: "experience",
      title: "What kind of experience are you looking for?",
      subtitle: "Select all that interest you",
      type: "multiple",
      options: ["Adventure & Trekking", "Cultural Experience", "Relaxation", "Wildlife", "Food Tour", "Mix of all"],
    },
    {
      id: "budget",
      title: "What's your estimated budget range?",
      subtitle: "Choose the range that fits your plan",
      type: "single",
      options: ["$0-$50", "$50-$100", "$100-$150", "$150+"],
    },
    {
      id: "days",
      title: "How many days do you plan to travel?",
      subtitle: "This helps us plan the perfect itinerary",
      type: "single",
      options: ["1 day", "2-3 days", "4-7 days", "7+ days"],
    },
    {
      id: "guideType",
      title: "What type of guide do you prefer?",
      subtitle: "We'll match you with the perfect personality",
      type: "single",
      options: ["Friendly Storyteller", "Professional Expert", "Chill Local", "Doesn't matter"],
    },
  ]

  const handleSelect = (optionId: string) => {
    const question = questions[step]
    if (question.type === "single") {
      setResponses({ ...responses, [question.id]: optionId })
    } else {
      const current = (responses[question.id] as string[]) || []
      if (current.includes(optionId)) {
        setResponses({
          ...responses,
          [question.id]: current.filter((id) => id !== optionId),
        })
      } else {
        setResponses({
          ...responses,
          [question.id]: [...current, optionId],
        })
      }
    }
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      onComplete(responses)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const isAnswered = responses[questions[step].id] && 
    (Array.isArray(responses[questions[step].id]) 
      ? (responses[questions[step].id] as string[]).length > 0 
      : true)

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 rounded-t-3xl z-10">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-cyan-600" />
                <h2 className="text-2xl font-bold text-slate-900">Find Your Perfect Package</h2>
              </div>
              <button
                onClick={onSkip}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
                Question {step + 1} of {questions.length}
              </span>
              <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((step + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-3xl font-bold text-slate-900 mb-3">
            {questions[step].title}
          </h3>
          <p className="text-lg text-slate-600 mb-8">
            {questions[step].subtitle}
          </p>

          <div className="grid gap-3 mb-8">
            {questions[step].options.map((option) => {
              const isSelected = Array.isArray(responses[questions[step].id])
                ? (responses[questions[step].id] as string[]).includes(option)
                : responses[questions[step].id] === option

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`group relative p-5 text-left rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md scale-[1.02]"
                      : "border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-medium ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                      {option}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'border-cyan-500 bg-cyan-500' 
                        : 'border-slate-300 group-hover:border-cyan-400'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-4 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}
            <button
              onClick={onSkip}
              className="px-6 py-4 text-slate-600 hover:text-slate-900 transition font-semibold"
            >
              Skip Survey
            </button>
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                isAnswered
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {step === questions.length - 1 ? 'Complete Survey' : 'Continue'}
              {isAnswered && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Package Card Component
function PackageCard({ pkg, isRecommended }: PackageCardProps) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border-2 hover:shadow-xl transition-all duration-300 ${
      isRecommended ? 'border-cyan-500 ring-2 ring-cyan-200' : 'border-slate-200'
    }`}>
      {isRecommended && (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Recommended for you
        </div>
      )}
      <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">{pkg.name}</h3>
            <p className="text-slate-600 text-sm">{pkg.destination}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">${pkg.price}</div>
            <div className="text-slate-600 text-sm">per person</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <span>⏱️ {pkg.duration}</span>
          <span>⭐ {pkg.rating} ({pkg.reviews})</span>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
          <img src={pkg.guide.image} alt={pkg.guide.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="text-sm font-medium text-slate-900">{pkg.guide.name}</div>
            <div className="text-xs text-slate-600">Your Guide</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Packages Page
export default function PackagesPage() {
  const [showSurvey, setShowSurvey] = useState<boolean>(false)
  const [surveyCompleted, setSurveyCompleted] = useState<boolean>(false)
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponses | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"featured" | "recommended" | "price-low" | "price-high" | "rating">("featured")

  const MOCK_PACKAGES: Package[] = [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      price: 85,
      duration: "14 days",
      destination: "Sagarmatha",
      rating: 4.8,
      reviews: 324,
      guide: { id: 1, name: "Raj Singh", image: "/api/placeholder/100/100" },
      image: "/api/placeholder/400/300",
      type: "Adventure & Trekking",
      budgetRange: "$50-$100",
      daysRange: "7+ days",
    },
    {
      id: 2,
      name: "Kathmandu Heritage Tour",
      price: 65,
      duration: "6 hours",
      destination: "Kathmandu",
      rating: 4.7,
      reviews: 156,
      guide: { id: 2, name: "Priya Sharma", image: "/api/placeholder/100/100" },
      image: "/api/placeholder/400/300",
      type: "Cultural Experience",
      budgetRange: "$50-$100",
      daysRange: "1 day",
    },
    {
      id: 3,
      name: "Pokhara Lake Cruise",
      price: 120,
      duration: "8 hours",
      destination: "Pokhara",
      rating: 4.9,
      reviews: 289,
      guide: { id: 3, name: "Ramesh Chand", image: "/api/placeholder/100/100" },
      image: "/api/placeholder/400/300",
      type: "Relaxation",
      budgetRange: "$100-$150",
      daysRange: "1 day",
    },
    {
      id: 4,
      name: "Chitwan Safari Adventure",
      price: 75,
      duration: "2 days",
      destination: "Chitwan",
      rating: 4.6,
      reviews: 198,
      guide: { id: 4, name: "Anita Nepal", image: "/api/placeholder/100/100" },
      image: "/api/placeholder/400/300",
      type: "Wildlife",
      budgetRange: "$50-$100",
      daysRange: "2-3 days",
    },
    {
      id: 5,
      name: "Nagarkot Sunrise Trek",
      price: 45,
      duration: "1 day",
      destination: "Nagarkot",
      rating: 4.7,
      reviews: 412,
      guide: { id: 5, name: "Vikas Sharma", image: "/api/placeholder/100/100" },
      image: "/api/placeholder/400/300",
      type: "Adventure & Trekking",
      budgetRange: "$0-$50",
      daysRange: "1 day",
    },
    {
      id: 6,
      name: "Rara Lake Mountain Experience",
      price: 150,
      duration: "3 days",
      destination: "Rara Lake",
      rating: 4.9,
      reviews: 87,
      guide: { id: 6, name: "Dev Patel", image: "/api/placeholder/100/100" },
      image: "/api/placeholder/400/300",
      type: "Adventure & Trekking",
      budgetRange: "$150+",
      daysRange: "2-3 days",
    },
  ]

  const DESTINATIONS: string[] = ["Sagarmatha", "Kathmandu", "Pokhara", "Chitwan", "Nagarkot", "Rara Lake"]
  const PRICE_RANGES = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
  ]

  useEffect(() => {
    const hasSeenSurvey = sessionStorage.getItem('hasSeenSurvey')
    if (!hasSeenSurvey) {
      setShowSurvey(true)
    }
  }, [])

  const handleSurveyComplete = (responses: SurveyResponses) => {
    setSurveyResponses(responses)
    setSurveyCompleted(true)
    setShowSurvey(false)
    sessionStorage.setItem('hasSeenSurvey', 'true')
  }

  const handleSurveySkip = () => {
    setShowSurvey(false)
    sessionStorage.setItem('hasSeenSurvey', 'true')
  }

  const getRecommendationScore = (pkg: Package): number => {
    if (!surveyResponses) return 0
    
    let score = 0
    
    if (surveyResponses.experience) {
      const experiences = Array.isArray(surveyResponses.experience) 
        ? surveyResponses.experience 
        : [surveyResponses.experience]
      
      if (experiences.includes("Mix of all") || experiences.includes(pkg.type)) {
        score += 3
      }
    }
    
    if (surveyResponses.budget && surveyResponses.budget === pkg.budgetRange) {
      score += 2
    }
    
    if (surveyResponses.days && surveyResponses.days === pkg.daysRange) {
      score += 2
    }
    
    return score
  }

  const filteredAndSortedPackages = useMemo(() => {
    let result: Package[] = MOCK_PACKAGES.filter((pkg) => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDestination = selectedDestinations.length === 0 || selectedDestinations.includes(pkg.destination)

      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number)
          return pkg.price >= min && pkg.price <= max
        })

      return matchesSearch && matchesDestination && matchesPrice
    })

    result = result.map(pkg => ({
      ...pkg,
      recommendationScore: getRecommendationScore(pkg),
      isRecommended: surveyCompleted && getRecommendationScore(pkg) >= 4
    }))

    if (sortBy === "recommended" && surveyCompleted) {
      result.sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0))
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [searchTerm, selectedDestinations, selectedPriceRanges, sortBy, surveyResponses, surveyCompleted, MOCK_PACKAGES])

  const handleDestinationChange = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination) ? prev.filter((d) => d !== destination) : [...prev, destination]
    )
  }

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) => 
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {showSurvey && <SurveyPopup onComplete={handleSurveyComplete} onSkip={handleSurveySkip} />}

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Explore Packages</h1>
              <p className="text-slate-600 text-lg">Discover authentic experiences with verified local guides</p>
            </div>
            {surveyCompleted && (
              <button
                onClick={() => setShowSurvey(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-cyan-500 text-cyan-600 rounded-lg hover:bg-cyan-50 transition font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                Retake Survey
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-white p-5 rounded-2xl border-2 border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Destination</h3>
                <div className="space-y-2">
                  {DESTINATIONS.map((destination) => (
                    <div key={destination} className="flex items-center">
                      <input
                        type="checkbox"
                        id={destination}
                        checked={selectedDestinations.includes(destination)}
                        onChange={() => handleDestinationChange(destination)}
                        className="w-4 h-4 text-cyan-600 rounded"
                      />
                      <label htmlFor={destination} className="ml-2 text-sm text-slate-900 cursor-pointer">
                        {destination}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h3 className="font-bold text-slate-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => {
                    const rangeKey = `${range.min}-${range.max}`
                    return (
                      <div key={rangeKey} className="flex items-center">
                        <input
                          type="checkbox"
                          id={rangeKey}
                          checked={selectedPriceRanges.includes(rangeKey)}
                          onChange={() => handlePriceRangeChange(rangeKey)}
                          className="w-4 h-4 text-cyan-600 rounded"
                        />
                        <label htmlFor={rangeKey} className="ml-2 text-sm text-slate-900 cursor-pointer">
                          {range.label}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedDestinations([])
                  setSelectedPriceRanges([])
                  setSortBy("featured")
                }}
                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition font-semibold"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-3 text-slate-600">🔍</span>
                <input
                  type="text"
                  placeholder="Search packages or destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 h-11 rounded-lg border-2 border-slate-200 px-4"
                />
              </div>

              <div className="flex items-center gap-2 border-2 border-slate-200 rounded-lg px-3 bg-white">
                <span className="text-sm text-slate-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-transparent text-slate-900 font-medium outline-none cursor-pointer py-2"
                >
                  <option value="featured">Featured</option>
                  {surveyCompleted && <option value="recommended">Recommended</option>}
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Custom Package Banner */}
            <div className="mb-8 p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">🎯 Custom Package</h3>
                  <p className="text-slate-700">
                    Can't find the perfect package? Create a custom one and ask guides to bid for your offer!
                  </p>
                </div>
                <Link href="/packages/custom-package" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition">
                  Create Custom Package
                </Link>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-slate-600 mb-6">
              Showing <span className="font-semibold text-slate-900">{filteredAndSortedPackages.length}</span> of{" "}
              <span className="font-semibold text-slate-900">{MOCK_PACKAGES.length}</span> packages
              {surveyCompleted && filteredAndSortedPackages.filter(p => p.isRecommended).length > 0 && (
                <span className="ml-2 text-cyan-600 font-semibold">
                  ({filteredAndSortedPackages.filter(p => p.isRecommended).length} recommended for you)
                </span>
              )}
            </p>

            {/* Package Grid */}
            {filteredAndSortedPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} isRecommended={pkg.isRecommended || false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-slate-200">
                <p className="text-slate-600 text-lg mb-2">No packages found</p>
                <p className="text-slate-500 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}