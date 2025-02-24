"use client"

import * as React from "react"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Language } from "@/lib/translations"

interface HeaderProps {
  lang: Language
  submitText: string
}

export function Header({ lang, submitText }: HeaderProps) {
  const pathname = usePathname()
  const isAdmin = pathname.includes("/admin")
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      {" "}
      {/* Add z-50 */}
      <div className="container">
        <div className="flex h-16 items-center justify-between py-4">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 py-4">
                  <MainNav lang={lang} mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1">
            <MainNav lang={lang} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher currentLang={lang} />
            <ModeToggle />
            {!isAdmin && (
              <Button variant="default" className="hidden md:inline-flex">
                {submitText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

