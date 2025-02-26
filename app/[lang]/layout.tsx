import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { translations, type Language } from "@/lib/translations"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SciPublish",
  description: "A comprehensive platform for research teams to publish and collaborate",
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Language }
}) {
  const t = translations[lang]

  return (
    // <html lang={lang} suppressHydrationWarning>
      <div className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header lang={lang} submitText={t?.common?.submitPaper} />

            <main className="flex-1">{children}</main>

            <footer className="mt-auto border-t">
              <div className="container">
                <div className="flex h-16 items-center justify-center">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    {t?.common?.footer}
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </div>
    // </html>
  )
}

