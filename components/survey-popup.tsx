"use client"

import { useState } from "react"

interface SurveyPopupProps {
  onClose: () => void
}

export default function SurveyPopup({ onClose }: SurveyPopupProps) {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | string[]>>({})

  const questions = [
    {
      id: "experience",
      title: "What kind of experience are you looking for?",
      type: "multiple",
      options: ["Adventure & Trekking", "Cultural Experience", "Relaxation", "Wildlife", "Food Tour", "Mix of all"],
    },
    {
      id: "budget",
      title: "What's your estimated budget range?",
      type: "single",
      options: ["$500-$1,000", "$1,000-$2,000", "$2,000-$5,000", "$5,000+"],
    },
    {
      id: "days",
      title: "How many days do you plan to travel?",
      type: "single",
      options: ["1-3 days", "4-7 days", "7-14 days", "15+ days"],
    },
    {
      id: "guideType",
      title: "What type of guide do you prefer?",
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
      localStorage.setItem("userSurvey", JSON.stringify(responses))
      onClose()
    }
  }

  const isAnswered = responses[questions[step].id]

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex-1">Let's Find Your Perfect Guide</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition text-2xl font-light">
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-slate-600 mb-2">
            Question {step + 1} of {questions.length}
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${((step + 1) / questions.length) * 100}%`,
                backgroundColor: "var(--color-primary)",
              }}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-4">{questions[step].title}</h3>

        <div className="space-y-2 mb-6">
          {questions[step].options.map((option) => {
            const isSelected = Array.isArray(responses[questions[step].id])
              ? (responses[questions[step].id] as string[]).includes(option)
              : responses[questions[step].id] === option

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full p-3 text-left rounded-lg border-2 transition font-medium ${
                  isSelected
                    ? "border-cyan-600 bg-cyan-50 text-slate-900"
                    : "border-slate-200 bg-white text-slate-900 hover:border-cyan-300"
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-4 py-2 border-2 border-slate-200 text-slate-900 rounded-lg hover:bg-slate-100 transition font-medium"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1 px-4 py-2 rounded-lg font-medium transition text-white"
            style={{
              backgroundColor: isAnswered ? "var(--color-primary)" : "#cbd5e1",
              cursor: isAnswered ? "pointer" : "not-allowed",
              opacity: isAnswered ? 1 : 0.7,
            }}
          >
            {step === questions.length - 1 ? "Complete" : "Next"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 px-4 py-2 text-slate-600 hover:text-slate-900 transition font-medium"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}
