"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { key: "journals", href: "/journals" },
  { key: "authors", href: "/authors" },
  { key: "resources", href: "/resources" },
]

interface MainNavProps {
  lang: string
  mobile?: boolean
}

export function MainNav({ lang, mobile = false }: MainNavProps) {
  const pathname = usePathname()

  const getTranslation = (key: string) => {
    switch (key) {
      case "articles":
        return lang === "ru" ? "Статьи" : lang === "uz" ? "Maqolalar" : "Articles"
      case "journals":
        return lang === "ru" ? "Журналы" : lang === "uz" ? "Jurnallar" : "Journals"
      case "authors":
        return lang === "ru" ? "Авторы" : lang === "uz" ? "Mualliflar" : "Authors"
      case "resources":
        return lang === "ru" ? "Ресурсы" : lang === "uz" ? "Resurslar" : "Resources"
      default:
        return key
    }
  }

  return (
    <div className={cn("flex", mobile ? "flex-col space-y-4" : "gap-6 md:gap-10")}>
      <Link href={`/${lang}`} className="flex items-center space-x-2">
        <span className="inline-block font-bold">SciPublish</span>
      </Link>
      <nav className={cn("flex", mobile ? "flex-col space-y-4" : "gap-6")}>
        {navItems.map(({ key, href }) => {
          const fullPath = `/${lang}${href}`
          return (
            <Link
              key={key}
              href={fullPath}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.includes(href) ? "text-primary" : "text-muted-foreground",
                mobile && "text-base",
              )}
            >
              {getTranslation(key)}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

