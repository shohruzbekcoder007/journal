"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  // { key: "articles", href: "/articles" },
  { key: "journals", href: "/journals" },
  { key: "authors", href: "/authors" },
  { key: "resources", href: "/resources" },
]

interface MainNavProps {
  lang: string
  mobile?: boolean
  headerDark?: boolean
}

export function MainNav({ lang, mobile = false, headerDark = false }: MainNavProps) {
  const pathname = usePathname()

  const getTranslation = (key: string) => {
    switch (key) {
      // case "articles":
      //   return lang === "ru" ? "Статьи" : lang === "uz" ? "Maqolalar" : "Articles"
      case "journals":
        return lang === "ru" ? "Журналы" : lang === "uz" ? "Jurnallar" : "Journals"
      case "authors":
        return lang === "ru" ? "Редакторы" : lang === "uz" ? "Tahrirchilar" : "Editors"
      case "resources":
        return lang === "ru" ? "Ресурсы" : lang === "uz" ? "Resurslar" : "Resources"
      default:
        return key
    }
  }

  return (
    <div className={cn("flex", mobile ? "flex-col space-y-4" : "gap-6 md:gap-10")}>
      <Link href={`/${lang}`} className="flex items-center space-x-2">
        <span className={cn("inline-block font-bold", headerDark ? "text-primary-foreground" : "")}>SciPublish</span>
      </Link>
      <nav className={cn("flex", mobile ? "flex-col space-y-4" : "gap-6")}>
        {navItems.map(({ key, href }) => {
          const fullPath = `/${lang}${href}`
          return (
            <Link
              key={key}
              href={fullPath}
              className={cn(
                "text-sm font-medium transition-colors",
                headerDark
                  ? pathname.includes(href)
                    ? "text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                  : pathname.includes(href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary",
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

