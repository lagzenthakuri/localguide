"use client"

import { useState, useRef, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Send, Phone, Video, Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: number
  sender: "user" | "guide"
  type: "text" | "offer" | "counter-offer"
  content: string
  timestamp: string
  offerDetails?: {
    originalPrice: number
    offeredPrice: number
    service: string
  }
}

interface BargainingOffer {
  id: number
  type: "offer" | "counter-offer"
  from: string
  originalPrice: number
  proposedPrice: number
  message: string
  status: "pending" | "accepted" | "rejected"
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "guide",
      type: "text",
      content: "Hello! I'm Rajesh. I'd love to help you explore Agra. How can I assist you today?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      type: "text",
      content: "Hi Rajesh! I'm interested in a private Taj Mahal tour. What's your availability next week?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "guide",
      type: "text",
      content:
        "Great! I'm available Monday through Friday next week. The Taj Mahal Sunrise Tour is $85 for 4 hours. When would you prefer?",
      timestamp: "10:35 AM",
    },
  ])

  const [bargainingOffers, setBargainingOffers] = useState<BargainingOffer[]>([
    {
      id: 1,
      type: "offer",
      from: "user",
      originalPrice: 85,
      proposedPrice: 70,
      message: "Can you offer a discount for a 4-hour tour?",
      status: "pending",
      timestamp: "10:45 AM",
    },
  ])

  const [messageInput, setMessageInput] = useState("")
  const [offerAmount, setOfferAmount] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      type: "text",
      content: messageInput,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessageInput("")

    // Simulate guide response
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        sender: "guide",
        type: "text",
        content: "Thanks for your message! Let me think about that.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const handleMakeOffer = () => {
    if (!offerAmount.trim()) return

    const newOffer: BargainingOffer = {
      id: bargainingOffers.length + 1,
      type: "counter-offer",
      from: "user",
      originalPrice: 85,
      proposedPrice: Number.parseInt(offerAmount),
      message: `I'd like to propose $${offerAmount} for the tour.`,
      status: "pending",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setBargainingOffers([...bargainingOffers, newOffer])

    const offerMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      type: "counter-offer",
      content: `I'd like to propose $${offerAmount} for the tour.`,
      timestamp: newOffer.timestamp,
      offerDetails: {
        originalPrice: 85,
        offeredPrice: Number.parseInt(offerAmount),
        service: "Taj Mahal Sunrise Tour",
      },
    }

    setMessages([...messages, offerMessage])
    setOfferAmount("")
  }

  const handleAcceptOffer = (offerId: number) => {
    setBargainingOffers(
      bargainingOffers.map((offer) => (offer.id === offerId ? { ...offer, status: "accepted" } : offer)),
    )

    const acceptMessage: Message = {
      id: messages.length + 1,
      sender: "guide",
      type: "text",
      content: "Perfect! I accept your offer. Let's move forward with the booking.",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, acceptMessage])
  }

  const handleRejectOffer = (offerId: number) => {
    setBargainingOffers(
      bargainingOffers.map((offer) => (offer.id === offerId ? { ...offer, status: "rejected" } : offer)),
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border-2 border-muted-light overflow-hidden shadow-lg flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-muted-light p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/male-guide.jpg" alt="Rajesh" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h2 className="font-bold text-foreground">Rajesh Kumar</h2>
                <p className="text-xs text-muted">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-lg transition">
                <Phone size={20} className="text-primary" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition">
                <Video size={20} className="text-primary" />
              </button>
              <button className="p-2 hover:bg-white rounded-lg transition">
                <Info size={20} className="text-primary" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-muted-light">
              <TabsTrigger
                value="chat"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="bargaining"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Offers ({bargainingOffers.length})
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "offer" || message.type === "counter-offer" ? (
                      <div
                        className={`max-w-xs p-4 rounded-2xl border-2 ${
                          message.sender === "user"
                            ? "bg-primary text-white border-primary"
                            : "bg-muted-light text-foreground border-muted-light"
                        }`}
                      >
                        <div className="font-semibold mb-2">{message.offerDetails?.service}</div>
                        <div className="mb-2">
                          <div className="text-sm opacity-90">Original: ${message.offerDetails?.originalPrice}</div>
                          <div className="text-lg font-bold">Offer: ${message.offerDetails?.offeredPrice}</div>
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-2 opacity-75">{message.timestamp}</p>
                      </div>
                    ) : (
                      <div
                        className={`max-w-xs p-4 rounded-2xl ${
                          message.sender === "user" ? "bg-primary text-white" : "bg-muted-light text-foreground"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-2 opacity-75">{message.timestamp}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t-2 border-muted-light p-4 bg-white">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSendMessage()
                    }}
                    className="flex-1 border-2 border-muted-light rounded-lg"
                  />
                  <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary-dark text-white px-4">
                    <Send size={20} />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Bargaining Tab */}
            <TabsContent value="bargaining" className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {bargainingOffers.map((offer) => (
                  <Card key={offer.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-semibold text-muted uppercase">
                            {offer.type === "offer" ? "Your Offer" : "Counter Offer"}
                          </span>
                          <p className="text-xs text-muted mt-1">{offer.timestamp}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                            offer.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : offer.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {offer.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-primary p-3 rounded mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">Price Details</p>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted">Original:</span>
                          <span className="line-through text-muted">${offer.originalPrice}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-foreground">Proposed:</span>
                          <span className="text-primary">${offer.proposedPrice}</span>
                        </div>
                        <p className="text-xs text-green-700 mt-2">
                          Savings: ${offer.originalPrice - offer.proposedPrice}
                        </p>
                      </div>

                      <p className="text-sm text-foreground mb-4">{offer.message}</p>

                      {offer.status === "pending" && offer.from === "user" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleRejectOffer(offer.id)}
                          >
                            Withdraw
                          </Button>
                          <Button size="sm" className="flex-1 bg-primary hover:bg-primary-dark text-white">
                            Edit Offer
                          </Button>
                        </div>
                      )}

                      {offer.status === "pending" && offer.from === "guide" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleRejectOffer(offer.id)}
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleAcceptOffer(offer.id)}
                          >
                            Accept
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Make Offer Section */}
              <div className="border-t-2 border-muted-light p-4 bg-white">
                <p className="text-sm font-semibold text-foreground mb-3">Make a Counter Offer</p>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-2.5 text-foreground font-semibold">$</span>
                    <Input
                      type="number"
                      placeholder="Enter your price"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleMakeOffer()
                      }}
                      className="pl-8 flex-1 border-2 border-muted-light rounded-lg"
                    />
                  </div>
                  <Button onClick={handleMakeOffer} className="bg-primary hover:bg-primary-dark text-white px-4">
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
