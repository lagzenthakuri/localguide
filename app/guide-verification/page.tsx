"use client"

import { useState, ChangeEvent } from "react"
import { Upload, CheckCircle, AlertCircle, X } from "lucide-react"

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

export default function GuideVerification() {
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

  const handleSubmit = async (): Promise<void> => {
    if (!validateStep(3)) return
    
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false)
      setCurrentStep(4)
    }, 2000)
  }

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
                <span className="font-semibold">Click to upload</span> or drag and drop
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Guide Verification</h1>
          <p className="text-slate-600">Complete all steps to become a verified guide on Meet My Guide</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: "Personal Info" },
            { num: 2, label: "Professional Details" },
            { num: 3, label: "Documents" },
          ].map((step, index) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= step.num 
                    ? "bg-cyan-600 text-white" 
                    : "bg-slate-200 text-slate-600"
                }`}>
                  {currentStep > step.num ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.num
                  )}
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2 hidden sm:block">{step.label}</span>
              </div>
              {index < 2 && (
                <div className={`h-1 flex-1 mx-2 transition-all ${
                  currentStep > step.num ? "bg-cyan-600" : "bg-slate-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fullName", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.fullName ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-cyan-500"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-cyan-500"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.phone ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-cyan-500"
                    }`}
                    placeholder="+977 9812345678"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("dateOfBirth", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.dateOfBirth ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-cyan-500"
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("nationality", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.nationality ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-cyan-500"
                    }`}
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
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Professional Details</h2>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Main Guiding Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.mainLocation}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("mainLocation", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.mainLocation ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-cyan-500"
                  }`}
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
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Other Locations You Can Guide
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {locations.filter(loc => loc !== formData.mainLocation).map(location => (
                    <label key={location} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.otherLocations.includes(location)}
                        onChange={() => handleMultiSelect("otherLocations", location)}
                        className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                      <span className="text-sm text-slate-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Languages You Speak <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languageOptions.map(language => (
                    <label key={language} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language)}
                        onChange={() => handleMultiSelect("languages", language)}
                        className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                      <span className="text-sm text-slate-700">{language}</span>
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
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Specializations <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specializationOptions.map(spec => (
                    <label key={spec} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.specializations.includes(spec)}
                        onChange={() => handleMultiSelect("specializations", spec)}
                        className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                      <span className="text-sm text-slate-700">{spec}</span>
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.experience}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("experience", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.experience ? "border-red-300 focus:ring-red-500" : "border-slate-300 focus:ring-cyan-500"
                  }`}
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
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Document Verification</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Important Guidelines:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      <li>All documents must be clear and readable</li>
                      <li>File size should not exceed 5MB per document</li>
                      <li>Accepted formats: JPG, PNG, PDF</li>
                      <li>Documents will be reviewed within 2-3 business days</li>
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
                  label="Government Issued ID (Citizenship/Passport)"
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
                
                <FileUploadBox
                  field="firstAidCertificate"
                  label="First Aid Certificate"
                  formData={formData}
                  errors={errors}
                  onFileUpload={handleFileUpload}
                />
              </div>

              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 mt-0.5"
                    required
                  />
                  <span className="text-sm text-slate-700">
                    I certify that all the information provided is accurate and true. I understand that providing false information may result in the rejection of my application or termination of my guide account.
                  </span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                Thank you for applying to become a guide on Meet My Guide. Our team will review your application and documents within 2-3 business days.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                <h3 className="font-semibold text-slate-900 mb-3">What happens next?</h3>
                <ol className="text-left space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600">1.</span>
                    <span>Document verification by our team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600">2.</span>
                    <span>Email notification about your application status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600">3.</span>
                    <span>Profile activation and dashboard access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600">4.</span>
                    <span>Start accepting bookings!</span>
                  </li>
                </ol>
              </div>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all"
              >
                Return to Home
              </a>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
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
                  className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:bg-green-400 disabled:cursor-not-allowed flex items-center gap-2"
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
          )}
        </div>

        {/* Help Section */}
        {currentStep < 4 && (
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Need help? Contact our support team at{" "}
              <a href="mailto:support@MeetMyGuide.com" className="text-cyan-600 hover:text-cyan-700 font-medium">
                support@meetmyguide.com
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}