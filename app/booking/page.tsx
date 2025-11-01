"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Calendar, Users, CreditCard, CheckCircle } from "lucide-react"
import Link from "next/link"
import destinationsData from "@/data/destination-data.json"

interface BookingData {
  packageId: number | null
  destination: string
  numberOfPeople: number
  travelDate: string
  specialRequests: string
  fullName: string
  email: string
  phone: string
  emergencyContact: string
  paymentMethod: "card" | "bank" | "paypal"
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    packageId: null,
    destination: "",
    numberOfPeople: 1,
    travelDate: "",
    specialRequests: "",
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    paymentMethod: "card",
  })
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  useEffect(() => {
    // Try to get package from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const pkgId = urlParams.get('packageId')
    
    if (pkgId) {
      const pkg = destinationsData.packages.find(p => p.id === parseInt(pkgId))
      if (pkg) {
        setSelectedPackage(pkg)
        setBookingData(prev => ({
          ...prev,
          packageId: pkg.id,
          destination: pkg.destination
        }))
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handlePackageSelect = (packageId: number) => {
    const pkg = destinationsData.packages.find(p => p.id === packageId)
    if (pkg) {
      setSelectedPackage(pkg)
      setBookingData(prev => ({
        ...prev,
        packageId: pkg.id,
        destination: pkg.destination
      }))
    }
  }

  const calculateTotal = () => {
    if (!selectedPackage) return 0
    return selectedPackage.price * bookingData.numberOfPeople
  }

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted:", bookingData)
    setStep(4) // Move to confirmation
  }

  const isStepValid = () => {
    switch(step) {
      case 1:
        return selectedPackage !== null
      case 2:
        return bookingData.fullName && bookingData.email && bookingData.phone
      case 3:
        return bookingData.travelDate && bookingData.numberOfPeople > 0
      default:
        return true
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Complete Your Booking</h1>
          <p className="text-slate-600">Just a few steps to confirm your adventure</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Select Package" },
              { num: 2, label: "Your Details" },
              { num: 3, label: "Travel Info" },
              { num: 4, label: "Confirmation" }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className={`flex items-center gap-3 ${idx !== 3 ? 'flex-1' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    step >= s.num 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                    step >= s.num ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx !== 3 && (
                  <div className={`h-1 flex-1 mx-2 ${
                    step > s.num ? 'bg-cyan-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Step 1: Select Package */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Your Package</h2>
                  <div className="space-y-4">
                    {destinationsData.packages.map(pkg => {
                      const guide = destinationsData.guides.find(g => g.id === pkg.guideId)
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => handlePackageSelect(pkg.id)}
                          className={`border-2 rounded-xl p-6 cursor-pointer transition ${
                            selectedPackage?.id === pkg.id
                              ? 'border-cyan-500 bg-cyan-50'
                              : 'border-slate-200 hover:border-cyan-300'
                          }`}
                        >
                          <div className="flex gap-4">
                            <img 
                              src={pkg.image} 
                              alt={pkg.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-slate-900 text-lg mb-1">{pkg.name}</h3>
                              <p className="text-sm text-slate-600 mb-2">{pkg.destination} • {pkg.duration}</p>
                              <div className="flex items-center gap-4">
                                <span className="text-amber-500 text-sm">⭐ {pkg.rating}</span>
                                <span className="text-slate-600 text-sm">Guide: {guide?.name}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-cyan-600">${pkg.price}</div>
                              <div className="text-sm text-slate-600">per person</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={bookingData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
                          placeholder="+977 123456789"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={bookingData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
                        placeholder="+977 987654321"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Travel Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Travel Information</h2>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          Travel Date *
                        </label>
                        <input
                          type="date"
                          name="travelDate"
                          value={bookingData.travelDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          <Users className="inline w-4 h-4 mr-1" />
                          Number of People *
                        </label>
                        <input
                          type="number"
                          name="numberOfPeople"
                          value={bookingData.numberOfPeople}
                          onChange={handleInputChange}
                          min="1"
                          max="20"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Special Requests or Requirements
                      </label>
                      <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-cyan-500"
                        placeholder="Dietary restrictions, accessibility needs, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        <CreditCard className="inline w-4 h-4 mr-1" />
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'card', label: 'Credit Card', icon: '💳' },
                          { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                          { id: 'paypal', label: 'PayPal', icon: '💰' }
                        ].map(method => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: method.id as any }))}
                            className={`p-4 border-2 rounded-lg transition ${
                              bookingData.paymentMethod === method.id
                                ? 'border-cyan-500 bg-cyan-50'
                                : 'border-slate-200 hover:border-cyan-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">{method.icon}</div>
                            <div className="text-sm font-medium text-slate-900">{method.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
                  <p className="text-slate-600 mb-8">
                    Thank you for your booking. We've sent a confirmation email to {bookingData.email}
                  </p>
                  <div className="bg-slate-50 rounded-xl p-6 text-left mb-8">
                    <h3 className="font-bold text-slate-900 mb-4">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Package:</span>
                        <span className="font-semibold">{selectedPackage?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Travel Date:</span>
                        <span className="font-semibold">{bookingData.travelDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">People:</span>
                        <span className="font-semibold">{bookingData.numberOfPeople}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-200">
                        <span className="text-slate-600">Total Amount:</span>
                        <span className="font-bold text-cyan-600 text-lg">${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link href="/packages">
                      <button className="px-6 py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition">
                        Browse More Packages
                      </button>
                    </Link>
                    <Link href="/">
                      <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
                        Back to Home
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
                  {step > 1 && (
                    <button
                      onClick={handlePreviousStep}
                      className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={step === 3 ? handleSubmit : handleNextStep}
                    disabled={!isStepValid()}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
                      isStepValid()
                        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {step === 3 ? 'Confirm Booking' : 'Continue'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h3>
              
              {selectedPackage ? (
                <>
                  <div className="mb-4">
                    <img 
                      src={selectedPackage.image} 
                      alt={selectedPackage.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-bold text-slate-900">{selectedPackage.name}</h4>
                    <p className="text-sm text-slate-600">{selectedPackage.destination}</p>
                  </div>

                  <div className="space-y-3 py-4 border-t border-slate-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Price per person</span>
                      <span className="font-semibold">${selectedPackage.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Number of people</span>
                      <span className="font-semibold">{bookingData.numberOfPeople}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Duration</span>
                      <span className="font-semibold">{selectedPackage.duration}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-cyan-600">${calculateTotal()}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="text-green-600 text-xl">✓</div>
                      <div className="text-sm text-green-800">
                        <p className="font-semibold mb-1">Free Cancellation</p>
                        <p className="text-xs">Cancel up to 24 hours before your trip</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-slate-400 text-5xl mb-4">📦</div>
                  <p className="text-slate-600">Select a package to see summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}