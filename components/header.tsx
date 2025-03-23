"use client"

import * as React from "react"
import { MainNav } from "@/components/main-nav"
// import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Menu, Phone, Search } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Language } from "@/lib/translations"
import { SearchDialog } from "./search-dialog"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface HeaderProps {
  lang: Language
  submitText: string
  phoneNumber: string
}

export function Header({ lang, submitText, phoneNumber }: HeaderProps) {
  const pathname = usePathname()
  const isAdmin = pathname.includes("/admin")
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <header className="sticky top-0 w-full bg-primary text-primary-foreground z-50">
      <div className="container">
        <div className="flex h-16 items-center justify-between py-4">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                >
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
                  <div className="flex items-center gap-2 mt-4">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1">
            <MainNav lang={lang} headerDark />
          </div>

          {/* Phone Number (Desktop) */}
          <div className="hidden md:flex items-center mr-4">
            <Phone className="h-4 w-4 mr-2 text-primary-foreground" />
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
              className="text-sm text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            >
              {phoneNumber}
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Search Button */}
            <Button
              variant={"ghost"}
              size="icon"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "h-8 w-8 md:h-9 md:w-9",
                "text-white hover:bg-white/10",
              )}
              aria-label="Search"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            <LanguageSwitcher currentLang={lang} variant="header" />

            {/* <ModeToggle variant="header" /> */}
            {!isAdmin && (
              <Link href={`/${lang}/submit`}>
                <Button variant="secondary" className="hidden md:inline-flex">
                  {submitText}
                </Button>
              </Link>
              
            )}
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} lang={lang} />
    </header>
  )
}

