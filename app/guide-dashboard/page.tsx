"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import GuideNavigation from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  touristRating?: number
}

interface CustomPackageOffer {
  id: number
  touristName: string
  touristImage: string
  noOfGuides: number
  days: number
  budgetRange: string
  places: string[]
  foodPreference: string[]
  transportationMode: string[]
  tripType: string[]
  insurance: boolean
  specialRequests: string
  status: "new" | "bidding" | "accepted" | "rejected"
  createdAt: string
}

const MOCK_REQUESTS: BookingRequest[] = [
  {
    id: 1,
    touristName: "Sarah Johnson",
    touristImage: "/helpful-guide.png",
    packageName: "Taj Mahal Sunrise Tour",
    date: "2024-12-15",
    time: "05:00 AM",
    guests: 2,
    price: 170,
    status: "pending",
    specialRequests: "We'd like to visit the backside of the Taj Mahal for photography",
  },
  {
    id: 2,
    touristName: "Michael Chen",
    touristImage: "/helpful-guide.png",
    packageName: "Complete Agra Experience",
    date: "2024-12-16",
    time: "09:00 AM",
    guests: 3,
    price: 435,
    status: "accepted",
    specialRequests: "Gluten-free meal required",
  },
]

const MOCK_CUSTOM_OFFERS: CustomPackageOffer[] = [
  {
    id: 1,
    touristName: "Sarah Johnson",
    touristImage: "/helpful-guide.png",
    noOfGuides: 2,
    days: 5,
    budgetRange: "$1000-$2000",
    places: ["Everest Base Camp", "Kathmandu"],
    foodPreference: ["Provided by us", "Vegetarian"],
    transportationMode: ["Flight", "Trekking only"],
    tripType: ["Adventure", "Cultural"],
    insurance: true,
    specialRequests: "Need experienced trekking guides with emergency medical training",
    status: "new",
    createdAt: "2 mins ago",
  },
  {
    id: 2,
    touristName: "David Lee",
    touristImage: "/helpful-guide.png",
    noOfGuides: 1,
    days: 3,
    budgetRange: "$500-$1000",
    places: ["Pokhara", "Nagarkot"],
    foodPreference: ["Self-arranged", "Non-vegetarian"],
    transportationMode: ["Car"],
    tripType: ["Relaxation", "Cultural"],
    insurance: false,
    specialRequests: "Photography focused tour",
    status: "new",
    createdAt: "1 hour ago",
  },
]

