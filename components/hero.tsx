"use client"

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"

// Extend Window interface for klouds
declare global {
  interface Window {
    klouds?: {
      create: (options: {
        selector: string
        speed?: number
        layerCount?: number
        cloudColor1?: string
        cloudColor2?: string
        bgColor?: string
      }) => any
    }
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const images = [
    '/iamge/2.png',
    '/iamge/3.png',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsTransitioning(false)
      }, 500) // Half of transition duration for crossfade effect
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/klouds@2.1.1/lib/klouds.min.js'
    script.async = false
    
    script.onload = () => {
      console.log('Klouds loaded')
      if (canvasRef.current && window.klouds) {
        try {
          const cloudInstance = window.klouds.create({
            selector: '#cloudsCanvas',
            speed: 1,
            layerCount: 5,
            cloudColor1: '#ffffff',
            cloudColor2: '#e0f2fe',
            bgColor: '#6cdcf8ff'
          })
          console.log('Clouds initialized:', cloudInstance)
        } catch (error) {
          console.error('Error initializing clouds:', error)
        }
      }
    }
    
    script.onerror = () => {
      console.error('Failed to load klouds library')
    }
    
    document.body.appendChild(script)
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="relative overflow-hidden text-white">
      {/* Canvas Container with explicit dimensions */}
      <div className="absolute inset-0" style={{ width: '100%', height: '100vh', zIndex: 0 }}>
        <canvas 
          id="cloudsCanvas"
          ref={canvasRef}
          style={{ 
            width: '100%',
            height: '100%',
            display: 'block',
            transition:'fade'
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30" style={{ zIndex: 1 }}></div>

      {/* Content */}
      <div className="relative py-20 px-6 md:px-12 min-h-screen flex items-center" style={{ zIndex: 3 }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <h1 className="text-5xl md:text-6xl text-cyan-900 font-bold mb-6 leading-tight drop-shadow-lg">
              Travel With Verified Local Guides
            </h1>
            <p className="text-xl text-cyan-800 mb-8 max-w-lg ">
              Skip the tourist traps. Book verified local guides directly and experience authentic destinations tailored
              to your interests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/packages"
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition text-center shadow-lg"
              >
                Find a Guide
              </Link>
              <Link
                href="/guide-verification"
                className="px-8 py-3 border-2 border-white text-cyan-800 rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition text-center shadow-lg backdrop-blur-sm"
              >
                Become a Guide
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 ">
              <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                <p className="text-3xl text-gray-500 font-bold drop-shadow-lg">50K+</p>
                <p className="text-cyan-800 drop-shadow">Verified Guides</p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                <p className="text-3xl text-gray-500 font-bold drop-shadow-lg">100K+</p>
                <p className="text-cyan-800 drop-shadow">Trips Completed</p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 p-4 rounded-lg">
                <p className="text-3xl text-gray-500 font-bold drop-shadow-lg">4.9★</p>
                <p className="text-cyan-800 drop-shadow">Avg Rating</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={images[currentImageIndex]} 
              alt="Travel adventure" 
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              key={currentImageIndex}
            />
          </div>
        </div>
      </div>
    </section>
  )
}