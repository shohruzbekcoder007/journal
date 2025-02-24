import type React from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { translations, type Language } from "@/lib/translations"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Language }
}) {
  const t = translations[lang]

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen mx-auto">
        <Sidebar translations={t.admin.sidebar} />
        <SidebarInset>
          <div className="mx-auto max-w-7xl w-full p-4 sm:p-6 md:pl-6">
            {/* Add mobile menu spacer */}
            <div className="h-[76px] md:h-[64px]" />
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

