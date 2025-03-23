"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { FaFacebook, FaTelegramPlane, FaWhatsapp, FaInstagram, FaViber } from "react-icons/fa"

interface MessengerItem {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  url: string
}

export function MessengerList() {
  const [isOpen, setIsOpen] = useState(false)

  const messengers: MessengerItem[] = [
    {
      id: "telegram",
      name: "Telegram",
      icon: <FaTelegramPlane size={20} />,
      color: "bg-[#0088cc] hover:bg-[#0088cc]/90",
      url: "https://t.me/username",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
      url: "https://wa.me/1234567890",
    },
    {
      id: "viber",
      name: "Viber",
      icon: <FaViber size={20} />,
      color: "bg-[#7360f2] hover:bg-[#7360f2]/90",
      url: "viber://chat?number=+1234567890",
    },
    {
      id: "facebook",
      name: "Messenger",
      icon: <FaFacebook size={20} />,
      color: "bg-[#0084ff] hover:bg-[#0084ff]/90",
      url: "https://m.me/username",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <FaInstagram size={20} />,
      color: "bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90",
      url: "https://instagram.com/username",
    },
  ]

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end">
      <div
        className={cn(
          "flex flex-col gap-2 transition-all duration-300 transform",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        )}
      >
        {messengers.map((messenger) => (
          <a
            key={messenger.id}
            href={messenger.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-l-full text-white transition-transform hover:scale-110",
              messenger.color,
            )}
            aria-label={messenger.name}
          >
            {messenger.icon}
          </a>
        ))}
      </div>

      {/* Toggle button at the end of the list */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "h-12 w-12 rounded-l-full rounded-r-none shadow-lg transition-all duration-300 mt-2",
          isOpen ? "bg-gray-700 hover:bg-gray-600" : "bg-primary hover:bg-primary/90",
        )}
        aria-label={isOpen ? "Close messenger list" : "Open messenger list"}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </Button>
    </div>
  )
}

