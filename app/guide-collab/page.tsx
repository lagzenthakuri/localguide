"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Guide interface
interface Guide {
  id: number
  name: string
  experience: string
  location: string
  specialization: string
  languages: string[]
  rating: number
  reviews: number
  hourlyRate: number
  image: string
  verified: boolean
  packages: number
  responseTime: string
}

// Import guides data
const guidesData: Guide[] = [
  {
    id: 1,
    name: "Raj Singh",
    experience: "8 years",
    location: "Sagarmatha (Mt. Everest)",
    specialization: "Trekking, Mountain Expeditions",
    languages: ["English", "Nepali", "Hindi"],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 45,
    image: "/male-guide.jpg",
    verified: true,
    packages: 12,
    responseTime: "< 2 hours"
  },
  {
    id: 2,
    name: "Priya Sharma",
    experience: "6 years",
    location: "Kathmandu",
    specialization: "Cultural Tours, Heritage",
    languages: ["English", "Nepali", "German"],
    rating: 4.8,
    reviews: 142,
    hourlyRate: 40,
    image: "/female-guide.jpg",
    verified: true,
    packages: 10,
    responseTime: "< 1 hour"
  },
  {
    id: 3,
    name: "Ramesh Chand",
    experience: "12 years",
    location: "Pokhara",
    specialization: "Adventure, Paragliding",
    languages: ["English", "Nepali", "French"],
    rating: 4.9,
    reviews: 189,
    hourlyRate: 50,
    image: "/male-guide.jpg",
    verified: true,
    packages: 15,
    responseTime: "< 1.5 hours"
  },
  {
    id: 4,
    name: "Anita Nepal",
    experience: "5 years",
    location: "Chitwan",
    specialization: "Wildlife, Nature",
    languages: ["English", "Nepali"],
    rating: 4.7,
    reviews: 98,
    hourlyRate: 35,
    image: "/female-guide.jpg",
    verified: true,
    packages: 8,
    responseTime: "< 3 hours"
  },
  {
    id: 5,
    name: "Deepak Gurung",
    experience: "10 years",
    location: "Lukla",
    specialization: "High Altitude Trekking",
    languages: ["English", "Nepali", "Mandarin"],
    rating: 4.8,
    reviews: 176,
    hourlyRate: 55,
    image: "/male-guide.jpg",
    verified: true,
    packages: 14,
    responseTime: "< 4 hours"
  },
  {
    id: 6,
    name: "Seema Paudel",
    experience: "7 years",
    location: "Lumbini",
    specialization: "History Tours, Photography",
    languages: ["English", "Nepali", "Spanish"],
    rating: 4.6,
    reviews: 134,
    hourlyRate: 38,
    image: "/female-guide.jpg",
    verified: true,
    packages: 11,
    responseTime: "< 2.5 hours"
  }
]

