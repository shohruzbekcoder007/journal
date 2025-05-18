"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, BookOpen, Users, FolderKanban, Menu, FileUp } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface SidebarProps {
  translations: {
    dashboard: string
    articles: string
    journals: string
    authors: string
    resources: string
    submissions?: string
  }
}

function SidebarNav({ translations, mobile = false }: SidebarProps & { mobile?: boolean }) {
  const pathname = usePathname()
  const lang = pathname.split("/")[1]

  const items = [
    {
      title: translations.dashboard,
      href: `/${lang}/admin`,
      icon: LayoutDashboard,
    },
    // {
    //   title: translations.articles,
    //   href: `/${lang}/admin/articles`,
    //   icon: FileText,
    // },
    {
      title: translations.submissions || "Submissions",
      href: `/${lang}/admin/submissions`,
      icon: FileUp,
    },
    {
      title: translations.journals,
      href: `/${lang}/admin/journals`,
      icon: BookOpen,
    },
    {
      title: translations.authors,
      href: `/${lang}/admin/authors`,
      icon: Users,
    },
    {
      title: translations.resources,
      href: `/${lang}/admin/resources`,
      icon: FolderKanban,
    },
  ]

  const Wrapper = mobile ? React.Fragment : ShadcnSidebar

  return (
    <Wrapper>
      <SidebarContent>
        {!mobile && <div className="h-[64px] shrink-0" />} {/* Fixed height spacer for header */}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {!mobile && <SidebarRail />}
    </Wrapper>
  )
}

export function Sidebar(props: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div className="fixed top-0 left-0 z-40 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 mt-[80px] ml-4">
              <Menu className="size-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <SheetHeader className="p-6 border-b">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="px-2 py-4">
              <SidebarNav {...props} mobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0">
        <div className="h-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarNav {...props} />
        </div>
      </div>
    </>
  )
}


