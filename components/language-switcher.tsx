"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import type { Language } from "@/lib/translations"

interface LanguageSwitcherProps {
  currentLang: Language
}

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "uz", name: "O'zbek" },
]

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (langCode: string) => {
    const currentPath = pathname.split("/")
    currentPath[1] = langCode
    router.push(currentPath.join("/"))
  }

  // Show language name on mobile, icon on desktop
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
          <Languages className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)} className="justify-between">
            {lang.name}
            {currentLang === lang.code && <span className="text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