interface CollaborationRequest {
  id: number
  fromGuide: Guide
  toGuide: Guide
  packageName: string
  destination: string
  duration: string
  proposedRate: number
  splitRatio: string
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

interface ActiveCollaboration {
  id: number
  guides: Guide[]
  packageName: string
  destination: string
  duration: string
  totalEarnings: number
  bookings: number
  rating: number
  reviews: number
  status: "active" | "completed"
}

export default function GuidesCollaborationPage() {
  const [partnerGuide, setPartnerGuide] = useState<Guide | null>(null)
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("all")
  
  // Form states
  const [packageName, setPackageName] = useState("")
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [proposedRate, setProposedRate] = useState("")
  const [splitRatio, setSplitRatio] = useState("50/50")
  const [message, setMessage] = useState("")

  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([
    {
      id: 1,
      fromGuide: guidesData[0],
      toGuide: guidesData[4],
      packageName: "Everest Base Camp Premium Trek",
      destination: "Sagarmatha",
      duration: "14 days",
      proposedRate: 140,
      splitRatio: "60/40",
      message: "Hi Deepak! I'd love to collaborate on EBC treks. Your high-altitude expertise combined with my mountain expedition experience would be perfect!",
      status: "accepted",
      createdAt: "2 days ago"
    },
    {
      id: 2,
      fromGuide: guidesData[2],
      toGuide: guidesData[3],
      packageName: "Pokhara-Chitwan Adventure Combo",
      destination: "Pokhara & Chitwan",
      duration: "5 days",
      proposedRate: 195,
      splitRatio: "50/50",
      message: "Let's create an adventure-wildlife combo package. Pokhara activities followed by Chitwan safari!",
      status: "pending",
      createdAt: "1 hour ago"
    }
  ])

  const [activeCollaborations, setActiveCollaborations] = useState<ActiveCollaboration[]>([
    {
      id: 1,
      guides: [guidesData[0], guidesData[4]],
      packageName: "Everest Base Camp Premium Trek",
      destination: "Sagarmatha",
      duration: "14 days",
      totalEarnings: 4200,
      bookings: 30,
      rating: 4.9,
      reviews: 28,
      status: "active"
    },
    {
      id: 2,
      guides: [guidesData[1], guidesData[5]],
      packageName: "Heritage & Pilgrimage Tour",
      destination: "Kathmandu & Lumbini",
      duration: "4 days",
      totalEarnings: 2850,
      bookings: 42,
      rating: 4.8,
      reviews: 39,
      status: "active"
    }
  ])

  const currentGuide: Guide = guidesData[0]

  const filteredGuides = guidesData
    .filter(g => g.id !== currentGuide.id)
    .filter(g => 
      searchQuery === "" || 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(g => 
      filterSpecialization === "all" || 
      g.specialization.toLowerCase().includes(filterSpecialization.toLowerCase())
    )

  const handleSendRequest = () => {
    if (!partnerGuide || !packageName || !destination || !duration || !proposedRate) {
      alert("Please fill all required fields")
      return
    }

    const newRequest: CollaborationRequest = {
      id: Date.now(),
      fromGuide: currentGuide,
      toGuide: partnerGuide,
      packageName,
      destination,
      duration,
      proposedRate: Number(proposedRate),
      splitRatio,
      message,
      status: "pending",
      createdAt: "Just now"
    }

    setCollaborationRequests([newRequest, ...collaborationRequests])
    setShowRequestDialog(false)
    
    // Reset form
    setPackageName("")
    setDestination("")
    setDuration("")
    setProposedRate("")
    setSplitRatio("50/50")
    setMessage("")
    setPartnerGuide(null)
    
    alert("Collaboration request sent successfully!")
  }

  const handleAcceptRequest = (requestId: number) => {
    const request = collaborationRequests.find(r => r.id === requestId)
    if (!request) return

    setCollaborationRequests(
      collaborationRequests.map(r => 
        r.id === requestId ? { ...r, status: "accepted" as const } : r
      )
    )

    const newCollab: ActiveCollaboration = {
      id: Date.now(),
      guides: [request.fromGuide, request.toGuide],
      packageName: request.packageName,
      destination: request.destination,
      duration: request.duration,
      totalEarnings: 0,
      bookings: 0,
      rating: 0,
      reviews: 0,
      status: "active"
    }

    setActiveCollaborations([newCollab, ...activeCollaborations])
  }

  const handleRejectRequest = (requestId: number) => {
    setCollaborationRequests(
      collaborationRequests.map(r => 
        r.id === requestId ? { ...r, status: "rejected" as const } : r
      )
    )
  }

  const specializations = ["all", "Trekking", "Cultural", "Adventure", "Wildlife", "History"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Guide Collaboration Hub</h1>
              <p className="text-lg text-slate-600">
                Connect with fellow guides to create amazing joint packages and expand your reach
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-slate-600">You're logged in as</p>
                <p className="font-bold text-slate-900">{currentGuide.name}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl">
                👨
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100 mb-1">Active Collaborations</p>
                  <p className="text-3xl font-bold">{activeCollaborations.length}</p>
                </div>
                <span className="text-4xl opacity-20">🤝</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-100 mb-1">Total Collab Earnings</p>
                  <p className="text-3xl font-bold">${activeCollaborations.reduce((sum, c) => sum + c.totalEarnings, 0)}</p>
                </div>
                <span className="text-4xl opacity-20">💰</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-100 mb-1">Pending Requests</p>
                  <p className="text-3xl font-bold">
                    {collaborationRequests.filter(r => r.status === "pending" && r.toGuide.id === currentGuide.id).length}
                  </p>
                </div>
                <span className="text-4xl opacity-20">⏳</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-100 mb-1">Joint Bookings</p>
                  <p className="text-3xl font-bold">
                    {activeCollaborations.reduce((sum, c) => sum + c.bookings, 0)}
                  </p>
                </div>
                <span className="text-4xl opacity-20">📊</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests Alert */}
        {collaborationRequests.filter(r => r.status === "pending" && r.toGuide.id === currentGuide.id).length > 0 && (
          <Alert className="mb-6 border-2 border-orange-500 bg-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔔</span>
                <div>
                  <AlertTitle className="text-orange-900 font-bold">
                    New Collaboration Requests!
                  </AlertTitle>
                  <AlertDescription className="text-orange-800">
                    You have {collaborationRequests.filter(r => r.status === "pending" && r.toGuide.id === currentGuide.id).length} pending collaboration request(s)
                  </AlertDescription>
                </div>
              </div>
            </div>
          </Alert>
        )}

        {/* Main Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Find Guides */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Find Collaboration Partners
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="space-y-4 mb-6">
                  <Input
                    placeholder="Search by name, location, or specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 border-slate-200"
                  />
                  
                  <div className="flex gap-2 flex-wrap">
                    {specializations.map(spec => (
                      <button
                        key={spec}
                        onClick={() => setFilterSpecialization(spec)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                          filterSpecialization === spec
                            ? "bg-cyan-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {spec === "all" ? "All Guides" : spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guides Grid */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredGuides.map(guide => (
                    <div key={guide.id} className="bg-slate-50 rounded-xl p-4 hover:shadow-md transition">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">
                          {guide.name.includes("Priya") || guide.name.includes("Anita") || guide.name.includes("Seema") ? "👩" : "👨"}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                {guide.name}
                                {guide.verified && <span className="text-cyan-600">✓</span>}
                              </h3>
                              <p className="text-sm text-slate-600">{guide.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-amber-600">⭐ {guide.rating}</p>
                              <p className="text-xs text-slate-500">{guide.reviews} reviews</p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>🎯</span>
                              <span>{guide.specialization}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>💼</span>
                              <span>{guide.experience} • {guide.packages} packages</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>🗣️</span>
                              <span>{guide.languages.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span>💵</span>
                              <span>${guide.hourlyRate}/hour • Response: {guide.responseTime}</span>
                            </div>
                          </div>

                          <Button
                            onClick={() => {
                              setPartnerGuide(guide)
                              setShowRequestDialog(true)
                            }}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                          >
                            <span className="mr-2">🤝</span>
                            Propose Collaboration
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Collaborations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  Active Collaborations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeCollaborations.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <p className="text-4xl mb-3">📦</p>
                    <p>No active collaborations yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeCollaborations.map(collab => (
                      <div key={collab.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">{collab.packageName}</h3>
                            <p className="text-sm text-slate-600">{collab.destination} • {collab.duration}</p>
                          </div>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                            ACTIVE
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          {collab.guides.map((guide, idx) => (
                            <div key={guide.id} className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-lg">
                                {guide.name.includes("Priya") || guide.name.includes("Anita") || guide.name.includes("Seema") ? "👩" : "👨"}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{guide.name}</p>
                                <p className="text-xs text-slate-600">{guide.specialization.split(",")[0]}</p>
                              </div>
                              {idx < collab.guides.length - 1 && <span className="text-xl mx-2">+</span>}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-green-600">${collab.totalEarnings}</p>
                            <p className="text-xs text-slate-600">Total Earned</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-blue-600">{collab.bookings}</p>
                            <p className="text-xs text-slate-600">Bookings</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-amber-600">⭐ {collab.rating}</p>
                            <p className="text-xs text-slate-600">Rating</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <p className="text-lg font-bold text-purple-600">{collab.reviews}</p>
                            <p className="text-xs text-slate-600">Reviews</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Requests */}
          <div className="space-y-6">
            {/* Incoming Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📥</span>
                  Incoming Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {collaborationRequests
                    .filter(r => r.toGuide.id === currentGuide.id)
                    .map(request => (
                      <div key={request.id} className={`rounded-xl p-4 border-2 ${
                        request.status === "pending" 
                          ? "bg-orange-50 border-orange-200" 
                          : request.status === "accepted"
                          ? "bg-green-50 border-green-200"
                          : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl">
                            👨
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{request.fromGuide.name}</p>
                            <p className="text-xs text-slate-600">{request.createdAt}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            request.status === "pending"
                              ? "bg-orange-100 text-orange-700"
                              : request.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            {request.status.toUpperCase()}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 mb-2">{request.packageName}</h4>
                        
                        <div className="space-y-1 text-sm text-slate-600 mb-3">
                          <p>📍 {request.destination}</p>
                          <p>⏱️ {request.duration}</p>
                          <p>💰 ${request.proposedRate} per person</p>
                          <p>📊 Split: {request.splitRatio}</p>
                        </div>

                        {request.message && (
                          <div className="bg-white rounded-lg p-3 mb-3">
                            <p className="text-sm text-slate-700 italic">"{request.message}"</p>
                          </div>
                        )}

                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                              ✓ Accept
                            </Button>
                            <Button
                              onClick={() => handleRejectRequest(request.id)}
                              variant="outline"
                              className="flex-1"
                            >
                              ✕ Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}

                  {collaborationRequests.filter(r => r.toGuide.id === currentGuide.id).length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <p className="text-4xl mb-3">📭</p>
                      <p>No incoming requests</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sent Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📤</span>
                  Sent Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {collaborationRequests
                    .filter(r => r.fromGuide.id === currentGuide.id)
                    .map(request => (
                      <div key={request.id} className={`rounded-xl p-4 border-2 ${
                        request.status === "pending" 
                          ? "bg-blue-50 border-blue-200" 
                          : request.status === "accepted"
                          ? "bg-green-50 border-green-200"
                          : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-xl">
                            {request.toGuide.name.includes("Priya") || request.toGuide.name.includes("Anita") || request.toGuide.name.includes("Seema") ? "👩" : "👨"}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{request.toGuide.name}</p>
                            <p className="text-xs text-slate-600">{request.createdAt}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            request.status === "pending"
                              ? "bg-blue-100 text-blue-700"
                              : request.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            {request.status.toUpperCase()}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 mb-2">{request.packageName}</h4>
                        
                        <div className="space-y-1 text-sm text-slate-600">
                          <p>📍 {request.destination}</p>
                          <p>⏱️ {request.duration}</p>
                          <p>💰 ${request.proposedRate} per person</p>
                          <p>📊 Split: {request.splitRatio}</p>
                        </div>
                      </div>
                    ))}

                  {collaborationRequests.filter(r => r.fromGuide.id === currentGuide.id).length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <p className="text-4xl mb-3">📭</p>
                      <p>No sent requests</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Collaboration Request Dialog */}
        <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Propose Collaboration</DialogTitle>
            </DialogHeader>

            {partnerGuide && (
              <div className="space-y-6">
                {/* Partner Info */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border-2 border-cyan-200">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl">
                      {partnerGuide.name.includes("Priya") || partnerGuide.name.includes("Anita") || partnerGuide.name.includes("Seema") ? "👩" : "👨"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">{partnerGuide.name}</h3>
                      <p className="text-sm text-slate-600">{partnerGuide.specialization}</p>
                      <p className="text-sm text-slate-600">{partnerGuide.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-amber-600">⭐ {partnerGuide.rating}</p>
                      <p className="text-xs text-slate-500">{partnerGuide.reviews} reviews</p>
                    </div>
                  </div>
                </div>

                {/* Collaboration Preview */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🤝</span>
                    Team Preview
                  </h4>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl mx-auto mb-2">
                        👨
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{currentGuide.name}</p>
                      <p className="text-xs text-slate-600">{currentGuide.specialization.split(",")[0]}</p>
                    </div>
                    <span className="text-3xl">+</span>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-xl mx-auto mb-2">
                        {partnerGuide.name.includes("Priya") || partnerGuide.name.includes("Anita") || partnerGuide.name.includes("Seema") ? "👩" : "👨"}
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{partnerGuide.name}</p>
                      <p className="text-xs text-slate-600">{partnerGuide.specialization.split(",")[0]}</p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Package Name *
                    </label>
                    <Input
                      placeholder="e.g., Ultimate Himalayan Adventure"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="border-2 border-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Destination *
                      </label>
                      <Input
                        placeholder="e.g., Everest Region"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="border-2 border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Duration *
                      </label>
                      <Input
                        placeholder="e.g., 10 days"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border-2 border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Proposed Rate (per person) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">$</span>
                        <Input
                          type="number"
                          placeholder="150"
                          value={proposedRate}
                          onChange={(e) => setProposedRate(e.target.value)}
                          className="border-2 border-slate-200 pl-7"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Combined rate: ${currentGuide.hourlyRate} + ${partnerGuide.hourlyRate} = ${currentGuide.hourlyRate + partnerGuide.hourlyRate}/hour
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Revenue Split
                      </label>
                      <select
                        value={splitRatio}
                        onChange={(e) => setSplitRatio(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg"
                      >
                        <option value="50/50">50/50 (Equal Split)</option>
                        <option value="60/40">60/40 (You get 60%)</option>
                        <option value="40/60">40/60 (You get 40%)</option>
                        <option value="70/30">70/30 (You get 70%)</option>
                        <option value="30/70">30/70 (You get 30%)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Message to {partnerGuide.name}
                    </label>
                    <textarea
                      placeholder="Explain why you'd like to collaborate and what you can bring to the partnership..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Benefits Preview */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                  <h4 className="font-bold text-green-900 mb-3">Collaboration Benefits</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <p className="text-sm text-green-800">Share workload & expertise</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <p className="text-sm text-green-800">Reach larger groups</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <p className="text-sm text-green-800">Enhanced safety & support</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <p className="text-sm text-green-800">Better customer experience</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowRequestDialog(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendRequest}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  >
                    <span className="mr-2">📤</span>
                    Send Request
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Collaboration Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-slate-900 mb-2">Choose Complementary Skills</h4>
                <p className="text-sm text-slate-600">
                  Partner with guides who have different specializations to offer more comprehensive packages.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-slate-900 mb-2">Clear Communication</h4>
                <p className="text-sm text-slate-600">
                  Discuss responsibilities, revenue splits, and customer handling upfront to avoid conflicts.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-slate-900 mb-2">Build Long-term Partnerships</h4>
                <p className="text-sm text-slate-600">
                  Successful collaborations can lead to steady income and mutual growth in the industry.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}