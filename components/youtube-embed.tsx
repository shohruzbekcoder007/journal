"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
  aspectRatio?: "16:9" | "4:3" | "1:1"
  thumbnailQuality?: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault"
}

export function YouTubeEmbed({
  videoId,
  title,
  className,
  aspectRatio = "16:9",
  thumbnailQuality = "maxresdefault",
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const aspectRatioClasses = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`

  return (
    <div className={cn("relative overflow-hidden rounded-lg shadow-md", aspectRatioClasses[aspectRatio], className)}>
      {!isPlaying ? (
        <div className="absolute inset-0 cursor-pointer" onClick={() => setIsPlaying(true)}>
          <img
            src={thumbnailUrl || "/placeholder.svg"}
            alt={`Thumbnail for ${title}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="rounded-full bg-primary/90 p-4 shadow-lg transform transition-transform hover:scale-110">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-medium text-lg">{title}</h3>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  )
}