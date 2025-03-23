"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"
import { translations, type Language } from "@/lib/translations"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lang: Language
}

export function SearchDialog({ open, onOpenChange, lang }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [recentSearches, setRecentSearches] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Load recent searches from localStorage
  React.useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches))
      } catch (e) {
        console.error("Failed to parse recent searches", e)
      }
    }
  }, [])

  // Save recent searches to localStorage
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return

    const updatedSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    saveRecentSearch(searchQuery)

    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      onOpenChange(false)

      // Navigate to search results page
      router.push(`/${lang}/articles?query=${encodeURIComponent(searchQuery)}`)
    }, 800)
  }

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query)
    saveRecentSearch(query)

    // Navigate to search results page
    router.push(`/${lang}/articles?query=${encodeURIComponent(query)}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center">{translations[lang]?.search?.title || "Search"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translations[lang]?.search?.placeholder || "Search for articles, journals, authors..."}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {translations[lang]?.search?.searching || "Searching..."}
                </>
              ) : (
                translations[lang]?.search?.button || "Search"
              )}
            </Button>
          </div>
        </form>

        {recentSearches.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              {translations[lang]?.search?.recentSearches || "Recent Searches"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleRecentSearchClick(query)}
                  className="flex items-center"
                >
                  <Search className="mr-2 h-3 w-3" />
                  {query}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

