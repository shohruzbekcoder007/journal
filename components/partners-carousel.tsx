"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Partner {
  id: number
  name: string
  logo: string
  url: string
}

interface PartnersCarouselProps {
  partners: Partner[]
  title: string
  description: string
  className?: string
}

export function PartnersCarousel({ partners, title, description, className }: PartnersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const itemsPerSlide = useItemsPerSlide()

  // Determine how many items to show per slide based on screen width
  function useItemsPerSlide() {
    const [itemsPerSlide, setItemsPerSlide] = useState(4)

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setItemsPerSlide(1)
        } else if (window.innerWidth < 768) {
          setItemsPerSlide(2)
        } else if (window.innerWidth < 1024) {
          setItemsPerSlide(3)
        } else {
          setItemsPerSlide(4)
        }
      }

      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    return itemsPerSlide
  }

  const totalSlides = Math.ceil(partners.length / itemsPerSlide)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, nextSlide])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <div className={cn("w-full", className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="flex min-w-full justify-center gap-4 px-4">
                {partners
                  .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                  .map((partner) => (
                    <div key={partner.id} className="flex-1 min-w-0 flex flex-col items-center">
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 rounded-lg border bg-background hover:bg-secondary/50 transition-colors duration-200 flex items-center justify-center h-32 w-full"
                      >
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                        />
                      </a>
                      <span className="mt-2 text-sm font-medium text-center">{partner.name}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={prevSlide}
          aria-label="Previous partners"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={nextSlide}
          aria-label="Next partners"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 gap-1.5">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === index ? "bg-primary w-4" : "bg-muted hover:bg-primary/50",
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}