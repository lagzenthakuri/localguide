"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react"

interface BookingStep {
  step: number
  title: string
  description: string
}

const BOOKING_STEPS: BookingStep[] = [
  { step: 1, title: "Select Date & Time", description: "Choose your preferred tour date and time" },
  { step: 2, title: "Booking Details", description: "Provide your details and preferences" },
  { step: 3, title: "Payment", description: "Complete your payment securely" },
  { step: 4, title: "Confirmation", description: "Booking confirmed!" },
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    guests: "1",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeTerms: false,
  })

  const tourPrice = 85
  const taxes = Math.round(tourPrice * 0.1)
  const total = tourPrice + taxes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement & HTMLTextAreaElement
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {BOOKING_STEPS.map((step, idx) => (
              <div key={step.step} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step.step ? "bg-primary text-white" : "bg-muted-light text-muted"
                    }`}
                  >
                    {currentStep > step.step ? <CheckCircle size={24} /> : step.step}
                  </div>
                  {idx < BOOKING_STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${currentStep > step.step ? "bg-primary" : "bg-muted-light"}`} />
                  )}
                </div>
                <p className="text-xs font-semibold mt-2 text-foreground">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Select Date & Time */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                  <CardDescription>Choose your preferred date and time for the tour</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                      <Input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        className="border-2 border-muted-light rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Time</label>
                      <Input
                        type="time"
                        name="time"
                        value={bookingData.time}
                        onChange={handleInputChange}
                        className="border-2 border-muted-light rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Number of Guests</label>
                    <select
                      name="guests"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, guests: e.target.value }))}
                      className="w-full px-4 py-2 border-2 border-muted-light rounded-lg text-foreground bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
                    <p className="text-sm text-foreground">
                      <strong>Tour:</strong> Taj Mahal Sunrise Tour
                    </p>
                    <p className="text-sm text-muted mt-1">Duration: 4 hours</p>
                    <p className="text-sm text-muted">Guide: Rajesh Kumar (4.8★)</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Booking Details */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Details</CardTitle>
                  <CardDescription>We need your information to confirm the booking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      className="border-2 border-muted-light rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="border-2 border-muted-light rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className="border-2 border-muted-light rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      placeholder="Any special preferences or requirements?"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border-2 border-muted-light rounded-lg text-foreground bg-white"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      name="agreeTerms"
                      checked={bookingData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setBookingData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                      }
                    />
                    <label htmlFor="terms" className="text-sm text-muted cursor-pointer">
                      I agree to the terms and conditions and cancellation policy
                    </label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your payment method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-2 border-primary rounded-lg p-4 cursor-pointer bg-blue-50">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary" />
                        <div>
                          <p className="font-semibold text-foreground">Credit/Debit Card</p>
                          <p className="text-sm text-muted">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-muted-light rounded-lg p-4 cursor-pointer hover:bg-muted-light transition">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted" />
                        <div>
                          <p className="font-semibold text-foreground">Digital Wallet</p>
                          <p className="text-sm text-muted">PayPal, Apple Pay, Google Pay</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-muted-light rounded-lg p-4 cursor-pointer hover:bg-muted-light transition">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-muted" />
                        <div>
                          <p className="font-semibold text-foreground">Bank Transfer</p>
                          <p className="text-sm text-muted">Direct bank account payment</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details Form */}
                  <div className="space-y-4 mt-6 pt-6 border-t border-muted-light">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Card Number</label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="border-2 border-muted-light rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Expiry Date</label>
                        <Input type="text" placeholder="MM/YY" className="border-2 border-muted-light rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">CVV</label>
                        <Input type="text" placeholder="123" className="border-2 border-muted-light rounded-lg" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <Card className="text-center">
                <CardContent className="pt-12 pb-12">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
                  <p className="text-muted mb-6">Your tour has been successfully booked.</p>

                  <div className="bg-blue-50 border-l-4 border-primary p-4 rounded text-left mb-6">
                    <p className="text-sm text-foreground mb-3">
                      <strong>Booking Reference:</strong> TG-2024-001234
                    </p>
                    <p className="text-sm text-foreground mb-3">
                      <strong>Confirmation Email:</strong> Sent to {bookingData.email}
                    </p>
                    <p className="text-sm text-muted">
                      Check your email for tour details and guide contact information.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded text-left">
                    <p className="text-sm font-semibold text-foreground mb-1">What's Next?</p>
                    <ul className="text-sm text-muted space-y-1">
                      <li>• Your guide will contact you 24 hours before the tour</li>
                      <li>• Check your email for the guide's contact number</li>
                      <li>• Be ready 15 minutes before the scheduled time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tour Details */}
                <div className="pb-4 border-b border-muted-light">
                  <h4 className="font-semibold text-foreground mb-2">Taj Mahal Sunrise Tour</h4>
                  <div className="space-y-2 text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{bookingData.date || "Not selected"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{bookingData.time || "Not selected"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>
                        {bookingData.guests} {Number(bookingData.guests) === 1 ? "guest" : "guests"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>Agra, India</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tour price</span>
                    <span className="text-foreground font-semibold">${tourPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Taxes & fees</span>
                    <span className="text-foreground font-semibold">${taxes}</span>
                  </div>
                </div>

                <div className="border-t border-muted-light pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${total}</span>
                  </div>
                </div>

                {/* Guide Info */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-muted mb-2">GUIDE</p>
                  <div className="flex items-center gap-2">
                    <img src="/male-guide.jpg" alt="Guide" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Rajesh Kumar</p>
                      <p className="text-xs text-muted">4.8★ (324 reviews)</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  {currentStep < 4 && (
                    <>
                      <Button
                        onClick={handleNextStep}
                        disabled={
                          (currentStep === 1 && (!bookingData.date || !bookingData.time)) ||
                          (currentStep === 2 &&
                            (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.agreeTerms))
                        }
                        className="w-full bg-primary hover:bg-primary-dark text-white"
                      >
                        Continue to {currentStep === 1 ? "Details" : currentStep === 2 ? "Payment" : "Review"}
                      </Button>
                      {currentStep > 1 && (
                        <Button onClick={handlePreviousStep} variant="outline" className="w-full bg-transparent">
                          Back
                        </Button>
                      )}
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <Button className="w-full bg-primary hover:bg-primary-dark text-white">View My Bookings</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Exploring
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
