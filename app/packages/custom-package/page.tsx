"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const NEPAL_DESTINATIONS = [
  "Kathmandu",
  "Pokhara",
  "Everest Base Camp",
  "Chitwan",
  "Nagarkot",
  "Janakpur",
  "Ilam",
  "Rara Lake",
]

const FOOD_PREFERENCES = ["Provided by us", "Self-arranged", "Vegetarian", "Non-vegetarian", "Vegan"]

const TRANSPORTATION_MODES = ["Car", "Jeep", "Flight", "Bus", "Trekking only"]

const TRIP_TYPES = ["Adventure", "Cultural", "Relaxation", "Wildlife", "Food", "Mix of all"]

export default function CustomPackagePage() {
  const [formData, setFormData] = useState({
    noOfGuides: 1,
    days: 3,
    hotelPreference: "Provided by us",
    budgetRange: "$300-$1000",
    places: [] as string[],
    foodPreference: [] as string[],
    transportationMode: [] as string[],
    tripType: [] as string[],
    insurance: false,
    specialRequests: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    console.log("Custom package request:", formData)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Create Custom Package</h1>
          <p className="text-slate-600">Tell us exactly what you want and we'll connect you with the perfect guides</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-slate-200 p-8 space-y-8">
          {/* Basic Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Basic Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Number of Guides Needed</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.noOfGuides}
                  onChange={(e) => handleInputChange("noOfGuides", Number.parseInt(e.target.value))}
                  className="border-2 border-slate-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Number of Days</label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={(e) => handleInputChange("days", Number.parseInt(e.target.value))}
                  className="border-2 border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Budget Range</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => handleInputChange("budgetRange", e.target.value)}
                  className="w-full h-10 px-3 border-2 border-slate-200 rounded-lg text-slate-900 bg-white"
                >
                  <option>$100-$500</option>
                  <option>$500-$1000</option>
                  <option>$1000-$2000</option>
                  <option>$2000-$5000</option>
                  <option>$5000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Hotel Preference</label>
                <select
                  value={formData.hotelPreference}
                  onChange={(e) => handleInputChange("hotelPreference", e.target.value)}
                  className="w-full h-10 px-3 border-2 border-slate-200 rounded-lg text-slate-900 bg-white"
                >
                  <option>Provided by us</option>
                  <option>Self-arranged</option>
                </select>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Select Destinations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {NEPAL_DESTINATIONS.map((place) => (
                <div key={place} className="flex items-center">
                  <Checkbox
                    id={place}
                    checked={formData.places.includes(place)}
                    onCheckedChange={(checked) => handleArrayChange("places", place, checked as boolean)}
                  />
                  <label htmlFor={place} className="ml-2 text-sm text-slate-700 cursor-pointer">
                    {place}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Food Preference */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Food Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FOOD_PREFERENCES.map((food) => (
                <div key={food} className="flex items-center">
                  <Checkbox
                    id={food}
                    checked={formData.foodPreference.includes(food)}
                    onCheckedChange={(checked) => handleArrayChange("foodPreference", food, checked as boolean)}
                  />
                  <label htmlFor={food} className="ml-2 text-sm text-slate-700 cursor-pointer">
                    {food}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Transportation Mode</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TRANSPORTATION_MODES.map((transport) => (
                <div key={transport} className="flex items-center">
                  <Checkbox
                    id={transport}
                    checked={formData.transportationMode.includes(transport)}
                    onCheckedChange={(checked) =>
                      handleArrayChange("transportationMode", transport, checked as boolean)
                    }
                  />
                  <label htmlFor={transport} className="ml-2 text-sm text-slate-700 cursor-pointer">
                    {transport}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Type */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Trip Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TRIP_TYPES.map((type) => (
                <div key={type} className="flex items-center">
                  <Checkbox
                    id={type}
                    checked={formData.tripType.includes(type)}
                    onCheckedChange={(checked) => handleArrayChange("tripType", type, checked as boolean)}
                  />
                  <label htmlFor={type} className="ml-2 text-sm text-slate-700 cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="insurance"
              checked={formData.insurance}
              onCheckedChange={(checked) => handleInputChange("insurance", checked)}
            />
            <label htmlFor="insurance" className="text-sm font-semibold text-slate-900 cursor-pointer">
              Do you need travel insurance?
            </label>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Special Requests or Additional Notes
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              placeholder="Tell us anything else we should know..."
              className="w-full h-32 px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-900 bg-white"
            />
          </div>

          {/* Submit */}
          <div className="space-y-4">
            {submitted && (
              <div className="bg-green-100 border-2 border-green-500 text-green-800 p-4 rounded-lg font-semibold">
                ✓ Your custom package request has been submitted! Guides will start bidding soon.
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg h-12"
            >
              Submit Package Request
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  )
}
