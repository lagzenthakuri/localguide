"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react"

export default function SurveyPage() {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | string[]>>({})
  const [isComplete, setIsComplete] = useState(false)

  const questions = [
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
      options: ["$500-$1,000", "$1,000-$2,000", "$2,000-$5,000", "$5,000+"],
    },
    {
      id: "days",
      title: "How many days do you plan to travel?",
      subtitle: "This helps us plan the perfect itinerary",
      type: "single",
      options: ["1-3 days", "4-7 days", "7-14 days", "15+ days"],
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
      setIsComplete(true)
      // Store responses in memory instead of localStorage
      console.log("Survey responses:", responses)
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

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Perfect! We've Got Your Preferences
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              We're now ready to match you with the ideal guide and create your personalized travel experience.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition shadow-lg"
            >
              Explore Guides
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-cyan-600" />
            <h1 className="text-2xl font-bold text-slate-900">Find Your Perfect Guide</h1>
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {questions[step].title}
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              {questions[step].subtitle}
            </p>

            <div className="grid gap-3 mb-8">
              {questions[step].options.map((option, idx) => {
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
                    style={{
                      animationDelay: `${idx * 50}ms`,
                      animation: 'fadeIn 0.3s ease-out forwards',
                      opacity: 0,
                    }}
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}