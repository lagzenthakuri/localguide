"use client"

import { useState, ChangeEvent } from "react"
import { Upload, CheckCircle, AlertCircle, X, Clock, XCircle, Bell, Menu } from "lucide-react"

interface FormData {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  nationality: string
  mainLocation: string
  otherLocations: string[]
  experience: string
  specializations: string[]
  languages: string[]
  passportPhoto: File | null
  governmentId: File | null
  guideLicense: File | null
  insuranceCertificate: File | null
  firstAidCertificate: File | null
  otherDocuments: File[]
}

interface Errors {
  [key: string]: string
}

interface FileUploadBoxProps {
  field: keyof FormData
  label: string
  required?: boolean
  accept?: string
  formData: FormData
  errors: Errors
  onFileUpload: (field: keyof FormData, file: File | null) => void
}

type VerificationStatus = "not-submitted" | "pending" | "approved" | "rejected"

interface BookingRequest {
  id: number
  touristName: string
  touristImage: string
  packageName: string
  date: string
  time: string
  guests: number
  price: number
  status: "pending" | "accepted" | "rejected" | "completed"
  specialRequests?: string
}

interface CustomPackageOffer {
  id: number
  touristName: string
  touristImage: string
  noOfGuides: number
  days: number
  budgetRange: string
  places: string[]
  specialRequests: string
  status: "new" | "bidding" | "accepted" | "rejected"
  createdAt: string
}

const MOCK_REQUESTS: BookingRequest[] = [
  {
    id: 1,
    touristName: "Sarah Johnson",
    touristImage: "https://i.pravatar.cc/150?img=1",
    packageName: "Everest Base Camp Trek",
    date: "2024-12-15",
    time: "05:00 AM",
    guests: 2,
    price: 1700,
    status: "pending",
    specialRequests: "Need experienced high-altitude guide",
  },
]

const MOCK_CUSTOM_OFFERS: CustomPackageOffer[] = [
  {
    id: 1,
    touristName: "Sarah Johnson",
    touristImage: "https://i.pravatar.cc/150?img=1",
    noOfGuides: 2,
    days: 5,
    budgetRange: "$1000-$2000",
    places: ["Everest Base Camp", "Kathmandu"],
    specialRequests: "Need experienced trekking guides with emergency medical training",
    status: "new",
    createdAt: "2 mins ago",
  },
]

