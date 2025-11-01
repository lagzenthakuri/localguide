"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Destination {
     src: string | undefined;
     id: number;
     name: string;
     country: string;
     image: string;
     rating: number;
     reviews: number;
     description: string;
     bestTimeToVisit: string;
     duration: string;
     distance: string;
     elevation?: string;
     highlights: string[];
     gallery: string[];
     guides: Array<{
          id: number;
          name: string;
          image: string;
          rating: number;
          packageCount: number;
          priceFrom: number;
     }>;
     hotels: Array<{
          name: string;
          rating: number;
          pricePerNight: string;
     }>;
     attractions: Array<{
          name: string;
          distance: string;
          description: string;
     }>;
     tips: string[];
     coordinates: { lat: number; lng: number };
}

export default function ClientDestinationContent({
     destination,
}: {
     destination: Destination;
}) {
     const [isFavorite, setIsFavorite] = useState(false);
     const [activeTab, setActiveTab] = useState("overview");

     return (
          <div className="bg-gray-50 min-h-screen">
               {/* Hero Section */}
               <div className="relative h-[500px] overflow-hidden">
                    <img
                         src={
                              destination.image ||
                              "/placeholder.svg?height=500&width=1600&query=destination"
                         }
                         alt={destination.name}
                         className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="flex items-end justify-between">
                                   <div>
                                        <h1 className="text-6xl font-bold mb-3 tracking-tight">
                                             {destination.name}
                                        </h1>
                                        <div className="flex items-center gap-6 text-base">
                                             <div className="flex items-center gap-2">
                                                  <span className="text-xl">📍</span>
                                                  <span className="font-medium">
                                                       {destination.country}
                                                  </span>
                                             </div>
                                             <div className="flex items-center gap-2">
                                                  <span className="text-xl">⭐</span>
                                                  <span className="font-medium">
                                                       {destination.rating} ({destination.reviews} reviews)
                                                  </span>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="flex gap-3">
                                        <button
                                             onClick={() =>
                                                  setIsFavorite(!isFavorite)
                                             }
                                             className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white transition-all shadow-lg"
                                        >
                                             <span
                                                  className={
                                                       isFavorite
                                                            ? "text-red-500 text-2xl"
                                                            : "text-gray-600 text-2xl"
                                                  }
                                             >
                                                  {isFavorite ? "♥" : "♡"}
                                             </span>
                                        </button>
                                        <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white transition-all shadow-lg">
                                             <span className="text-xl">↗</span>
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Quick Info */}
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 -mt-16 relative z-10">
                         <Card className="border-0 shadow-lg">
                              <CardContent className="pt-6 pb-6">
                                   <div className="text-center">
                                        <p className="text-3xl mb-3">⏱️</p>
                                        <p className="text-base text-gray-900 font-bold mb-1">
                                             {destination.duration}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                             Duration
                                        </p>
                                   </div>
                              </CardContent>
                         </Card>
                         <Card className="border-0 shadow-lg">
                              <CardContent className="pt-6 pb-6">
                                   <div className="text-center">
                                        <p className="text-3xl mb-3">📅</p>
                                        <p className="text-base text-gray-900 font-bold mb-1">
                                             {destination.bestTimeToVisit}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                             Best Time
                                        </p>
                                   </div>
                              </CardContent>
                         </Card>
                         <Card className="border-0 shadow-lg">
                              <CardContent className="pt-6 pb-6">
                                   <div className="text-center">
                                        <p className="text-3xl mb-3">🗺️</p>
                                        <p className="text-base text-gray-900 font-bold mb-1">
                                             {destination.distance}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                             Distance
                                        </p>
                                   </div>
                              </CardContent>
                         </Card>
                         <Card className="border-0 shadow-lg">
                              <CardContent className="pt-6 pb-6">
                                   <div className="text-center">
                                        <p className="text-3xl mb-3">⛰️</p>
                                        <p className="text-base text-gray-900 font-bold mb-1">
                                             {destination.elevation}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                             Elevation
                                        </p>
                                   </div>
                              </CardContent>
                         </Card>
                    </div>

                    {/* Tabs */}
                    <Tabs
                         value={activeTab}
                         onValueChange={setActiveTab}
                         className="w-full"
                    >
                         <TabsList className="grid w-full grid-cols-5 mb-8 bg-white border-0 shadow-md h-12">
                              <TabsTrigger value="overview" className="font-semibold">
                                   Overview
                              </TabsTrigger>
                              <TabsTrigger value="gallery" className="font-semibold">
                                   Gallery
                              </TabsTrigger>
                              <TabsTrigger value="guides" className="font-semibold">
                                   Guides
                              </TabsTrigger>
                              <TabsTrigger value="attractions" className="font-semibold">
                                   Nearby
                              </TabsTrigger>
                              <TabsTrigger value="tips" className="font-semibold">
                                   Tips
                              </TabsTrigger>
                         </TabsList>

                         {/* Overview Tab */}
                         <TabsContent value="overview" className="space-y-6">
                              <Card className="border-0 shadow-md">
                                   <CardHeader className="pb-4">
                                        <CardTitle className="text-2xl font-bold">About This Destination</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                        <p className="text-gray-700 leading-relaxed mb-8 text-base">
                                             {destination.description}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                             <div>
                                                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                                                       Highlights
                                                  </h4>
                                                  <ul className="space-y-3">
                                                       {destination.highlights.map(
                                                            (highlight, idx) => (
                                                                 <li
                                                                      key={idx}
                                                                      className="flex items-start gap-3 text-gray-700"
                                                                 >
                                                                      <span className="text-cyan-600 font-bold mt-1">
                                                                           •
                                                                      </span>
                                                                      <span className="text-base">
                                                                           {highlight}
                                                                      </span>
                                                                 </li>
                                                            )
                                                       )}
                                                  </ul>
                                             </div>

                                             <div>
                                                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                                                       Accommodations
                                                  </h4>
                                                  <div className="space-y-3">
                                                       {destination.hotels.map(
                                                            (hotel, idx) => (
                                                                 <div
                                                                      key={idx}
                                                                      className="pb-3 border-b border-gray-200 last:border-0"
                                                                 >
                                                                      <p className="font-bold text-gray-900 text-base mb-1">
                                                                           {hotel.name}
                                                                      </p>
                                                                      <div className="flex items-center justify-between">
                                                                           <div className="flex gap-1">
                                                                                {Array.from(
                                                                                     {
                                                                                          length: Math.floor(
                                                                                               hotel.rating
                                                                                          ),
                                                                                     }
                                                                                ).map(
                                                                                     (_, i) => (
                                                                                          <span
                                                                                               key={i}
                                                                                               className="text-yellow-400 text-lg"
                                                                                          >
                                                                                               ★
                                                                                          </span>
                                                                                     )
                                                                                )}
                                                                           </div>
                                                                           <p className="text-sm text-cyan-600 font-bold">
                                                                                {hotel.pricePerNight}
                                                                           </p>
                                                                      </div>
                                                                 </div>
                                                            )
                                                       )}
                                                  </div>
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>
                         </TabsContent>

                         {/* Gallery Tab */}
                         <TabsContent value="gallery" className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                   {destination.gallery.map((img, idx) => (
                                        <div
                                             key={idx}
                                             className="aspect-square rounded-xl overflow-hidden cursor-pointer group border-0 shadow-md"
                                        >
                                             <img
                                                  src={
                                                       img ||
                                                       "/placeholder.svg?height=300&width=300&query=destination"
                                                  }
                                                  alt={`Gallery ${idx}`}
                                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                             />
                                        </div>
                                   ))}
                              </div>

                              <Card className="border-0 shadow-md">
                                   <CardContent className="pt-8 pb-8 text-center">
                                        <p className="text-3xl mb-4">🖼️</p>
                                        <p className="text-gray-700 text-base">
                                             View Street View below to explore
                                             the area in 360°
                                        </p>
                                   </CardContent>
                              </Card>
                         </TabsContent>
                         
                         {/* Guides Tab */}
                         <TabsContent value="guides" className="space-y-4">
                              {destination.guides.map((guide) => (
                                   <Card key={guide.id} className="border-0 shadow-md">
                                        <CardContent className="pt-6 pb-6">
                                             <div className="flex items-start justify-between">
                                                  <div className="flex items-start gap-4">
                                                       <img
                                                            src={
                                                                 guide.image ||
                                                                 "/placeholder.svg?height=60&width=60&query=guide"
                                                            }
                                                            alt={guide.name}
                                                            className="w-16 h-16 rounded-full shadow-md"
                                                       />
                                                       <div>
                                                            <h3 className="text-lg font-bold text-gray-900">
                                                                 {guide.name}
                                                            </h3>
                                                            <div className="flex items-center gap-2 my-2">
                                                                 <div className="flex gap-1">
                                                                      {Array.from(
                                                                           {
                                                                                length: Math.floor(
                                                                                     guide.rating
                                                                                ),
                                                                           }
                                                                      ).map(
                                                                           (_, i) => (
                                                                                <span
                                                                                     key={i}
                                                                                     className="text-yellow-400 text-lg"
                                                                                >
                                                                                     ★
                                                                                </span>
                                                                           )
                                                                      )}
                                                                 </div>
                                                                 <span className="text-sm text-gray-700 font-semibold">
                                                                      {guide.rating}
                                                                 </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600">
                                                                 {guide.packageCount} packages available
                                                            </p>
                                                       </div>
                                                  </div>
                                                  <div className="text-right">
                                                       <p className="text-3xl font-bold text-cyan-600 mb-2">
                                                            ${guide.priceFrom}
                                                       </p>
                                                       <Button
                                                            size="sm"
                                                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-md"
                                                       >
                                                            View Profile
                                                       </Button>
                                                  </div>
                                             </div>
                                        </CardContent>
                                   </Card>
                              ))}
                         </TabsContent>

                         {/* Attractions Tab */}
                         <TabsContent value="attractions" className="space-y-4">
                              {destination.attractions.map(
                                   (attraction, idx) => (
                                        <Card key={idx} className="border-0 shadow-md">
                                             <CardContent className="pt-6 pb-6">
                                                  <div className="flex items-start justify-between">
                                                       <div>
                                                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                                 {attraction.name}
                                                            </h3>
                                                            <p className="text-base text-gray-700 mb-2">
                                                                 {attraction.description}
                                                            </p>
                                                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                                                 <span className="text-base">📍</span>
                                                                 {attraction.distance}
                                                            </p>
                                                       </div>
                                                       <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 font-semibold"
                                                       >
                                                            View
                                                       </Button>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   )
                              )}
                         </TabsContent>

                         {/* Tips Tab */}
                         <TabsContent value="tips" className="space-y-4">
                              {destination.tips.map((tip, idx) => (
                                   <Card key={idx} className="border-0 shadow-md">
                                        <CardContent className="pt-6 pb-6">
                                             <div className="flex items-start gap-4">
                                                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-md">
                                                       {idx + 1}
                                                  </div>
                                                  <p className="text-gray-700 leading-relaxed text-base">
                                                       {tip}
                                                  </p>
                                             </div>
                                        </CardContent>
                                   </Card>
                              ))}
                         </TabsContent>
                    </Tabs>

                    {/* Street View Section */}
                    <Card className="mt-8 border-0 shadow-md">
                         <CardHeader>
                              <CardTitle className="text-2xl font-bold">Explore Street View</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <iframe
                                   src={destination?.src}
                                   width="100%"
                                   height="700"
                                   style={{ border: 0, borderRadius: '0.75rem' }}
                                   allowFullScreen
                                   loading="lazy"
                                   referrerPolicy="no-referrer-when-downgrade"
                                   className="shadow-md"
                              />
                              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                                   Use this 360° view to explore the destination
                                   before booking your tour. Zoom, pan, and
                                   navigate to see everything the destination
                                   has to offer.
                              </p>
                         </CardContent>
                    </Card>

                    {/* Booking CTA */}
                    <div className="mt-8 p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-0 shadow-lg flex items-center justify-between">
                         <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                   Ready to explore?
                              </h3>
                              <p className="text-gray-700 text-base">
                                   Book a tour with a local guide today
                              </p>
                         </div>
                         <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-6 text-base font-bold shadow-lg">
                              Book Now
                         </Button>
                    </div>
               </div>
          </div>
     );
}