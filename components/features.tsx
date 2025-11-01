"use client"

const features = [
  {
    icon: "🛡️",
    title: "Verified Guides",
    description: "All guides are verified and reviewed by real travelers",
  },
  {
    icon: "💰",
    title: "Direct Booking",
    description: "No middlemen - book directly and save money",
  },
  {
    icon: "👥",
    title: "Negotiate Prices",
    description: "Chat with guides and negotiate custom package prices",
  },
  {
    icon: "🗺️",
    title: "Street View",
    description: "Preview locations with Google Street View before booking",
  },
]

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">Why Choose LocalGuide?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-lg bg-cyan-200 flex items-center justify-center mb-4 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