export default function GuideDashboard() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("not-submitted")
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    mainLocation: "",
    otherLocations: [],
    experience: "",
    specializations: [],
    languages: [],
    passportPhoto: null,
    governmentId: null,
    guideLicense: null,
    insuranceCertificate: null,
    firstAidCertificate: null,
    otherDocuments: [],
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [requests, setRequests] = useState<BookingRequest[]>(MOCK_REQUESTS)
  const [customOffers, setCustomOffers] = useState<CustomPackageOffer[]>(MOCK_CUSTOM_OFFERS)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [bidAmount, setBidAmount] = useState("")
  const [bidMessage, setBidMessage] = useState("")
  const [showBidDialog, setShowBidDialog] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<CustomPackageOffer | null>(null)
  const [showNewOfferAlert, setShowNewOfferAlert] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const locations: string[] = [
    "Kathmandu", "Pokhara", "Chitwan", "Lukla", "Sagarmatha (Mt. Everest)",
    "Annapurna", "Langtang", "Patan", "Bhaktapur", "Nagarkot"
  ]

  const languageOptions: string[] = [
    "English", "Nepali", "Hindi", "Mandarin", "German", 
    "French", "Spanish", "Japanese", "Korean", "Italian"
  ]

  const specializationOptions: string[] = [
    "Mountain Trekking", "Cultural Tours", "Adventure Sports", 
    "Wildlife Safari", "Photography Tours", "Heritage Sites",
    "Pilgrimage Tours", "Rock Climbing", "Paragliding", "Rafting"
  ]

  const stats = {
    totalEarnings: 3450,
    completedTours: 24,
    averageRating: 4.8,
    thisMonthEarnings: 1280,
    acceptanceRate: 92,
  }

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const handleMultiSelect = (field: keyof FormData, value: string): void => {
    setFormData(prev => {
      const current = prev[field] as string[]
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) }
      } else {
        return { ...prev, [field]: [...current, value] }
      }
    })
  }

  const handleFileUpload = (field: keyof FormData, file: File | null): void => {
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [field]: "File size must be less than 5MB" }))
      return
    }
    setFormData(prev => ({ ...prev, [field]: file }))
    setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Errors = {}
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required"
    }
    
    if (step === 2) {
      if (!formData.mainLocation) newErrors.mainLocation = "Main location is required"
      if (formData.languages.length === 0) newErrors.languages = "Select at least one language"
      if (formData.specializations.length === 0) newErrors.specializations = "Select at least one specialization"
      if (!formData.experience) newErrors.experience = "Experience is required"
    }
    
    if (step === 3) {
      if (!formData.passportPhoto) newErrors.passportPhoto = "Passport photo is required"
      if (!formData.governmentId) newErrors.governmentId = "Government ID is required"
      if (!formData.guideLicense) newErrors.guideLicense = "Guide license is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSubmitVerification = async (): Promise<void> => {
    if (!validateStep(3)) return
    
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setVerificationStatus("pending")
      setSelectedTab("overview")
    }, 2000)
  }

  const handleAcceptRequest = (requestId: number) => {
    setRequests(requests.map((req) => (req.id === requestId ? { ...req, status: "accepted" as const } : req)))
  }

  const handleRejectRequest = (requestId: number) => {
    setRequests(requests.filter((req) => req.id !== requestId))
  }

  const handleSubmitBid = (offerId: number) => {
    if (!bidAmount) return
    
    setCustomOffers(customOffers.map(offer => 
      offer.id === offerId ? { ...offer, status: "bidding" as const } : offer
    ))
    
    setBidAmount("")
    setBidMessage("")
    setShowBidDialog(false)
    setSelectedOffer(null)
  }

  const handleRejectOffer = (offerId: number) => {
    setCustomOffers(customOffers.filter(offer => offer.id !== offerId))
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const acceptedRequests = requests.filter((r) => r.status === "accepted")
  const newCustomOffers = customOffers.filter((o) => o.status === "new")

  const FileUploadBox = ({ field, label, required = false, accept = "image/*,.pdf", formData, errors, onFileUpload }: FileUploadBoxProps) => {
    const file = formData[field] as File | null
    const error = errors[field]
    
    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {!file ? (
          <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            error ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
          }`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className={`w-8 h-8 mb-2 ${error ? "text-red-400" : "text-slate-400"}`} />
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG or PDF (max. 5MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const selectedFile = e.target.files?.[0] || null
                onFileUpload(field, selectedFile)
              }}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                <p className="text-xs text-slate-600">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={() => onFileUpload(field, null)}
              className="p-1 hover:bg-green-100 rounded"
              type="button"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold bg-cyan-600">
                LG
              </div>
              <span className="font-bold text-lg text-slate-900">LocalGuide</span>
              <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full font-semibold">GUIDE</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => setSelectedTab("overview")} className="text-slate-900 hover:text-cyan-600 transition font-medium">
                Dashboard
              </button>
              <button onClick={() => setSelectedTab("verification")} className="text-slate-900 hover:text-cyan-600 transition font-medium">
                Verification
              </button>
              <Bell className="w-5 h-5 text-slate-600 cursor-pointer hover:text-cyan-600" />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Verification Status Banner */}
        {verificationStatus === "approved" && (
          <div className="mb-6 border-2 border-green-500 bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-green-900 font-bold">Verification Approved!</p>
                <p className="text-green-800 text-sm">Your guide profile has been verified.</p>
              </div>
            </div>
          </div>
        )}

        {verificationStatus === "pending" && (
          <div className="mb-6 border-2 border-yellow-500 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div className="flex-1">
                <p className="text-yellow-900 font-bold">Verification Pending</p>
                <p className="text-yellow-800 text-sm">Your documents are under review. We'll notify you within 2-3 business days.</p>
              </div>
            </div>
          </div>
        )}

        {verificationStatus === "not-submitted" && (
          <div className="mb-6 border-2 border-blue-500 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-blue-900 font-bold">Complete Your Verification</p>
                  <p className="text-blue-800 text-sm">Submit your documents to become a verified guide.</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTab("verification")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Start Verification
              </button>
            </div>
          </div>
        )}

        {/* New Offers Alert */}
        {newCustomOffers.length > 0 && showNewOfferAlert && verificationStatus === "approved" && (
          <div className="mb-6 border-2 border-cyan-500 bg-cyan-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <p className="text-cyan-900 font-bold">New Custom Package Offers Available!</p>
                  <p className="text-cyan-800 text-sm">You have {newCustomOffers.length} new custom package request(s).</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedTab("custom-offers")}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium"
                >
                  View Offers
                </button>
                <button
                  onClick={() => setShowNewOfferAlert(false)}
                  className="text-cyan-600 hover:text-cyan-700 p-2"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Guide Dashboard</h1>
              <p className="text-slate-600">Welcome back, Guide!</p>
            </div>
            {verificationStatus !== "not-submitted" && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border-2" style={{
                borderColor: verificationStatus === "approved" ? "#10b981" : verificationStatus === "pending" ? "#f59e0b" : "#ef4444",
                backgroundColor: verificationStatus === "approved" ? "#ecfdf5" : verificationStatus === "pending" ? "#fef3c7" : "#fee2e2"
              }}>
                {verificationStatus === "approved" && <CheckCircle className="w-5 h-5 text-green-600" />}
                {verificationStatus === "pending" && <Clock className="w-5 h-5 text-yellow-600" />}
                <span className="font-semibold" style={{
                  color: verificationStatus === "approved" ? "#065f46" : verificationStatus === "pending" ? "#92400e" : "#991b1b"
                }}>
                  {verificationStatus === "approved" && "Verified"}
                  {verificationStatus === "pending" && "Pending Review"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Verification Status</p>
                <p className="text-xl font-bold text-slate-900 capitalize">{verificationStatus.replace("-", " ")}</p>
              </div>
              <span className="text-3xl opacity-20">
                {verificationStatus === "approved" ? "✅" : verificationStatus === "pending" ? "⏳" : "📋"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-slate-900">${stats.totalEarnings}</p>
              </div>
              <span className="text-3xl opacity-20">💰</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Completed Tours</p>
                <p className="text-3xl font-bold text-slate-900">{stats.completedTours}</p>
              </div>
              <span className="text-3xl opacity-20">✅</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Custom Offers</p>
                <p className="text-3xl font-bold text-slate-900">{newCustomOffers.length}</p>
              </div>
              <span className="text-3xl opacity-20">🎯</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {["overview", "verification", "requests", "custom-offers", "bookings"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    selectedTab === tab
                      ? "border-b-2 border-cyan-600 text-cyan-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  {tab === "requests" && pendingRequests.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                      {pendingRequests.length}
                    </span>
                  )}
                  {tab === "custom-offers" && newCustomOffers.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-cyan-100 text-cyan-800 text-xs rounded-full">
                      {newCustomOffers.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📈 This Month</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Earnings</span>
                        <span className="font-bold">${stats.thisMonthEarnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tours Completed</span>
                        <span className="font-bold">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Acceptance Rate</span>
                        <span className="font-bold">{stats.acceptanceRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Verification Status</h3>
                    {verificationStatus === "approved" && (
                      <div className="text-center py-4">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                        <p className="font-bold">Verified Guide</p>
                        <p className="text-sm text-slate-600">Your profile is fully verified</p>
                      </div>
                    )}
                    {verificationStatus === "pending" && (
                      <div className="text-center py-4">
                        <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                        <p className="font-bold">Under Review</p>
                        <p className="text-sm text-slate-600">We'll review within 2-3 business days</p>
                      </div>
                    )}
                    {verificationStatus === "not-submitted" && (
                      <div className="text-center py-4">
                        <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                        <p className="font-bold">Not Verified</p>
                        <p className="text-sm text-slate-600 mb-3">Complete verification to start</p>
                        <button 
                          onClick={() => setSelectedTab("verification")} 
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Start Verification
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Verification Tab */}
            {selectedTab === "verification" && (
              <div>
                {verificationStatus === "not-submitted" ? (
                  <div>
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8">
                      {[
                        { num: 1, label: "Personal Info" },
                        { num: 2, label: "Professional Details" },
                        { num: 3, label: "Documents" },
                      ].map((step, index) => (
                        <div key={step.num} className="flex items-center flex-1">
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              currentStep >= step.num ? "bg-cyan-600 text-white" : "bg-slate-200 text-slate-600"
                            }`}>
                              {currentStep > step.num ? <CheckCircle className="w-6 h-6" /> : step.num}
                            </div>
                            <span className="text-xs font-medium text-slate-700 mt-2 hidden sm:block">{step.label}</span>
                          </div>
                          {index < 2 && (
                            <div className={`h-1 flex-1 mx-2 ${currentStep > step.num ? "bg-cyan-600" : "bg-slate-200"}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg ${errors.fullName ? "border-red-300" : "border-slate-300"}`}
                              placeholder="Enter your full name"
                            />
                            {errors.fullName && (
                              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" /> {errors.fullName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-300" : "border-slate-300"}`}
                              placeholder="your.email@example.com"
                            />
                            {errors.email && (
                              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" /> {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? "border-red-300" : "border-slate-300"}`}
                              placeholder="+977 9812345678"
                            />
                            {errors.phone && (
                              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" /> {errors.phone}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg ${errors.dateOfBirth ? "border-red-300" : "border-slate-300"}`}
                            />
                            {errors.dateOfBirth && (
                              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" /> {errors.dateOfBirth}
                              </p>
                            )}
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">
                              Nationality <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.nationality}
                              onChange={(e) => handleInputChange("nationality", e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg ${errors.nationality ? "border-red-300" : "border-slate-300"}`}
                              placeholder="e.g., Nepali"
                            />
                            {errors.nationality && (
                              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" /> {errors.nationality}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Professional Details</h2>
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Main Guiding Location <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.mainLocation}
                            onChange={(e) => handleInputChange("mainLocation", e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.mainLocation ? "border-red-300" : "border-slate-300"}`}
                          >
                            <option value="">Select your main location</option>
                            {locations.map(loc => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                          {errors.mainLocation && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> {errors.mainLocation}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-3">
                            Languages You Speak <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {languageOptions.map(language => (
                              <label key={language} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.languages.includes(language)}
                                  onChange={() => handleMultiSelect("languages", language)}
                                  className="w-4 h-4 text-cyan-600 rounded"
                                />
                                <span className="text-sm">{language}</span>
                              </label>
                            ))}
                          </div>
                          {errors.languages && (
                            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> {errors.languages}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-3">
                            Specializations <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {specializationOptions.map(spec => (
                              <label key={spec} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.specializations.includes(spec)}
                                  onChange={() => handleMultiSelect("specializations", spec)}
                                  className="w-4 h-4 text-cyan-600 rounded"
                                />
                                <span className="text-sm">{spec}</span>
                              </label>
                            ))}
                          </div>
                          {errors.specializations && (
                            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> {errors.specializations}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Years of Experience <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.experience}
                            onChange={(e) => handleInputChange("experience", e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.experience ? "border-red-300" : "border-slate-300"}`}
                          >
                            <option value="">Select experience</option>
                            <option value="1-2">1-2 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                          {errors.experience && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> {errors.experience}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Document Verification</h2>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-900">
                              <p className="font-semibold mb-1">Important Guidelines:</p>
                              <ul className="list-disc list-inside space-y-1 text-blue-800">
                                <li>All documents must be clear and readable</li>
                                <li>File size should not exceed 5MB per document</li>
                                <li>Accepted formats: JPG, PNG, PDF</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FileUploadBox
                            field="passportPhoto"
                            label="Passport Size Photo"
                            required={true}
                            accept="image/*"
                            formData={formData}
                            errors={errors}
                            onFileUpload={handleFileUpload}
                          />
                          
                          <FileUploadBox
                            field="governmentId"
                            label="Government Issued ID"
                            required={true}
                            formData={formData}
                            errors={errors}
                            onFileUpload={handleFileUpload}
                          />
                          
                          <FileUploadBox
                            field="guideLicense"
                            label="Guide License/Certificate"
                            required={true}
                            formData={formData}
                            errors={errors}
                            onFileUpload={handleFileUpload}
                          />
                          
                          <FileUploadBox
                            field="insuranceCertificate"
                            label="Insurance Certificate"
                            formData={formData}
                            errors={errors}
                            onFileUpload={handleFileUpload}
                          />
                        </div>

                        <div className="pt-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-cyan-600 rounded mt-0.5"
                              required
                            />
                            <span className="text-sm text-slate-700">
                              I certify that all information provided is accurate and true.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                      <button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        disabled={currentStep === 1}
                        className={`px-6 py-2 rounded-lg font-medium ${
                          currentStep === 1
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        Previous
                      </button>

                      {currentStep < 3 ? (
                        <button
                          onClick={handleNext}
                          className="px-8 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitVerification}
                          disabled={submitting}
                          className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:bg-green-400 flex items-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ) : verificationStatus === "pending" ? (
                  <div className="text-center py-12">
                    <Clock className="w-20 h-20 text-yellow-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Verification Under Review</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                      Our team is reviewing your application. You'll be notified within 2-3 business days.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Verification Approved!</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                      You can now accept bookings and custom package requests.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Requests Tab */}
            {selectedTab === "requests" && (
              <div className="space-y-4">
                {verificationStatus !== "approved" ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">Complete verification to view booking requests</p>
                    <button 
                      onClick={() => setSelectedTab("verification")} 
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
                    >
                      Complete Verification
                    </button>
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-5xl">✅</span>
                    <p className="text-slate-600 mt-4">No pending requests</p>
                  </div>
                ) : (
                  pendingRequests.map((request) => (
                    <div key={request.id} className="bg-slate-50 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={request.touristImage}
                            alt={request.touristName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-bold text-slate-900">{request.touristName}</h3>
                            <p className="text-sm text-slate-600">{request.packageName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-cyan-600">${request.price}</p>
                          <p className="text-xs text-slate-600">{request.guests} guests</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          📅 <span>{request.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          ⏰ <span>{request.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          👥 <span>{request.guests} guests</span>
                        </div>
                      </div>

                      {request.specialRequests && (
                        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-xs font-semibold text-yellow-800 mb-1">Special Requests</p>
                          <p className="text-sm text-yellow-900">{request.specialRequests}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                        >
                          👍 Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="flex-1 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Custom Offers Tab */}
            {selectedTab === "custom-offers" && (
              <div className="space-y-4">
                {verificationStatus !== "approved" ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">Complete verification to view custom package offers</p>
                    <button 
                      onClick={() => setSelectedTab("verification")} 
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
                    >
                      Complete Verification
                    </button>
                  </div>
                ) : customOffers.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-5xl">📦</span>
                    <p className="text-slate-600 mt-4">No custom package offers yet</p>
                  </div>
                ) : (
                  customOffers.map((offer) => (
                    <div key={offer.id} className={`rounded-lg p-6 ${offer.status === "new" ? "bg-cyan-50 border-2 border-cyan-500" : "bg-slate-50"}`}>
                      {offer.status === "new" && (
                        <div className="mb-4 px-3 py-2 bg-cyan-100 text-cyan-800 rounded-lg flex items-center gap-2 font-semibold">
                          <span className="text-lg">✨</span>
                          NEW OFFER - Submit your bid!
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={offer.touristImage}
                            alt={offer.touristName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-bold text-slate-900">{offer.touristName}</h3>
                            <p className="text-xs text-slate-600">{offer.createdAt}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-cyan-600">{offer.budgetRange}</p>
                          <p className="text-xs text-slate-600">Budget Range</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span>👥</span>
                            <span className="text-slate-600">{offer.noOfGuides} Guide(s)</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>📅</span>
                            <span className="text-slate-600">{offer.days} Days</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-900 mb-1">Destinations</p>
                          <div className="flex flex-wrap gap-2">
                            {offer.places.map((place) => (
                              <span key={place} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {place}
                              </span>
                            ))}
                          </div>
                        </div>

                        {offer.specialRequests && (
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-xs font-semibold text-yellow-800 mb-1">Special Requests</p>
                            <p className="text-sm text-yellow-900">{offer.specialRequests}</p>
                          </div>
                        )}
                      </div>

                      {offer.status === "new" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedOffer(offer)
                              setShowBidDialog(true)
                            }}
                            className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium"
                          >
                            💰 Submit Bid
                          </button>
                          <button
                            onClick={() => handleRejectOffer(offer.id)}
                            className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium"
                          >
                            Decline
                          </button>
                        </div>
                      )}

                      {offer.status === "bidding" && (
                        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
                          <p className="text-sm font-semibold text-blue-900">⏳ Bid Submitted - Waiting for response</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {selectedTab === "bookings" && (
              <div>
                <h3 className="font-bold text-slate-900 mb-3">⏳ Upcoming Bookings</h3>
                {acceptedRequests.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-lg">
                    <p className="text-slate-600">No upcoming bookings</p>
                  </div>
                ) : (
                  acceptedRequests.map((request) => (
                    <div key={request.id} className="bg-slate-50 rounded-lg p-6 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={request.touristImage}
                            alt={request.touristName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">{request.touristName}</p>
                            <p className="text-sm text-slate-600">{request.packageName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600">{request.date} at {request.time}</p>
                          <p className="font-bold text-cyan-600">${request.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bid Dialog */}
      {showBidDialog && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Submit Your Bid</h3>
              <button
                onClick={() => {
                  setShowBidDialog(false)
                  setSelectedOffer(null)
                  setBidAmount("")
                  setBidMessage("")
                }}
                className="text-slate-600 hover:text-slate-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-4">
                  Tourist's Budget: <span className="font-bold text-slate-900">{selectedOffer.budgetRange}</span>
                </p>
                <label className="block text-sm font-semibold mb-2">
                  Your Bid Amount ($)
                </label>
                <input
                  type="number"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message to Tourist (Optional)
                </label>
                <textarea
                  placeholder="Explain what's included in your bid..."
                  rows={4}
                  value={bidMessage}
                  onChange={(e) => setBidMessage(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg"
                />
              </div>

              <button
                onClick={() => handleSubmitBid(selectedOffer.id)}
                className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}