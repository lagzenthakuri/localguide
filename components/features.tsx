"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

// Features Component
function Features() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">
          Why Choose LocalGuide?
        </h2>

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

// Gallery Component
function Gallery() {
  const images = [
    '/sherpa-guide.jpg',
    '/iamge/2.png',
    '/iamge/3.png',
    '/iamge/1.png',
    '/iamge/2.png',
    '/pokhara2.jpg',
    '/sherpa-guide.jpg',

  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
          Explore Destinations
        </h2>
        <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Discover stunning locations and experiences curated by our local guides
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="gallery-swiper"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                <img
                  src={image}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">Destination {idx + 1}</h3>
                    <p className="text-sm">Explore with local guides</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .gallery-swiper {
          padding-bottom: 50px;
        }
        
        .gallery-swiper :global(.swiper-pagination-bullet) {
          background: #0891b2;
          opacity: 0.5;
        }
        
        .gallery-swiper :global(.swiper-pagination-bullet-active) {
          opacity: 1;
        }
        
        .gallery-swiper :global(.swiper-button-next),
        .gallery-swiper :global(.swiper-button-prev) {
          color: #0891b2;
        }
      `}</style>
    </section>
  )
}

// Main Component combining both
export default function FeaturesAndGallery() {
  return (
    <>
      <Features />
      <Gallery />
    </>
  )
}