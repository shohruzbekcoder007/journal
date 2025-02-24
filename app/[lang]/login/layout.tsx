import type React from "react"
import { Header } from "@/components/header"
import { translations, type Language } from "@/lib/translations"

export default function LoginLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Language }
}) {
  const t = translations[lang]

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

