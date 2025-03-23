"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Languages } from "lucide-react"
import type { Language } from "@/lib/translations"

interface LanguageSwitcherProps {
  currentLang: Language
  variant?: "default" | "header"
}

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "uz", name: "O'zbek" },
]

export function LanguageSwitcher({ currentLang, variant = "default" }: LanguageSwitcherProps) {
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
        <Button
          variant={variant === "header" ? "ghost" : "outline"}
          size="icon"
          className={cn(
            "h-8 w-8 md:h-9 md:w-9",
            variant === "header" && "text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
          )}
        >
          {/* <Languages className="h-4 w-4 md:h-5 md:w-5" /> */}
          <Globe className="h-4 w-4 md:h-5 md:w-5" />
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}