export default function GuideDashboard() {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const [requests, setRequests] = useState<BookingRequest[]>(MOCK_REQUESTS)
  const [customOffers, setCustomOffers] = useState<CustomPackageOffer[]>(MOCK_CUSTOM_OFFERS)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null)
  const [selectedOffer, setSelectedOffer] = useState<CustomPackageOffer | null>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [bidMessage, setBidMessage] = useState("")
  const [showNewOfferAlert, setShowNewOfferAlert] = useState(true)

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/auth")
    }
  }, [sessionStatus, router])

  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (sessionStatus === "unauthenticated") {
    return null
  }

  const stats = {
    totalEarnings: 3450,
    completedTours: 24,
    averageRating: 4.8,
    upcomingTours: 5,
    thisMonthEarnings: 1280,
    acceptanceRate: 92,
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
    setSelectedOffer(null)
    alert(`Bid submitted successfully for $${bidAmount}!`)
  }

  const handleAcceptOffer = (offerId: number) => {
    setCustomOffers(customOffers.map(offer => 
      offer.id === offerId ? { ...offer, status: "accepted" as const } : offer
    ))
  }

  const handleRejectOffer = (offerId: number) => {
    setCustomOffers(customOffers.filter(offer => offer.id !== offerId))
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const acceptedRequests = requests.filter((r) => r.status === "accepted")
  const newCustomOffers = customOffers.filter((o) => o.status === "new")

  return (
    <main className="min-h-screen bg-slate-50">
      <GuideNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* New Offers Alert */}
        {newCustomOffers.length > 0 && showNewOfferAlert && (
          <Alert className="mb-6 border-2 border-cyan-500 bg-cyan-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <AlertTitle className="text-cyan-900 font-bold">
                    New Custom Package Offers Available!
                  </AlertTitle>
                  <AlertDescription className="text-cyan-800 flex">
                    You have {newCustomOffers.length} new custom package request(s). Click to view and submit your bid.
                  </AlertDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setSelectedTab("custom-offers")}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  View Offers
                </Button>
                <button
                  onClick={() => setShowNewOfferAlert(false)}
                  className="text-cyan-600 hover:text-cyan-700 p-2"
                >
                  ✕
                </button>
              </div>
            </div>
          </Alert>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Guide Dashboard</h1>
          <p className="text-slate-600">Welcome back, {session?.user?.name || "Guide"}! Manage your bookings and requests</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Earnings</p>
                  <p className="text-3xl font-bold text-slate-900">${stats.totalEarnings}</p>
                </div>
                <span className="text-3xl opacity-20">💰</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Completed Tours</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.completedTours}</p>
                </div>
                <span className="text-3xl opacity-20">✅</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Average Rating</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.averageRating}</p>
                </div>
                <span className="text-3xl opacity-20">🏆</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Custom Offers</p>
                  <p className="text-3xl font-bold text-slate-900">{newCustomOffers.length}</p>
                </div>
                <span className="text-3xl opacity-20">🎯</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 lg:w-2/3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">
              Requests{" "}
              <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                {pendingRequests.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="custom-offers">
              Custom Offers
              {newCustomOffers.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-cyan-100 text-cyan-800 text-xs rounded-full">
                  {newCustomOffers.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Earnings</span>
                      <span className="font-bold text-slate-900">${stats.thisMonthEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tours Completed</span>
                      <span className="font-bold text-slate-900">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Acceptance Rate</span>
                      <span className="font-bold text-slate-900">{stats.acceptanceRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tour Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-slate-900">Tomorrow</p>
                      <p className="text-xs text-slate-600 mt-1">Taj Mahal Sunrise Tour - 2 guests</p>
                      <p className="text-xs text-slate-600">$170</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-slate-900">Dec 16, 2024</p>
                      <p className="text-xs text-slate-600 mt-1">Complete Agra Experience - 3 guests</p>
                      <p className="text-xs text-slate-600">$435</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 text-xl">
                      🎯
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">New Custom Package Request</p>
                      <p className="text-xs text-slate-600">Sarah Johnson requested a 5-day Everest Base Camp trek</p>
                      <p className="text-xs text-slate-600 mt-1">2 mins ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-xl">
                      ⏰
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">Booking Accepted</p>
                      <p className="text-xs text-slate-600">You accepted Michael Chen's booking</p>
                      <p className="text-xs text-slate-600 mt-1">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-xl">
                      💬
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">New Message</p>
                      <p className="text-xs text-slate-600">Sarah Johnson sent you a message</p>
                      <p className="text-xs text-slate-600 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <span className="text-5xl">✅</span>
                  <p className="text-slate-600 mt-4">No pending requests</p>
                </CardContent>
              </Card>
            ) : (
              pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={request.touristImage || "/placeholder.svg"}
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
                        📅<span>{request.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        ⏰<span>{request.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        👥<span>{request.guests} guests</span>
                      </div>
                    </div>

                    {request.specialRequests && (
                      <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                        <p className="text-xs font-semibold text-yellow-800 mb-1">Special Requests</p>
                        <p className="text-sm text-yellow-900">{request.specialRequests}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        👍 Accept
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request.id)}
                        variant="outline"
                        className="flex-1 bg-transparent"
                      >
                        Decline
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-3 bg-transparent"
                            onClick={() => setSelectedRequest(request)}
                          >
                            💬
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Message {request.touristName}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <textarea
                              placeholder="Type your message..."
                              rows={4}
                              className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg"
                            />
                            <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">Send</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Custom Offers Tab */}
          <TabsContent value="custom-offers" className="space-y-4">
            {customOffers.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <span className="text-5xl">📦</span>
                  <p className="text-slate-600 mt-4">No custom package offers yet</p>
                </CardContent>
              </Card>
            ) : (
              customOffers.map((offer) => (
                <Card key={offer.id} className={offer.status === "new" ? "border-2 border-cyan-500" : ""}>
                  <CardContent className="pt-6">
                    {offer.status === "new" && (
                      <div className="mb-4 px-3 py-2 bg-cyan-100 text-cyan-800 rounded-lg flex items-center gap-2 font-semibold">
                        <span className="text-lg">✨</span>
                        NEW OFFER - Submit your bid!
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={offer.touristImage || "/placeholder.svg"}
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
                          <span className="text-slate-600">{offer.noOfGuides} Guide(s) needed</span>
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

                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-1">Trip Type</p>
                        <div className="flex flex-wrap gap-2">
                          {offer.tripType.map((type) => (
                            <span key={type} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-1">Transportation</p>
                        <div className="flex flex-wrap gap-2">
                          {offer.transportationMode.map((mode) => (
                            <span key={mode} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {mode}
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                              onClick={() => setSelectedOffer(offer)}
                            >
                              💰 Submit Bid
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Submit Your Bid</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-slate-600 mb-4">
                                  Tourist's Budget: <span className="font-bold text-slate-900">{offer.budgetRange}</span>
                                </p>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                  Your Bid Amount ($)
                                </label>
                                <Input
                                  type="number"
                                  placeholder="Enter your bid amount"
                                  value={bidAmount}
                                  onChange={(e) => setBidAmount(e.target.value)}
                                  className="border-2 border-slate-200"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
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

                              <Button
                                onClick={() => handleSubmitBid(offer.id)}
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                              >
                                Submit Bid
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() => handleRejectOffer(offer.id)}
                          variant="outline"
                          className="px-6 bg-transparent"
                        >
                          Decline
                        </Button>
                      </div>
                    )}

                    {offer.status === "bidding" && (
                      <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
                        <p className="text-sm font-semibold text-blue-900">⏳ Bid Submitted - Waiting for tourist response</p>
                      </div>
                    )}

                    {offer.status === "accepted" && (
                      <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                        <p className="text-sm font-semibold text-green-900">✅ Offer Accepted - Check your bookings</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">⏳ Upcoming</h3>
              {acceptedRequests.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-slate-600">No upcoming bookings</CardContent>
                </Card>
              ) : (
                acceptedRequests.map((request) => (
                  <Card key={request.id} className="mb-3">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={request.touristImage || "/placeholder.svg"}
                            alt={request.touristName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">{request.touristName}</p>
                            <p className="text-sm text-slate-600">{request.packageName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600">
                            {request.date} at {request.time}
                          </p>
                          <p className="font-bold text-cyan-600">${request.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="pb-4 border-b border-slate-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">Great experience</p>
                        <p className="text-xs text-slate-600">Emma Wilson • 2 hours ago</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} className="text-lg">
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      Excellent guide! Very knowledgeable and professional. Made our tour unforgettable!
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}