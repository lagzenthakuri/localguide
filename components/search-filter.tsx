"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, DollarSign, Calendar } from "lucide-react"

interface SearchFilterProps {
  onSearch: (filters: SearchFilters) => void
}

export interface SearchFilters {
  destination: string
  maxPrice: number
  duration: string
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [destination, setDestination] = useState("")
  const [maxPrice, setMaxPrice] = useState(500)
  const [duration, setDuration] = useState("")

  const handleSearch = () => {
    onSearch({ destination, maxPrice, duration })
  }

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-muted-light p-6 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <MapPin size={16} className="text-(--color-primary)" />
            Destination
          </label>
          <Input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border-2 border-muted-light rounded-lg"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <DollarSign size={16} className="text-(--color-accent)" />
            Max Price
          </label>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border-2 border-muted-light rounded-lg"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Calendar size={16} className="text-(--color-primary)" />
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 border-2 border-muted-light rounded-lg text-foreground bg-white"
          >
            <option value="">Any</option>
            <option value="short">Under 4 hours</option>
            <option value="medium">4-8 hours</option>
            <option value="long">Full day</option>
            <option value="multi">Multi-day</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white font-semibold py-2 rounded-lg transition"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
