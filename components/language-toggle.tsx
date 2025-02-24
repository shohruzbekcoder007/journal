"use client"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "uz", name: "O'zbek" },
]

export function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (langCode: string) => {
    const currentPath = pathname.split("/")
    currentPath[1] = langCode
    router.push(currentPath.join("/"))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

