import type React from "react"

export const metadata = {
  title: "Book Your Tour - LocalGuide",
  description: "Complete your tour booking with our secure checkout",
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
