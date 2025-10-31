"use client"

import Link from "next/link"
import { Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ChatConversation {
  id: number
  guideId: number
  guideName: string
  guideImage: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

const MOCK_CONVERSATIONS: ChatConversation[] = [
  {
    id: 1,
    guideId: 1,
    guideName: "Rajesh Kumar",
    guideImage: "/male-guide.jpg",
    lastMessage: "Great! I'm available Monday through Friday next week.",
    timestamp: "10:35 AM",
    unread: true,
  },
  {
    id: 2,
    guideId: 2,
    guideName: "Priya Singh",
    guideImage: "/female-guide.jpg",
    lastMessage: "Let me know your preferred dates and I'll check availability.",
    timestamp: "Yesterday",
    unread: false,
  },
]

export default function ChatList() {
  return (
    <div className="bg-white rounded-2xl border-2 border-muted-light overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-muted-light p-4">
        <h2 className="text-xl font-bold text-foreground mb-4">Messages</h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-muted" size={20} />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-10 border-2 border-muted-light rounded-lg"
          />
        </div>

        <Button className="w-full bg-primary hover:bg-primary-dark text-white">
          <Plus size={20} className="mr-2" />
          New Message
        </Button>
      </div>

      {/* Conversations List */}
      <div className="divide-y divide-muted-light">
        {MOCK_CONVERSATIONS.map((conversation) => (
          <Link key={conversation.id} href={`/chat/${conversation.id}`}>
            <div className="p-4 hover:bg-muted-light transition cursor-pointer">
              <div className="flex items-center gap-4">
                <img
                  src={conversation.guideImage || "/placeholder.svg"}
                  alt={conversation.guideName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-semibold text-foreground ${conversation.unread ? "font-bold" : ""}`}>
                      {conversation.guideName}
                    </h3>
                    <span className="text-xs text-muted">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
