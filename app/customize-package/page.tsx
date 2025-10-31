"use client"

import { useState } from "react"

export default function CustomizePackagePage() {
  const [formData, setFormData] = useState({
    numGuides: "",
    numDays: "",
    hotelPreference: "",
    budgetMin: "",
    budgetMax: "",
    places: [],
    pickupLocation: "",
    foodPreference: "",
    transportationMode: [],
    tripType: [],
    insurance: "",
  })

  const [step, setStep] = useState(1)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Customize Package Form:", formData)
    // Redirect to packages with filters applied
    window.location.href = "/packages"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Create Your Custom Package</h1>
          <p className="text-lg text-slate-600">Tell us your preferences and we'll find the perfect guide for you</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  step >= s ? "bg-cyan-600 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {s}
              </div>
              <div className={`text-sm mt-2 font-medium ${step >= s ? "text-cyan-600" : "text-slate-500"}`}>
                {["Basics", "Budget", "Preferences", "Details"][s - 1]}
              </div>
              {s < 4 && <div className={`h-1 w-full mt-4 ${step > s ? "bg-cyan-600" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Step 1: Basics */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Trip Basics</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Guides</label>
                  <input
                    type="number"
                    name="numGuides"
                    value={formData.numGuides}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Days</label>
                  <input
                    type="number"
                    name="numDays"
                    value={formData.numDays}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="e.g., 5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pickup/Drop Location</label>
                <select
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select location type</option>
                  <option value="airport">Airport</option>
                  <option value="hotel">Hotel</option>
                  <option value="custom">Custom Address</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Hotel */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Budget & Accommodation</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">Budget Range</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-600 mb-1 block">Minimum</label>
                    <input
                      type="number"
                      name="budgetMin"
                      value={formData.budgetMin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="$300"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 mb-1 block">Maximum</label>
                    <input
                      type="number"
                      name="budgetMax"
                      value={formData.budgetMax}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="$5000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Hotel Preference</label>
                <div className="space-y-3">
                  {["Provided by us", "Self-arranged"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="hotelPreference"
                        value={option}
                        checked={formData.hotelPreference === option}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-cyan-600"
                      />
                      <span className="ml-3 text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Food & Transport */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Food & Transportation</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Food Preference</label>
                <select
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="mixed">Mixed Diet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Transportation Mode</label>
                <div className="space-y-3">
                  {["Car", "Jeep", "Flight", "Bus", "Trekking"].map((mode) => (
                    <label key={mode} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.transportationMode.includes(mode)}
                        onChange={() => handleCheckboxChange("transportationMode", mode)}
                        className="w-4 h-4 text-cyan-600 rounded"
                      />
                      <span className="ml-3 text-slate-700">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Trip Type & Insurance */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Trip Details</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Trip Type</label>
                <div className="space-y-3">
                  {["Adventure", "Cultural", "Relaxation", "Wildlife", "Food", "Mix of all"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.tripType.includes(type)}
                        onChange={() => handleCheckboxChange("tripType", type)}
                        className="w-4 h-4 text-cyan-600 rounded"
                      />
                      <span className="ml-3 text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Insurance</label>
                <div className="space-y-3">
                  {["Yes, include insurance", "No, exclude insurance"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="insurance"
                        value={option}
                        checked={formData.insurance === option}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-cyan-600"
                      />
                      <span className="ml-3 text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                step === 1 ? "text-slate-400 cursor-not-allowed" : "text-cyan-600 hover:bg-cyan-50"
              }`}
              disabled={step === 1}
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
              >
                Find Guides
              </button>
            )}
          </div>
        </form>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900">
            ✓ Fill out your preferences and we'll match you with the best guides for your trip
          </p>
        </div>
      </div>
    </div>
  )
}
